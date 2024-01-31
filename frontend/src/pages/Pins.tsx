// react
import { useState } from 'react';
// react router
import { Routes, Route } from 'react-router-dom';
// components
import { Navbar, PinDetail, ImageFeed, SearchPin, CreatePin } from '@/components';

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
          <Route path="/" />
          <Route path="/category/:categoryId" />
          <Route path="/pin-detail/:pinId" element={<PinDetail user={user} />} />
          <Route path="/create-pin" element={<CreatePin user={user} />} />
          <Route
            path="/search"
            element={<SearchPin query={searchQuery} setSearchQuery={setSearchQuery} />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default Pins;
