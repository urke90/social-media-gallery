// react
import { useEffect, useState } from 'react';
// hooks
import { useClient } from '..';
// ----------------------------------------------------------------

export const useQueryCategories = (searchQuery: string | undefined) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pins, setPins] = useState();
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
            uerName,
            image
        },
        save[] {
            _key,
            postedBy -> {
                _id,
                useName,
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
            uerName,
            image
        },
        save[] {
            _key,
            postedBy -> {
                _id,
                useName,
                image
            },
        },
      }`;

  useEffect(() => {
    const fetchPins = async () => {
      try {
        setIsLoading(true);
        if (searchQuery) {
          const pins = await client.fetch(categoryQuery);
          setPins(pins);
        } else {
          const pins = await client.fetch(allPostsQuery);
          setPins(pins);
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
    pins,
    clearError,
  };
};
