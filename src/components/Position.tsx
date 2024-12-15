"use client";

import React from "react";
import {Position} from "~/models/Position";
import GenericTable, {Column} from "~/components/GenericTable";
import {PositionRepository} from "~/repositories/PositionRepository";

export default function Position() {
    const columns = [
        {key: "Description", label: "Наименование", editable: true},
        {key: "Название", label: "Название", editable: true},
    ] as Column<Position>[];

    return <GenericTable<Position>
        columns={columns}
        repository={new PositionRepository()}
    />
}
