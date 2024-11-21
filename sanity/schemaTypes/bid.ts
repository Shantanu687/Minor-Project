import { defineType } from 'sanity';

export default defineType({
  name: 'bid',
  type: 'document',
  title: 'Bid',
  fields: [
    { name: 'user', type: 'string', title: 'User ID' },
    { name: 'product', type: 'reference', to: [{ type: 'product' }], title: 'Product' },
    { name: 'amount', type: 'number', title: 'Bid Amount' },
    { name: 'timestamp', type: 'datetime', title: 'Timestamp' },
  ],
});
