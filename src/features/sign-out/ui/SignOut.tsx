"use client";

import { signOutAction } from "../api/sign-out.action";
import { Button } from "@/src/shared/ui";
import { useTransition } from "react";

interface SignOutProps {
  variant?: "ghost" | "destructive" | "outline";
  className?: string;
  children?: React.ReactNode;
}

export const SignOut = ({
  variant = "ghost",
  className,
  children,
}: SignOutProps) => {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      variant={variant}
      className={className}
      disabled={isPending}
      onClick={() => startTransition(() => signOutAction())}
    >
      {children}
    </Button>
  );
};
