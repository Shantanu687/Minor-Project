import { TrolleyIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const bidProductType = defineType({
  name: "bidProduct",
  title: "BidProduct",
  type: "document",
  icon: TrolleyIcon,
  fields: [
    defineField({
      name: "name",
      title: "Product Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Product Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "blockContent",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "startingBid",
      title: "Starting Bid",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: [{ type: "category" }] }],
    }),
    defineField({
        name: "visibilityDuration",
        title: "Visibility Duration (minutes)",
        type: "number",
        validation: (Rule) => Rule.min(0),
    }),
    defineField({
        name: "isActive",
        title: "Is Active",
        type: "boolean",
        validation: (Rule) => Rule.required(),
    })
  ],
    preview: {
        select: {
        title: "name",
        startingBid: "startingBid",
        media: "image",
        },
        prepare: (select) => ({
        title: select.title,
        subtitle: `₹${select.startingBid}`,
        media: select.media,
        }),
    },
});
