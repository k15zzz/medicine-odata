import React from "react";
import GeneralStatus from "~/components/GeneralStatus";

export default function Page() {
    return (
        <main className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6 text-gray-900">Статусы</h1>
            <GeneralStatus/>
        </main>
    );
}
