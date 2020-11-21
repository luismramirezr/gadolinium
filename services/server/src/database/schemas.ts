import { createSchema } from 'database/database';

export const User = createSchema({
  _id: {
    type: String,
    required: true,
  },
  _type: {
    type: String,
    default: 'USER',
    forceDefault: true,
  },
  data: {
    type: Object,
    schema: {
      name: {
        type: String,
        required: true,
      },
      surname: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      adresses: {
        type: Array,
        schema: [
          {
            type: Object,
            schema: {
              name: { type: String, required: true },
              main: { type: Boolean, default: false },
              street: { type: String, required: true },
              complement: { type: String, required: false },
              number: { type: String, required: false },
              neigh: { type: String, required: true },
              state: { type: String, required: true },
              zip: { type: String, required: true },
              country: { type: String, default: 'BRA' },
            },
          },
        ],
      },
    },
  },
});
