import type { BaseInputProps } from "./interfaces";

export interface SelectProps<FieldValues extends Record<string, unknown>>
  extends BaseInputProps<FieldValues> {
  options: { id: string; title: string }[];
}

export default function Select<FieldValues extends Record<string, unknown>>({
  id,
  register,
  options,
}: SelectProps<FieldValues>) {
  return (
    <select
      className="w-full rounded-md border-2 p-2"
      id={id}
      {...register(id)}
    >
      {options.map((o) => (
        <option className="text-red" key={o.id} id={o.id} value={o.id}>
          {o.title}
        </option>
      ))}
    </select>
  );
}
