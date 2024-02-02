// react masonry
import Masonry from 'react-masonry-css';
// types
import { type IPost } from '@/models';
// components
import { Post } from '..';

// ----------------------------------------------------------------

interface IMasonryLayoutProps {
  posts: IPost[];
}

// object for showing num of cols for Masonry layout component
const breakpoints: { [key: string | number]: number } = {
  default: 4,
  3000: 6,
  2000: 5,
  1200: 3,
  1000: 2,
  500: 1,
};

const MasonryLayout: React.FC<IMasonryLayoutProps> = ({ posts }) => {
  return (
    <Masonry breakpointCols={breakpoints} className="flex animate-slide-fwd">
      {posts?.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </Masonry>
  );
};

export default MasonryLayout;
