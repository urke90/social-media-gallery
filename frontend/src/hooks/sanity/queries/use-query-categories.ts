// react
import { useEffect, useState } from 'react';
// hooks
import { useClient } from '..';
// types
import { type IPost } from '@/models';

// ----------------------------------------------------------------

export const useQueryCategories = (searchQuery: string | undefined) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [posts, setPosts] = useState<IPost[]>();
  const client = useClient();

  const categoryQuery = `*[_type == 'pin' && title match '${searchQuery}*' || category match '${searchQuery}*' || about match '${searchQuery}*']{
        image {
            asset -> {
                url
            }
        },
        _id,
        destination,
        postedBy -> {
            _id,
            userName,
            image
        },
        save[] {
            _key,
            postedBy -> {
                _id,
                userName,
                image
            },
        },
      }`;

  const allPostsQuery = `*[_type == 'pin'] | order(_createdAt desc) {
        image {
            asset -> {
                url
            }
        },
        _id,
        destination,
        postedBy -> {
            _id,
            userName,
            image
        },
        save[] {
            _key,
            postedBy -> {
                _id,
                userName,
                image
            },
        },
      }`;

  useEffect(() => {
    const fetchPins = async () => {
      try {
        setIsLoading(true);
        if (searchQuery) {
          const pins = await client.fetch<IPost[]>(categoryQuery);
          setPosts(pins);
        } else {
          const pins = await client.fetch<IPost[]>(allPostsQuery);
          setPosts(pins);
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
