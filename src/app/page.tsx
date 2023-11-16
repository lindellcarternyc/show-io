"use client";
import { useState, useEffect } from "react";

import Link from "next/link";
import type { Event } from "@prisma/client";
import { api } from "~/trpc/react";
import capitalize from "~/utils/capitalize";
import { format } from "date-fns";

export default function Home() {
  const [upcomingEvents, setUpcomingEvents] = useState<
    (Event & { type: { type: string } })[]
  >([]);

  const getUpcomingEvents = api.event.getUpcomingEvents.useQuery();

  useEffect(() => {
    if (getUpcomingEvents.data) {
      setUpcomingEvents(getUpcomingEvents.data);
    }
  }, [getUpcomingEvents.data]);

  return (
    <main className="flex flex-col gap-4">
      <h2 className="text-lg">Upcoming Events</h2>
      <ul className="flex flex-col gap-4">
        {upcomingEvents.map((evt) => (
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
