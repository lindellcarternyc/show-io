import type { BaseInputProps } from "./interfaces";

export interface InputProps<FieldValues extends Record<string, unknown>>
  extends BaseInputProps<FieldValues> {
  type?: "text" | "number" | "datetime-local" | "time";
}
export default function Input<FieldValues extends Record<string, unknown>>({
  id,
  register,
  type,
}: InputProps<FieldValues>) {
  return (
    <input
      className="w-full rounded-md border-2 p-2"
      id={id}
      {...register(id)}
      type={type}
    />
  );
}
