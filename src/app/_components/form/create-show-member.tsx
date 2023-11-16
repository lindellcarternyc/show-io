"use client";

import type { ShowRole } from "@prisma/client";
import { useForm } from "react-hook-form";
import { type CreateShowMemberData } from "~/schema/show-member.schema";
import FormField from "./form-field";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import FormButtons from "./form-buttons";

interface CreateShowMemberProps {
  showRoles: ShowRole[];
}

export default function CreateShowMember({ showRoles }: CreateShowMemberProps) {
  const router = useRouter();
  const apiUtils = api.useUtils();

  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      showRoleId: showRoles[0]?.id ?? "",
    },
  });

  const createShowMember = api.showMember.create.useMutation({
    onSuccess: async () => {
      await Promise.all([
        apiUtils.showRole.invalidate(),
        apiUtils.showMember.invalidate(),
      ]);
      router.push("/");
    },
  });

  const handleSubmit = async (data: CreateShowMemberData) => {
    await createShowMember.mutateAsync(data);
  };

  return (
    <div className="flex flex-col gap-4">
      <h2>Create Show Member</h2>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          id="firstName"
          title="First Name"
          register={form.register}
          error={form.formState.errors?.firstName?.message}
        />
        <FormField
          id="lastName"
          title="Last Name"
          register={form.register}
          error={form.formState.errors?.lastName?.message}
        />
        <FormField
          id="showRoleId"
          title="Show Role"
          register={form.register}
          error={form.formState.errors?.showRoleId?.message}
          as="select"
          options={showRoles}
        />
        <FormButtons
          submitTitle={`Create Show Member`}
          onClickCancel={() => router.push("/")}
          isLoading={form.formState.isLoading}
        />
      </form>
    </div>
  );
}
