import React from "react";
import Diagnosis from "~/components/Diagnosis";

export default function Page() {
    return (
        <main className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6 text-gray-900">Диагнозы</h1>
            <Diagnosis/>
        </main>
    );
}
