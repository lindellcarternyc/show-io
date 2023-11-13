import type { Path, UseFormRegister } from "react-hook-form";

export interface BaseInputProps<FieldValues extends Record<string, unknown>> {
  register: UseFormRegister<FieldValues>;
  id: Path<FieldValues>;
}
