"use client";

import type { ShowMember } from "@prisma/client";
import SelectShowMembers from "./select-show-members";
import { type ChangeEvent, useState, useEffect } from "react";
import FormField from "./form-field";
import { useForm } from "react-hook-form";
import {
  CreateCallSchema,
  type CreateCallData,
} from "~/schema/call-list.schema";
import { api } from "~/trpc/react";
import FormButtons from "./form-buttons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";

interface CreateCallProps {
  onSubmit: (data: CreateCallData) => Promise<void> | void;
  onCancel: () => void;
}

const adjustDate = (date: Date, time: string): Date => {
  const [hours, minutes] = time.split(":").map((x) => parseInt(x)) as [
    number,
    number,
  ];
  date.setHours(hours);
  date.setMinutes(minutes);

  return date;
};

export default function CreateCall({ onSubmit, onCancel }: CreateCallProps) {
  const [showMembers, setShowMembers] = useState<ShowMember[]>([]);
  const getShowMembers = api.showMember.getAll.useQuery();
  useEffect(() => {
    setShowMembers(getShowMembers.data ?? []);
  }, [getShowMembers.data]);

  const { eventId } = useParams();
  const [date, setDate] = useState(new Date());
  const getDate = api.event.getById.useQuery({
    id: eventId as unknown as string,
  });
  useEffect(() => {
    if (getDate.data) {
      setDate(getDate.data.start);
    }
  }, [getDate.data]);

  const form = useForm({
    defaultValues: {
      title: "",
      start: "",
      end: "",
    },
    resolver: zodResolver(CreateCallSchema.omit({ personnel: true })),
  });

  const [selectedShowMembers, setSelectedShowMembers] = useState<string[]>([]);

  const onChangeSelectShowMembers = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedShowMembers((current) => [...current, event.target.value]);
  };

  const removeMember = (memberId: string) => {
    setSelectedShowMembers((current) =>
      current.filter((id) => id !== memberId),
    );
  };

  const handleSubmit = async (data: {
    start: string;
    end: string;
    title: string;
  }) => {
    const start = adjustDate(date, data.start);
    const end = adjustDate(date, data.end);
    await onSubmit({
      title: data.title,
      start,
      end,
      personnel: selectedShowMembers,
    });
  };

  return (
    <form
      className="flex w-full flex-col"
      onSubmit={form.handleSubmit(handleSubmit)}
    >
      <pre>
        {JSON.stringify(
          {
            start: form.watch("start"),
            end: form.watch("end"),
            title: form.watch("title"),
            ...form.formState,
          },
          null,
          2,
        )}
      </pre>
      <div className="flex items-center justify-between">
        <h3>Create Call</h3>
        <FormButtons
          isLoading={form.formState.isLoading}
          onClickCancel={onCancel}
          submitTitle="Add Call"
        />
      </div>
      <FormField
        id="title"
        title="Title"
        register={form.register}
        error={form.formState.errors?.title?.message}
      />
      <div className="grid gap-2 md:grid-cols-2">
        <FormField
          id="start"
          title="Start"
          register={form.register}
          type="time"
          error={form.formState.errors?.start?.message}
        />
        <FormField
          id="end"
          title="End"
          register={form.register}
          type="time"
          error={form.formState.errors?.end?.message}
        />
      </div>
      {getShowMembers.isLoading ? (
        <div>Loading...</div>
      ) : getShowMembers.data ? (
        <div>
          <SelectShowMembers
            showMembers={showMembers.filter(
              (person) => !selectedShowMembers.includes(person.id),
            )}
            onChange={onChangeSelectShowMembers}
          />
          <ul className="border">
            {selectedShowMembers
              .map((id) => showMembers.find((person) => person.id === id))
              .map((person) => (
                <li key={person?.id ?? ""} className="flex justify-between p-2">
                  <p>
                    {person?.firstName} {person?.lastName}
                  </p>{" "}
                  <button
                    type="button"
                    onClick={() => removeMember(person?.id ?? "")}
                  >
                    X
                  </button>
                </li>
              ))}
          </ul>
        </div>
      ) : null}
    </form>
  );
}
