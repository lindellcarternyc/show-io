import type { Call, ShowMember } from "@prisma/client";
import { format } from "date-fns";

interface CallSheetProps {
  calls: (Call & { personnel: ShowMember[] })[];
}

export default function CallSheet({ calls }: CallSheetProps) {
  return (
    <div>
      <h2>Call Sheet</h2>
      <ul className="flex flex-col gap-4">
        {calls.map((call) => (
          <li key={call.id}>
            <p>{call.title}</p>
            <p>
              {format(call.start, "hh:mm aa")} - {format(call.end, "hh:mm aa")}
            </p>
            <ul>
              {call.personnel.map((person) => (
                <li key={person.id}>
                  {person.firstName} {person.lastName}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
