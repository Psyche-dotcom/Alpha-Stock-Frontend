"use client";

import type { ChangeEvent } from "react";
import { Input } from "@/components/ui/input";

export function InputFilter({
  placeholder = "Search by name or email",
  setQuery,
}: {
  placeholder?: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <Input
      placeholder={placeholder}
      onChange={async (event: ChangeEvent<HTMLInputElement>) =>
        setQuery(event.target.value)
      }
      type="search"
      className="h-12 w-[280px]"
    />
  );
}
