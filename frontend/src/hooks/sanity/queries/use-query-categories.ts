// react
import { useCallback, useEffect, useState } from 'react';
// hooks
import { useClient } from '..';
// types
import { type ISanityPost } from '@/models';
// api
import { categoryQuery, POSTS_QUERY } from '@/api';

// ----------------------------------------------------------------

export const useQueryCategories = (searchQuery: string | undefined) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [posts, setPosts] = useState<ISanityPost[]>();
  const client = useClient();

  const SPECIFIC_CATEGORY = categoryQuery(searchQuery);

  const fetchPosts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      if (searchQuery) {
        const posts = await client.fetch<ISanityPost[]>(SPECIFIC_CATEGORY);
        console.log('posts', posts);
        setPosts(posts);
      } else {
        const posts = await client.fetch<ISanityPost[]>(POSTS_QUERY);
        setPosts(posts);
      }
      setIsLoading(false);
    } catch (err) {
      setError('Error while fetching data!');
    } finally {
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [searchQuery]);

  const clearError = () => setError(null);

  return {
    isLoading,
    error,
    posts,
    clearError,
  };
};
