"use client";

import React from "react";

import { Badge } from "@/components/ui/badge";
import type { Category } from "@/payload-types";

// Helper function to determine text color based on background color
const getContrastColor = (hexColor: string): string => {
  // Convert hex to RGB
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.5
    ? "#000000"
    : "#ffffff";
};

interface categoryProps {
  categories: Category[];
}
export const CategoryList = ({ categories }: categoryProps) => {
  return (
    <section className="">
      {categories.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <div key={category.id} className="group relative">
              <Badge
                variant={"outline"}
                className="cursor-pointer px-2 py-1 text-sm font-medium transition-all duration-300 group-hover:z-10 hover:shadow-lg"
              >
                {category.icon && (
                  <span className="mr-2">
                    <i className={category.icon}></i>
                  </span>
                )}
                {category.title}
                {category.subCategories &&
                  category.subCategories.docs &&
                  category.subCategories.docs.length > 0 && (
                    <span className="ml-2 text-xs opacity-75">
                      ({category.subCategories.docs.length})
                    </span>
                  )}
                {category.subCategories &&
                  category.subCategories.docs &&
                  category.subCategories.docs.length > 0 && (
                    <svg
                      className="ml-2 h-3 w-3 transition-transform duration-200 group-hover:rotate-180"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
              </Badge>

              {/* Subcategories Dropdown */}
              {category.subCategories &&
                category.subCategories.docs &&
                category.subCategories.docs.length > 0 && (
                  <div className="invisible absolute top-full left-0 z-20 mt-2 min-w-[200px] translate-y-2 transform rounded-lg border border-gray-200 bg-white opacity-0 shadow-lg transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    <div className="py-2">
                      {category.subCategories.docs
                        .map((subCategory) => subCategory as Category)
                        .filter((subCat) => subCat.isActive !== false) // Filter out inactive subcategories
                        .sort((a, b) => {
                          const aOrder = a.sortOrder || 0;
                          const bOrder = b.sortOrder || 0;

                          if (aOrder !== bOrder) {
                            return aOrder - bOrder;
                          }

                          // If sortOrder is the same, sort alphabetically by title
                          return (a.title || "").localeCompare(b.title || "");
                        })
                        .map((subCat) => {
                          return (
                            <div
                              key={subCat.id}
                              className="flex cursor-pointer items-center px-4 py-2 transition-colors duration-150 hover:bg-gray-50"
                            >
                              {subCat.icon && (
                                <span className="mr-2 text-sm opacity-70">
                                  <i className={subCat.icon}></i>
                                </span>
                              )}
                              <span className="text-sm text-gray-700 hover:text-gray-900">
                                {subCat.title}
                              </span>
                              {subCat.color && (
                                <div
                                  className="ml-auto h-3 w-3 rounded-full border border-gray-300"
                                  style={{ backgroundColor: subCat.color }}
                                ></div>
                              )}
                            </div>
                          );
                        })}
                    </div>
                  </div>
                )}
            </div>
          ))}
        </div>
      ) : (
        <div className="py-12 text-center">
          <div className="mb-4">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M7 7h.01M7 3h5c1.1 0 2 .9 2 2v1M9 21h6a2 2 0 002-2V7a2 2 0 00-2-2h-1m-5 0V3a2 2 0 00-2-2H4a2 2 0 00-2 2v1m5 0H4a2 2 0 00-2 2v12a2 2 0 002 2h2m5 0h6m-9-4h2m5-4h2"
              />
            </svg>
          </div>
          <p className="mb-2 text-lg text-gray-500">No categories found</p>
          <p className="text-sm text-gray-400">
            Please add some categories through the admin panel.
          </p>
        </div>
      )}
    </section>
  );
};
