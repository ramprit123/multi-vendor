import type { CollectionConfig } from "payload";

export const Categories: CollectionConfig = {
  slug: "categories",
  admin: {
    useAsTitle: "title",
    defaultColumns: [
      "title",
      "slug",
      "description",
      "parent",
      "isActive",
      "sortOrder",
      "updatedAt",
    ],
    group: "Content",
    listSearchableFields: ["title", "description", "slug"],
    pagination: {
      defaultLimit: 25,
    },
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  hooks: {
    beforeValidate: [
      ({ data, operation }) => {
        // Generate slug from title if not provided
        if (data?.title && !data?.slug) {
          data.slug = data.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");
        }

        // Ensure color has # prefix if provided
        if (data?.color && !data.color.startsWith("#")) {
          data.color = `#${data.color}`;
        }

        return data;
      },
    ],
    beforeChange: [
      ({ data, operation }) => {
        // Prevent self-referencing as parent
        if (data?.parent && operation === "update" && data.parent === data.id) {
          throw new Error("A category cannot be its own parent");
        }
        return data;
      },
    ],
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      admin: {
        description: "The category title",
      },
      validate: (val: unknown) => {
        if (typeof val === "string" && val.length < 2) {
          return "Title must be at least 2 characters long";
        }
        return true;
      },
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      admin: {
        description:
          "URL-friendly version of the title (auto-generated if not provided)",
        placeholder: "category-slug",
      },
      validate: (val: unknown) => {
        if (typeof val === "string" && !/^[a-z0-9-]+$/.test(val)) {
          return "Slug can only contain lowercase letters, numbers, and hyphens";
        }
        return true;
      },
    },
    {
      name: "description",
      type: "textarea",
      admin: {
        description: "Brief description of the category",
        rows: 3,
      },
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      admin: {
        description: "Category image",
      },
    },
    {
      name: "icon",
      type: "text",
      admin: {
        description: "Icon class or name (e.g., fas fa-shopping-cart)",
        placeholder: "fas fa-tag",
      },
    },
    {
      name: "color",
      type: "text",
      admin: {
        description: "Category color (hex code, e.g., #FF5733)",
        placeholder: "#FF5733",
      },
      validate: (val: unknown) => {
        if (
          val &&
          typeof val === "string" &&
          !/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(val)
        ) {
          return "Please enter a valid hex color code (e.g., #FF5733 or #F57)";
        }
        return true;
      },
    },
    {
      name: "parent",
      type: "relationship",
      relationTo: "categories",
      hasMany: false,
      admin: {
        description: "Parent category (leave empty for top-level category)",
      },
      filterOptions: ({ id }) => {
        // Prevent selecting self as parent
        return {
          id: {
            not_equals: id,
          },
        };
      },
    },
    {
      name: "subCategories",
      type: "join",
      collection: "categories",
      on: "parent",
      hasMany: true,
      admin: {
        description: "Sub-categories under this category",
      },
    },
    {
      name: "metadata",
      type: "group",
      admin: {
        description: "SEO and metadata information",
      },
      fields: [
        {
          name: "metaTitle",
          type: "text",
          admin: {
            description: "SEO title for this category",
          },
        },
        {
          name: "metaDescription",
          type: "textarea",
          admin: {
            description: "SEO description for this category",
            rows: 2,
          },
        },
        {
          name: "keywords",
          type: "text",
          admin: {
            description: "Comma-separated keywords for SEO",
            placeholder: "keyword1, keyword2, keyword3",
          },
        },
      ],
    },
    {
      name: "isActive",
      type: "checkbox",
      defaultValue: true,
      admin: {
        description: "Whether this category is active and visible",
        position: "sidebar",
      },
    },
    {
      name: "isFeatured",
      type: "checkbox",
      defaultValue: false,
      admin: {
        description: "Mark as featured category",
        position: "sidebar",
      },
    },
    {
      name: "sortOrder",
      type: "number",
      defaultValue: 0,
      admin: {
        description:
          "Sort order for displaying categories (lower numbers appear first)",
        position: "sidebar",
      },
    },
    {
      name: "productCount",
      type: "number",
      defaultValue: 0,
      admin: {
        description: "Number of products in this category (auto-calculated)",
        position: "sidebar",
        readOnly: true,
      },
    },
  ],
};
