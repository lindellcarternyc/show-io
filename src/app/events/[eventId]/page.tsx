"use client";

import type { Call, CallList, Event, ShowMember } from "@prisma/client";
import { format } from "date-fns";
import Link from "next/link";
import { useEffect, useState } from "react";
import CallSheet from "~/app/_components/call-sheet";
import { api } from "~/trpc/react";
import capitalize from "~/utils/capitalize";

type EventData = Event & { type: { type: string } };

type CallListData = CallList & {
  calls: (Call & { personnel: ShowMember[] })[];
};

export default function EventPage({ params }: { params: { eventId: string } }) {
  const { eventId } = params;

  const [event, setEvent] = useState<EventData | null>(null);
  const getEvent = api.event.getById.useQuery({ id: eventId });

  useEffect(() => {
    setEvent(getEvent.data ?? null);
  }, [getEvent.data]);

  const [callList, setCallList] = useState<CallListData | null>(null);
  const getCallList = api.callList.getByEventId.useQuery({ eventId });

  useEffect(() => {
    setCallList(getCallList.data ?? null);
  }, [getCallList.data]);

  if (getEvent.isLoading) return <div>Loading...</div>;
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
      {getCallList.isLoading ? (
        <div>Loading....</div>
      ) : callList === null ? (
        <Link href={`/events/${eventId}/callsheet/create`}>
          Create call sheet
        </Link>
      ) : (
        <CallSheet calls={callList.calls} />
      )}
    </div>
  );
}
