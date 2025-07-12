"use client";

import { SearchIcon } from "lucide-react";
import React, { forwardRef, type InputHTMLAttributes } from "react";

type SearchInputProps = InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
  containerClassName?: string;
};

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className = "", containerClassName = "", ...props }, ref) => (
    <div className={`relative ${containerClassName} group-content`}>
      <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <SearchIcon />
      </span>
      <input
        ref={ref}
        type="search"
        className={`focus:ring-primary w-full rounded-md border py-2 pr-4 pl-10 focus:ring-1 focus:outline-none ${className}`}
        placeholder="Search..."
        {...props}
      />
    </div>
  ),
);

SearchInput.displayName = "SearchInput";

export default SearchInput;
