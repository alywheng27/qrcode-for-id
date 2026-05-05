"use client";

import { Search } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import useDebounce from "../hooks/useDebounce";

export interface Person {
  EmployeeID: string;
  NameOfEmployee: string;
  Office: string;
}

interface PeopleListProps {
  onSelectPerson: (person: Person) => void;
  selectedPersonId?: string;
}

export function PeopleList({
  onSelectPerson,
  selectedPersonId,
}: PeopleListProps) {
  const [employees, setEmployees] = useState<Person[]>([]);

  const fetchEmployees = useCallback(async () => {
    const data = await fetch(`/api/employee`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const employeesList = await data.json();
    setEmployees(employeesList);

    console.log("[FUNCTION] fetchEmployees");
  }, []);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const [searchQuery, setSearchQuery] = useState("");
  const debounceSearchQuery = useDebounce(searchQuery, 500);

  const filteredPeople = useMemo(() => {
    console.log("[FUNCTION] filteredPeople");
    return employees.filter(
      (person) =>
        person.NameOfEmployee.toLowerCase().includes(
          debounceSearchQuery.toLowerCase(),
        ) ||
        person.Office.toLowerCase().includes(debounceSearchQuery.toLowerCase()),
    );
  }, [employees, debounceSearchQuery]);

  return (
    <div className="h-full flex flex-col">
      <div className="border-b border-[#333333] p-4">
        <h2 className="text-[#0fe76f] text-lg font-bold mb-3">$ PERSONNEL</h2>
        <div className="relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-[#0fe76f]" />
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
          <div className="p-4 text-[#0fe76f] text-sm text-center">
            no results found
          </div>
        ) : (
          <div className="divide-y divide-[#333333]">
            {filteredPeople.map((person) => (
              <button
                type="button"
                key={person.EmployeeID}
                onClick={() => onSelectPerson(person)}
                className={`w-full text-left p-3 transition-colors border-l-2 ${
                  selectedPersonId === person.EmployeeID
                    ? "border-l-[#33ff00] bg-[#1a1a1a] text-[#0fe76f]"
                    : "border-l-transparent hover:bg-[#1a1a1a] text-[#0fe76f]"
                }`}
              >
                <div className="font-mono text-sm font-semibold">
                  {person.NameOfEmployee}
                </div>
                <div className="text-xs text-[#ffffff] mt-1">
                  {person.Office}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
