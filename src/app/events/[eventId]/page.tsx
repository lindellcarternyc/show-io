import { format } from "date-fns";
import { api } from "~/trpc/server";
import capitalize from "~/utils/capitalize";

export default async function EventPage({
  params,
}: {
  params: { eventId: string };
}) {
  const event = await api.event.getById.query({ id: params.eventId });

  if (event === null) return <div>No event found!</div>;

  return (
    <div>
      <h2>
        {capitalize(event.type.type)} - {event.location}
      </h2>
      <div>
        <p>{format(event.start, "E, MMM dd, yyy")}</p>
        <p className="flex flex-col gap-2">
          {format(event.start, "hh:mm a")} - {format(event.end, "hh:mm a")}
        </p>
      </div>
      <div>
        <p>Calls</p>
      </div>
    </div>
  );
}
