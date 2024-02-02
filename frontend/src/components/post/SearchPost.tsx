// ----------------------------------------------------------------

interface ISearchPostProps {
  query: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const SearchPost: React.FC<ISearchPostProps> = (props) => {
  return <div>SearchPin</div>;
};

export default SearchPost;
