import { defineType } from 'sanity';

export default defineType({
  name: 'bidProduct',
  type: 'document',
  title: 'BidProduct',
  fields: [
    { name: 'name', type: 'string', title: 'Name' },
    { name: "slug", title: "Slug", type: "slug",options: { source: "name", maxLength: 96,}, validation: (Rule) => Rule.required(),
    },
    { name: 'description', type: 'text', title: 'Description' },
    { name: 'image', type: 'image', title: 'Image' },
    { name: 'startingBid', type: 'number', title: 'Starting Bid' },
    { name: 'visibilityDuration', type: 'number', title: 'Visibility Duration (minutes)' },
    { name: 'isActive', type: 'boolean', title: 'Is Active' },
  ],
});

