// react
import { useState, useEffect } from 'react';
// react router
import { useParams } from 'react-router-dom';
// hooks
import { useQueryCategories } from '@/hooks';
import { MasonryLayout, Spinner } from '..';
// ----------------------------------------------------------------

interface IImageFeedProps {}

const ImageFeed: React.FC<IImageFeedProps> = (props) => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { isLoading, posts, error } = useQueryCategories(categoryId);

  if (isLoading) {
    return <Spinner message="We are adding new ideas to your feed!" />;
  }

  return <div>ImageFeed</div>;
};

export default ImageFeed;
