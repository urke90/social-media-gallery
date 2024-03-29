// react router
import { useParams } from 'react-router-dom';
// hooks
import { useQueryCategories } from '@/hooks';
// types
import { type ISanityPost } from '@/models';
// components
import { MasonryLayout, Spinner } from '..';
import { useEffect } from 'react';
// ----------------------------------------------------------------

interface IImageFeedProps {}

const ImageFeed: React.FC<IImageFeedProps> = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { isLoading, posts, error } = useQueryCategories(categoryId);

  console.log('ImageFeed');

  useEffect(() => {
    console.log('posts IMAGE FEED', posts);
  }, [posts]);

  return (
    <ImageFeedContent
      isLoading={isLoading}
      error={error}
      hasData={posts !== undefined && posts.length > 0}
      posts={posts}
    />
  );
};

interface IImageFeedContentProps {
  isLoading: boolean;
  hasData: boolean;
  posts: ISanityPost[] | undefined;
  error?: string | null;
}

const ImageFeedContent: React.FC<IImageFeedContentProps> = ({
  posts,
  hasData,
  isLoading,
  error,
}) => {
  if (isLoading) {
    return <Spinner message="We are adding new ideas to your feed!" />;
  }
  if (!hasData) {
    // refactor this to have component instead of text
    return (
      <div>
        <h2>There is no data to show</h2>
      </div>
    );
  }
  if (error) {
    // insert some modal or something. this is temporary solution
    return (
      <div>
        <h2>Something went wrong!</h2>
      </div>
    );
  }

  return <div>{posts && <MasonryLayout posts={posts} />}</div>;
};

export default ImageFeed;
