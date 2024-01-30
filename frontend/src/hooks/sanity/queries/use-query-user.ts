// react
import { useEffect, useState } from 'react';
// sanity lib
import { useClient } from '..';
// types
import { type ISanityUser } from '@/models';

// ----------------------------------------------------------------

export const useQueryUser = (userId: string) => {
  const [user, setUser] = useState<ISanityUser | null>(null);

  const client = useClient();
  const query = `*[_type == "user" && _id == '${userId}']`;

  useEffect(() => {
    const fetchUser = async () => {
      let fetchedUser;
      try {
        fetchedUser = await client.fetch<ISanityUser[]>(query);
        setUser(fetchedUser[0]);
      } catch (err) {
        throw new Error('Error fetching user from server');
      }

      console.log('fetchedUser', fetchedUser);
    };

    fetchUser();
  }, []);

  return {
    sanityUser: user,
  };
};
