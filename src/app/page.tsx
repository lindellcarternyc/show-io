import Link from "next/link";

import { CreatePost } from "~/app/_components/create-post";
import { api } from "~/trpc/server";

export default async function Home() {
  const eventTypes = await api.event.getEventTypes.query();
  const allEvents = await api.event.getEvents.query();
  const upcomingEvents = await api.event.getUpcomingEvents.query();

  return (
    <main className="flex flex-col gap-4">
      <Data title="Event types" data={eventTypes} />
      <Data title="All events" data={allEvents} />
      <Data title="Upcoming events" data={upcomingEvents} />
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
