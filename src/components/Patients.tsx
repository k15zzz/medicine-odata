"use client";

import React from "react";
import {PatientRepository} from "~/repositories/PatientRepository";
import {Patient} from "~/models/Patient";
import GenericTable, {Column} from "~/components/GenericTable";

export default function Patients() {
    const columns = [
        {key: "Description", label: "Наименование", editable: true},
        {key: "ФИО", label: "ФИО", editable: true},
        {key: "Возвраст", label: "Возраст", editable: true},
    ] as Column<Patient>[];

    return <GenericTable<Patient>
        columns={columns}
        repository={new PatientRepository()}
    />
}
