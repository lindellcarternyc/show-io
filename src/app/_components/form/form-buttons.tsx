"use client";

interface FormButtonProps {
  isLoading: boolean;
  onClickCancel: () => void;
  submitTitle: string;
}

export default function FormButtons({
  isLoading,
  onClickCancel,
  submitTitle,
}: FormButtonProps) {
  return (
    <div className="flex justify-end gap-4">
      <button
        type="button"
        className="rounded bg-slate-400 px-4 py-2"
        disabled={isLoading}
        onClick={onClickCancel}
      >
        Cancel
      </button>
      <button
        type="submit"
        className={`rounded bg-blue-500 px-4 py-2 text-white ${
          isLoading ? "cursor-not-allowed" : ""
        }`}
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : submitTitle}
      </button>
    </div>
  );
}
