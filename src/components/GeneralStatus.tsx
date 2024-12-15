"use client";

import GenericTable, {Column} from "~/components/GenericTable";
import React from "react";
import {GeneralStatus} from "~/models/GeneralStatus";
import {GeneralStatusRepository} from "~/repositories/GeneralStatusRepository";

export default function GeneralStatus() {
    const columns = [
        {key: "Description", label: "Наименование", editable: true},
        {key: "Статус", label: "Статус", editable: true},
    ] as Column<GeneralStatus>[];

    return <GenericTable<GeneralStatus>
        columns={columns}
        repository={new GeneralStatusRepository()}
    />
}