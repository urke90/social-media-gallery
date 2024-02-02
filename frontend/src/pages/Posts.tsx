// react
import { useState } from 'react';
// react router
import { Routes, Route } from 'react-router-dom';
// components
import { Navbar, PostDetails, ImageFeed, SearchPost, CreatePost } from '@/components';

// ----------------------------------------------------------------

import { ISanityUser } from '@/models';

type PinsProps = {
  user: ISanityUser | null;
};

const Pins: React.FC<PinsProps> = ({ user }) => {
  const [searchQuery, setSearchQuery] = useState('');

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

export default Pins;
