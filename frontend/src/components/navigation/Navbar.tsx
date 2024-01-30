// ----------------------------------------------------------------

type NavbarProps = {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
};

const Navbar: React.FC<NavbarProps> = (props) => {
  return <div>Navbar</div>;
};

export default Navbar;
