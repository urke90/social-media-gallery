// react
import { useEffect, useState } from 'react';
// hooks
import { useClient } from '..';
// types
import { type IPost } from '@/models';
// api
import { generateCategoryQuery, ALL_POSTS } from '@/api';

// ----------------------------------------------------------------

export const useQueryCategories = (searchQuery: string | undefined) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [posts, setPosts] = useState<IPost[]>();
  const client = useClient();

  const SPECIFIC_CATEGORY = generateCategoryQuery(searchQuery);

  useEffect(() => {
    const fetchPins = async () => {
      try {
        setIsLoading(true);
        if (searchQuery) {
          const posts = await client.fetch<IPost[]>(SPECIFIC_CATEGORY);
          setPosts(posts);
        } else {
          const posts = await client.fetch<IPost[]>(ALL_POSTS);
          setPosts(posts);
        }
        setIsLoading(false);
      } catch (err) {
        setError('Error while fetching data!');
      }
    };
    fetchPins();
  }, [searchQuery]);

  const clearError = () => setError(null);

  return {
    isLoading,
    error,
    posts,
    clearError,
  };
};
