"use client";
import { useState, useEffect } from "react";

import Link from "next/link";
import type { Event } from "@prisma/client";
import { api } from "~/trpc/react";
import capitalize from "~/utils/capitalize";
import { format } from "date-fns";

export default function Home() {
  const [events, setEvents] = useState<(Event & { type: { type: string } })[]>(
    [],
  );

  const getEvents = api.event.getEvents.useQuery();

  useEffect(() => {
    if (getEvents.data) {
      setEvents(getEvents.data);
    }
  }, [getEvents.data]);

  return (
    <main className="flex flex-col gap-4">
      <div>
        <h2 className="text-lg">Events</h2>
        <Link
          href="/events/create"
          className="flex items-center justify-between"
        ></Link>
      </div>
      <ul className="flex flex-col gap-4">
        {events.map((evt) => (
          <li key={evt.id} className="rounded-md border shadow-md">
            <Link href={`/events/${evt.id}`}>
              <section className="flex flex-col gap-2">
                <header>{capitalize(evt.type.type)}</header>
                <div>
                  <p>{format(evt.start, "E, MMM dd, yyy")}</p>
                  <p className="flex flex-col gap-2">
                    {format(evt.start, "hh:mm a")} -{" "}
                    {format(evt.end, "hh:mm a")}
                  </p>
                </div>
              </section>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
