// react
import { useState } from 'react';
// react router
import { Routes, Route } from 'react-router-dom';
// types
import { type ISanityUser } from '@/models';
// components
import { Navbar, PostDetails, ImageFeed, SearchPost, CreatePost } from '@/components';

// ----------------------------------------------------------------

interface PostsProps {
  user: ISanityUser | null;
}

const Posts: React.FC<PostsProps> = ({ user }) => {
  const [searchQuery, setSearchQuery] = useState('');

  console.log('user in posts', user);

  return (
    <div className="px-2 md:px-5">
      <div className="bg-gray-50">
        <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} user={user} />
      </div>
      <div className="h-full">
        <Routes>
          <Route path="/" element={<ImageFeed />} />
          <Route path="/category/:categoryId" element={<ImageFeed />} />
          <Route path="/pin-detail/:pinId" element={<PostDetails user={user} />} />
          <Route path="/create-pin" element={<CreatePost user={user} />} />
          <Route
            path="/search"
            element={<SearchPost query={searchQuery} setSearchQuery={setSearchQuery} />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default Posts;
