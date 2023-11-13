import CreateEvent from "~/app/_components/form/create-event";
import { api } from "~/trpc/server";

export default async function CreateEventPage() {
  const eventTypes = await api.event.getEventTypes.query();

  return <CreateEvent types={eventTypes} />;
}
