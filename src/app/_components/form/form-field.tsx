import Input, { type InputProps } from "./input";
import Select, { type SelectProps } from "./select";

type FormFieldProps<FieldValues extends Record<string, unknown>> = {
  title: string;
  error?: string;
} & (
  | ({ as?: "input" } & InputProps<FieldValues>)
  | ({ as: "select" } & SelectProps<FieldValues>)
);

export default function FormField<FieldValues extends Record<string, unknown>>({
  id,
  title,
  error,
  ...rest
}: FormFieldProps<FieldValues>) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-bold">
        {title}
      </label>
      {rest.as === "input" || rest.as === undefined ? (
        <Input id={id} {...rest} />
      ) : null}
      {rest.as === "select" ? <Select id={id} {...rest} /> : null}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
