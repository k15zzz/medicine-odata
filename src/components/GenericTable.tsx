"use client";

import React, {useEffect, useState} from 'react';
import {Button} from "@nextui-org/button";
import {Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@nextui-org/table";
import {Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure} from "@nextui-org/modal";
import {Input} from "@nextui-org/input";
import {CRUDRepository} from "~/repositories/CRUDRepository";

export type Column<T> = {
    key: keyof T;
    label: string;
    editable?: boolean;
};

type GenericTableProps<T> = {
    columns: Column<T>[];
    repository: CRUDRepository<T>;
};

const GenericTable = <T extends { Ref_Key: string }>({columns, repository}: GenericTableProps<T>) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [isCreating, setIsCreating] = useState(false); // Режим создания
    const [editingRow, setEditingRow] = useState<T | null>(null);
    const [tableData, setTableData] = useState<T[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await repository.readAll();
                setTableData(result);
            } catch (e) {
                console.error("Ошибка загрузки данных:", e);
                setError("Ошибка загрузки данных");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [repository]);

    const handleEdit = (row: T) => {
        setEditingRow(row);
        setIsCreating(false); // Режим редактирования
        setModalOpen(true);
    };

    const handleSave = async () => {
        if (isCreating) {
            // Создание записи
            try {
                const newRow = await repository.create(editingRow as T);
                setTableData((prev) => [...prev, newRow]);
                setError(null);
            } catch (e) {
                console.error("Ошибка создания записи:", e);
                setError("Ошибка создания записи");
            }
        } else if (editingRow) {
            // Редактирование записи
            try {
                const updatedRow = await repository.update(editingRow);
                setTableData((prev) =>
                    prev.map((row) => (row.Ref_Key === updatedRow.Ref_Key ? updatedRow : row))
                );
                setError(null);
            } catch (e) {
                console.error("Ошибка сохранения данных:", e);
                setError("Ошибка сохранения данных");
            }
        }

        setModalOpen(false);
        setEditingRow(null);
    };

    const handleInputChange = (key: keyof T, value: string) => {
        if (editingRow) {
            setEditingRow({...editingRow, [key]: value});
        }
    };

    const handleCreate = () => {
        setEditingRow({} as T); // Новый пустой объект
        setIsCreating(true); // Режим создания
        setModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        try {
            await repository.remove(id);
            setTableData((prev) => prev.filter((row) => row.Ref_Key !== id));
            setError(null);
        } catch (e) {
            console.error("Ошибка удаления записи:", e);
            setError("Ошибка удаления записи");
        }
    };

    return (
        <div>
            {error && <div className={'text-red-500 my-1'}>{error}</div>}

            <Button className={'mb-2'} color={"primary"} fullWidth={true} onPress={handleCreate}>
                Создать
            </Button>

            {loading ? (
                <div>Загрузка данных...</div>
            ) : (
                <Table
                    aria-label="OData Table"
                    className={'h-auto min-w-full'}
                >
                    <TableHeader>
                        {columns.map((col) => (
                            <TableColumn key={String(col.key)}>{col.label}</TableColumn>
                        ))}
                        <TableColumn>Действия</TableColumn>
                    </TableHeader>
                    <TableBody>
                        {tableData.map((row) => (
                            <TableRow key={row.Ref_Key}>
                                {columns.map((col) => (
                                    <TableCell key={String(col.key)}>{row[col.key]}</TableCell>
                                ))}
                                <TableCell className={'flex gap-3'}>
                                    <Button
                                        size="sm"
                                        color="default"
                                        onPress={() => handleEdit(row)}
                                    >
                                        Редактировать
                                    </Button>
                                    <Button
                                        size="sm"
                                        color="danger"
                                        onPress={() => handleDelete(row.Ref_Key)}
                                    >
                                        Удалить
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}

            <Modal
                isOpen={isModalOpen}
                onOpenChange={(open) => setModalOpen(open)}
                placement={"center"}
                size={"3xl"}
                hideCloseButton={true}
                aria-labelledby="auth-modal-title"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader>
                                <h3>{isCreating ? "Создать запись" : "Редактировать запись"}</h3>
                            </ModalHeader>
                            <ModalBody>
                                <div className={'my-5'}>
                                    {columns.map(
                                        (col) =>
                                            col.editable && (
                                                <Input
                                                    key={String(col.key)}
                                                    label={col.label}
                                                    value={editingRow?.[col.key] || ""}
                                                    onChange={(e) =>
                                                        handleInputChange(col.key, e.target.value)
                                                    }
                                                    fullWidth
                                                />
                                            )
                                    )}
                                </div>

                            </ModalBody>
                            <ModalFooter>
                                <Button auto flat color="danger" onPress={() => setModalOpen(false)}>
                                    Отмена
                                </Button>
                                <Button color={"primary"} auto onPress={handleSave}>
                                    {isCreating ? "Создать" : "Сохранить"}
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
};

export default GenericTable;
