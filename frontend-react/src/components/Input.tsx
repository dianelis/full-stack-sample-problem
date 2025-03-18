import { forwardRef, InputHTMLAttributes, LegacyRef } from "react";

import clsx from "clsx";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
}

export const InputText = forwardRef(
  (
    { error, label, type, ...inputProps }: Props,
    ref: LegacyRef<HTMLInputElement>
  ) => (
    <label className="flex flex-col mb-5">
      {label}
      <input
        className={clsx("px-5 py-2 border bg-gray-200 rounded mb-0", {
          "border-red-500": !!error,
        })}
        type={type}
        ref={ref}
        {...inputProps}
      />

      <em className="text-red-500 text-sm mt-1">{error}</em>
    </label>
  )
);

InputText.displayName = "InputText";
