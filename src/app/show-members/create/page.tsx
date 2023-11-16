import { api } from "~/trpc/server";

import CreateShowMember from "~/app/_components/form/create-show-member";

export default async function CreateShowMemberPage() {
  const showRoles = await api.showRole.getAll.query();

  return <CreateShowMember showRoles={showRoles} />;
}
