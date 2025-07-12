import { Badge } from "@/components/ui/badge";
import type { Category } from "@/payload-types";
import config from "@/payload.config";
import { headers as getHeaders } from "next/headers";
import { getPayload } from "payload";
import { CategoryList } from "./home/_components/category-list";

// Helper function to determine text color based on background color
const getContrastColor = (hexColor: string): string => {
  // Convert hex to RGB
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);

  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Return black or white based on luminance
  return luminance > 0.5 ? "#000000" : "#ffffff";
};

const Homepage = async () => {
  const headers = await getHeaders();
  const payloadConfig = await config;
  const payload = await getPayload({ config: payloadConfig });

  // Fetch categories data with subcategories populated
  const categoriesData = await payload.find({
    collection: "categories",
    depth: 2, // Increase depth to populate subcategories and their relations
    where: {
      parent: {
        exists: false, // Fetch only top-level categories
      },
      isActive: {
        equals: true, // Only fetch active categories
      },
    },
    sort: "sortOrder", // Sort by the sortOrder field
  });

  // Sort categories by sortOrder and then by title as fallback
  const sortedCategories = categoriesData.docs.sort((a, b) => {
    const aOrder = (a as Category).sortOrder || 0;
    const bOrder = (b as Category).sortOrder || 0;

    if (aOrder !== bOrder) {
      return aOrder - bOrder;
    }

    // If sortOrder is the same, sort alphabetically by title
    return ((a as Category).title || "").localeCompare(
      (b as Category).title || "",
    );
  });

  const categories = sortedCategories as Category[];

  return (
    <div className="container mx-auto px-4 py-8">
      <CategoryList categories={categories} />
    </div>
  );
};

export default Homepage;
