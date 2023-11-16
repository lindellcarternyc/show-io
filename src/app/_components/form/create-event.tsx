"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { EventType } from "@prisma/client";

import FormField from "./form-field";
import capitalize from "~/utils/capitalize";

import { type CreateEventData, CreateEventSchema } from "~/schema/event.schema";
import { api } from "~/trpc/react";
import FormButtons from "./form-buttons";

interface CreateEventProps {
  types: EventType[];
}

export default function CreateEvent({ types }: CreateEventProps) {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      type: types[0]?.id ?? "",
      start: new Date(),
      end: new Date(),
      location: "",
    },
    resolver: zodResolver(CreateEventSchema),
  });

  const createEvent = api.event.create.useMutation({
    onSuccess: () => {
      router.push("/");
    },
  });

  const handleSubmit = async (data: CreateEventData) => {
    await createEvent.mutateAsync({ data });
  };

  return (
    <div>
      <h3>Create Event</h3>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormField
          id="type"
          title="Type"
          as="select"
          register={form.register}
          options={types.map((t) => ({ ...t, title: capitalize(t.type) }))}
          error={form.formState.errors?.type?.message}
        />
        <div className="grid gap-2 md:grid-cols-2">
          <FormField
            title="Start"
            type="datetime-local"
            id="start"
            register={form.register}
            error={form.formState.errors?.start?.message}
          />
          <FormField
            title="End"
            type="datetime-local"
            id="end"
            register={form.register}
            error={form.formState.errors?.end?.message}
          />
        </div>
        <FormField
          title="Location"
          id="location"
          register={form.register}
          error={form.formState.errors?.location?.message}
        />
        {/* <div className="flex justify-end gap-4">
          <button
            type="button"
            className="rounded bg-slate-400 px-4 py-2"
            disabled={form.formState.isLoading}
            onClick={() => router.push("/")}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded bg-blue-500 px-4 py-2 text-white"
            disabled={form.formState.isLoading}
          >
            {form.formState.isLoading ? "Loading..." : `Create Event`}
          </button>
        </div> */}
        <FormButtons
          submitTitle={`Create Event`}
          isLoading={form.formState.isLoading}
          onClickCancel={() => router.push("/")}
        />
      </form>
    </div>
  );
}
