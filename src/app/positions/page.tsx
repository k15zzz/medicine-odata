import React from "react";
import Patients from "~/components/Patients";
import Position from "~/components/Position";

export default function Page() {
    return (
        <main className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6 text-gray-900">Должности</h1>
            <Position/>
        </main>
    );
}
