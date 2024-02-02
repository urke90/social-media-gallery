// react
import { useEffect, useState } from 'react';
// sanity lib
import { useClient } from '..';
// types
import { type ISanityUser } from '@/models';

// ----------------------------------------------------------------

export const useQueryUser = (userId: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<ISanityUser | null>(null);

  const client = useClient();
  const query = `*[_type == "user" && _id == '${userId}']`;

  useEffect(() => {
    const fetchUser = async () => {
      let fetchedUser;
      try {
        setIsLoading(true);
        fetchedUser = await client.fetch<ISanityUser[]>(query);
        setUser(fetchedUser[0]);
        setIsLoading(false);
      } catch (err) {
        setError('Error while fetching the user details!');
      }
    };

    fetchUser();
  }, []);

  const clearError = () => setError(null);

  return {
    isLoading,
    sanityUser: user,
    error,
    clearError,
  };
};
