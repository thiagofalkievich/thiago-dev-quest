
import Link from "next/link";
import type { ReactNode } from "react";

type PixelButtonProps = {
  children: ReactNode;
  href: string;
  variant?: "primary" | "secondary";
};

export default function PixelButton({
  children,
  href,
  variant = "primary",
}: PixelButtonProps) {
  return (
    <Link
      href={href}
      className={`pixel-button ${variant}`}
    >
      {children}
    </Link>
  );
}
