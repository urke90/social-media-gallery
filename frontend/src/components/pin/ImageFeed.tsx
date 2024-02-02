// react
import { useState, useEffect } from 'react';
// react router
import { useParams } from 'react-router-dom';
// hooks
import { useQueryCategories } from '@/hooks';
import { useClient } from '@/hooks';
import { MasonryLayout, Spinner } from '..';
// ----------------------------------------------------------------

interface IImageFeedProps {}

const ImageFeed: React.FC<IImageFeedProps> = (props) => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { isLoading, pins, error } = useQueryCategories(categoryId);

  useEffect(() => {
    console.log('pins', pins);
  }, [pins]);

  if (isLoading) {
    return <Spinner message="We are adding new ideas to your feed!" />;
  }

  return <div>ImageFeed</div>;
};

export default ImageFeed;
