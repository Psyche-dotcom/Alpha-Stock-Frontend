"use client";

import type { ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function InputFilter({
  placeholder = "Search by name or email",
  setQuery,
  className,
}: {
  placeholder?: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
}) {
  return (
    <Input
      placeholder={placeholder}
      onChange={async (event: ChangeEvent<HTMLInputElement>) =>
        setQuery(event.target.value)
      }
      type="search"
      className={cn("h-12 w-[280px]", className)}
    />
  );
}
