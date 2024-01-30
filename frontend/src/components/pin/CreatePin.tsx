// types
import { type ISanityUser } from '@/models';

// ----------------------------------------------------------------

type CreatePinProps = {
  user: ISanityUser | null;
};

const CreatePin: React.FC<CreatePinProps> = (props) => {
  return <div>CreatePin</div>;
};

export default CreatePin;
