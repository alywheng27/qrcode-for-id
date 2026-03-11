"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";

export interface Person {
  id: string;
  name: string;
  office: string;
}

const SAMPLE_PEOPLE: Person[] = [
  { id: "1", name: "Alice Johnson", office: "New York" },
  { id: "2", name: "Bob Smith", office: "San Francisco" },
  { id: "3", name: "Carol Williams", office: "London" },
  { id: "4", name: "David Brown", office: "Tokyo" },
  { id: "5", name: "Emma Davis", office: "Toronto" },
  { id: "6", name: "Frank Miller", office: "Berlin" },
  { id: "7", name: "Grace Lee", office: "Singapore" },
  { id: "8", name: "Henry Chen", office: "Sydney" },
  { id: "9", name: "Iris Martinez", office: "Madrid" },
  { id: "10", name: "Jack Anderson", office: "Chicago" },
];

interface PeopleListProps {
  onSelectPerson: (person: Person) => void;
  selectedPersonId?: string;
}

export function PeopleList({
  onSelectPerson,
  selectedPersonId,
}: PeopleListProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPeople = useMemo(() => {
    return SAMPLE_PEOPLE.filter(
      (person) =>
        person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        person.office.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery]);

  return (
    <div className="h-full flex flex-col">
      <div className="border-b border-[#333333] p-4">
        <h2 className="text-[#33ff00] text-lg font-bold mb-3 glow-text">
          $ PERSONNEL
        </h2>
        <div className="relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-[#666666]" />
          <input
            type="text"
            placeholder="search by name or office..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="terminal-input w-full pl-9 py-2 text-sm"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredPeople.length === 0 ? (
          <div className="p-4 text-[#666666] text-sm text-center">
            no results found
          </div>
        ) : (
          <div className="divide-y divide-[#333333]">
            {filteredPeople.map((person) => (
              <button
                key={person.id}
                onClick={() => onSelectPerson(person)}
                className={`w-full text-left p-3 transition-colors border-l-2 ${
                  selectedPersonId === person.id
                    ? "border-l-[#33ff00] bg-[#1a1a1a] text-[#33ff00]"
                    : "border-l-transparent hover:bg-[#1a1a1a] text-[#33ff00]"
                }`}
              >
                <div className="font-mono text-sm font-semibold">
                  {person.name}
                </div>
                <div className="text-xs text-[#666666] mt-1">
                  {person.office}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
