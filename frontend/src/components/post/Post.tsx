// types
import { type IPost } from '@/models';

// ----------------------------------------------------------------

interface IPostProps {
  post: IPost;
}

const Post: React.FC<IPostProps> = (props) => {
  return <div>Post</div>;
};

export default Post;
