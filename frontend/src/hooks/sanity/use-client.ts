import { client } from '@/lib';

// ----------------------------------------------------------------

export const useClient = () => {
  if (!client) {
    throw new Error('Sanity client Error!');
  }

  return client;
};
