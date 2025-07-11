import React from "react";
import { getPayload } from "payload";
import { headers as getHeaders } from "next/headers";
import config from "@/payload.config";
import type { Category, Media } from "@/payload-types";

const Homepage = async () => {
  const headers = await getHeaders();
  const payloadConfig = await config;
  const payload = await getPayload({ config: payloadConfig });

  // Fetch categories data
  const categoriesData = await payload.find({
    collection: "categories",
    depth: 1, // This will populate the image relation
  });
  console.log("categoriesData", categoriesData);
  const categories = categoriesData.docs as Category[];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">
        Welcome to Our Multi-Vendor Platform
      </h1>

      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold">Categories</h2>
        {categories.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <div
                key={category.id}
                className="rounded-lg bg-white p-6 shadow-md transition-shadow hover:shadow-lg"
              >
                {category.image && typeof category.image === "object" && (
                  <div className="mb-4">
                    <img
                      src={(category.image as Media).url || ""}
                      alt={(category.image as Media).alt || category.title}
                      className="h-48 w-full rounded-md object-cover"
                    />
                  </div>
                )}
                <h3 className="mb-2 text-xl font-semibold">{category.title}</h3>
                {category.description && (
                  <p className="text-gray-600">{category.description}</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">
            No categories found. Please add some categories through the admin
            panel.
          </p>
        )}
      </section>
    </div>
  );
};

export default Homepage;
