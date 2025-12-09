import type { InputHTMLAttributes, ReactNode } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  icon?: ReactNode;
};

export function Input({ icon, ...rest }: InputProps) {
  return (
    <div className="relative h-16 w-96">
      {icon && (
        <div className="-translate-y-1/2 absolute top-1/2 left-4 transform text-gray-400">
          {icon}
        </div>
      )}
      <input
        className="h-full w-full rounded-4xl border border-gray-400 pr-4 pl-12 text-gray-600 outline-none placeholder:text-gray-400"
        {...rest}
      />
    </div>
  );
}
