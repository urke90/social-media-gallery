// types
import { type ISanityUser } from '@/models';
// ----------------------------------------------------------------

interface IPostDetailsProps {
  user: ISanityUser | null;
}

const PostDetails: React.FC<IPostDetailsProps> = (props) => {
  return <div>PinDetal</div>;
};

export default PostDetails;
