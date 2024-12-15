"use client";

import GenericTable, {Column} from "~/components/GenericTable";
import React from "react";
import {Room} from "~/models/Room";
import {RoomRepository} from "~/repositories/RoomRepository";

export default function Room() {
    const columns = [
        {key: "Description", label: "Наименование", editable: true},
        {key: "Описание", label: "Статус", editable: true},
    ] as Column<Room>[];

    return <GenericTable<Room>
        columns={columns}
        repository={new RoomRepository()}
    />
}