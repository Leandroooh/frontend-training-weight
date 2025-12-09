import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  name: string;
};

export function Button({ name, ...rest }: ButtonProps) {
  return (
    <button
      className="h-14 w-96 cursor-pointer rounded-4xl bg-[#0575E6] transition-colors duration-500 hover:bg-[#41a0ff]"
      type="submit"
      {...rest}
    >
      {name}
    </button>
  );
}
