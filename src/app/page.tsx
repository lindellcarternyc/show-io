"use client";
import { useState, useEffect } from "react";

import Link from "next/link";
import type { Event, ShowMember } from "@prisma/client";
import { api } from "~/trpc/react";

export default function Home() {
  const [allEvents, setAllEvents] = useState<Event[]>([]);

  const getAllEvents = api.event.getEvents.useQuery();

  useEffect(() => {
    if (getAllEvents.data) {
      setAllEvents(getAllEvents.data);
    }
  }, [getAllEvents.data]);

  const upcomingEvents = allEvents.filter(
    (evt) => evt.start.getTime() > new Date().getTime(),
  );

  const [showMembers, setShowMembers] = useState<ShowMember[]>([]);

  const getShowMembers = api.showMember.getAll.useQuery();

  useEffect(() => {
    if (getShowMembers.data) {
      setShowMembers(getShowMembers.data);
    }
  }, [getShowMembers.data]);

  return (
    <main className="flex flex-col gap-4">
      <div className="flex gap-4">
        <Link href="/events/create">Create Event</Link>
        <Link href="/show-members/create">Create Show Member</Link>
      </div>
      <Data title="All events" data={allEvents} />
      <Data title="Upcoming events" data={upcomingEvents} />
      <Data title="Personnel" data={showMembers} />
    </main>
  );
}

function Data({ title, data }: { title: string; data: unknown }): JSX.Element {
  return (
    <section className="flex flex-col gap-2">
      <label>{title}</label>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
}
