// types
import { type ISanityUser } from '@/models';

// ----------------------------------------------------------------

interface ICreatePostProps {
  user: ISanityUser | null;
}

const CreatePost: React.FC<ICreatePostProps> = (props) => {
  return <div>CreatePin</div>;
};

export default CreatePost;
