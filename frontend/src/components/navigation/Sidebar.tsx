// types
import { type ISanityUser } from '@/models';
// ----------------------------------------------------------------

type SidebarProps = {
  user: ISanityUser | null;
  closeToggle?: React.Dispatch<React.SetStateAction<boolean>>;
};

const Sidebar: React.FC<SidebarProps> = (props) => {
  return <div>Sidebar</div>;
};

export default Sidebar;
