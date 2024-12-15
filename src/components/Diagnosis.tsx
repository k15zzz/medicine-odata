"use client";

import GenericTable, {Column} from "~/components/GenericTable";
import React from "react";
import {Diagnosis} from "~/models/Diagnosis";
import {DiagnosisRepository} from "~/repositories/DiagnosisRepository";

export default function Diagnosis() {
    const columns = [
        {key: "Description", label: "Наименование", editable: true},
        {key: "Название", label: "Название", editable: true},
        {key: "КодМКБ", label: "Код МКБ", editable: true},
    ] as Column<Diagnosis>[];

    return <GenericTable<Diagnosis>
        columns={columns}
        repository={new DiagnosisRepository()}
    />
}