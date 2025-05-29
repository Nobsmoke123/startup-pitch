import { defineField, defineType } from "sanity";

export const startup = defineType({
  name: "startup",
  title: "Startup",
  type: "document",
  fields: [
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    }),

    defineField({
      name: "title",
      type: "string",
    }),

    defineField({
      name: "author",
      type: "reference",
      to: [{ type: "author" }],
    }),

    defineField({
      name: "views",
      type: "number",
    }),

    defineField({
      name: "category",
      type: "string",
      validation: (Rule) => Rule.required().min(3).max(26),
    }),

    defineField({
      name: "image",
      type: "url",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "description",
      type: "text",
    }),

    defineField({
      name: "pitch",
      type: "markdown",
    }),
  ],
});
