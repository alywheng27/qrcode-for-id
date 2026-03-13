"use client";

import { useState } from "react";
import { PeopleList, type Person } from "@/app/components/PeopleList";
import { QRDisplay } from "@/app/components/QRDisplay";

export default function Home() {
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

  return (
    <main className="h-screen bg-[#0a0a0a] text-[#0fe76f] flex flex-col md:flex-row">
      {/* Header */}
      <div className="border-b md:border-b-0 md:border-r border-[#333333] p-4 md:hidden">
        <h1 className="text-xl font-bold glow-text font-mono">
          QR CODE GENERATOR
        </h1>
        <p className="text-xs text-[#666666] mt-1 font-mono">
          terminal aesthetic QR tool
        </p>
      </div>

      {/* Sidebar - People List */}
      <div className="w-full md:w-80 border-r border-[#333333] min-h-screen md:min-h-auto flex flex-col overflow-y-auto">
        <div className="hidden md:block border-b border-[#333333] p-4">
          <h1 className="text-xl font-bold glow-text font-mono">
            QR CODE GENERATOR
          </h1>
          <p className="text-xs text-[#666666] mt-1 font-mono">
            terminal aesthetic QR tool
          </p>
        </div>
        <PeopleList
          onSelectPerson={setSelectedPerson}
          selectedPersonId={selectedPerson?.EmployeeID}
        />
      </div>

      {/* Main Content - QR Display */}
      <div className="flex-1 flex flex-col min-h-screen md:min-h-auto overflow-hidden">
        <QRDisplay person={selectedPerson} />
      </div>
    </main>
  );
}
