"use client";

import type { ShowMember } from "@prisma/client";
import { type ChangeEvent } from "react";

interface SelectShowMembersProps {
  showMembers: ShowMember[];
  onChange: (evt: ChangeEvent<HTMLSelectElement>) => void;
}

const SelectShowMembers = ({
  showMembers,
  onChange,
}: SelectShowMembersProps) => {
  return (
    <div className="flex flex-col">
      <label htmlFor="select-show-members">People</label>
      <select
        name="select-show-members"
        id="select-show-members"
        onChange={onChange}
        className=""
        defaultValue={""}
        value={""}
      >
        <option value="" disabled={true}>
          Choose a person
        </option>
        {showMembers.map((person) => (
          <option key={person.id} value={person.id}>
            {person.firstName} {person.lastName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectShowMembers;
