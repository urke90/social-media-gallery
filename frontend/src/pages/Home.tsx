// react
import { useState, useEffect, useRef } from 'react';
// react router
import { Link, Routes, Route } from 'react-router-dom';
// react icons
import { HiMenu } from 'react-icons/hi';
import { AiFillCloseCircle } from 'react-icons/ai';
// sanity
import { useQueryUser } from '@/hooks';
// hooks
import { useLocalStorage } from '@/hooks';
// assets
import { Logo } from '@/assets/images';
// pages
import { Posts } from '.';
// components
import { Sidebar, UserProfile } from '@/components';

// ----------------------------------------------------------------

export const Home: React.FC = () => {
  const { getLocalStorageItem } = useLocalStorage();
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const user = getLocalStorageItem('user');
  const { sanityUser } = useQueryUser(user.sub);
  console.log('sanity user', sanityUser);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex bg-gray-50 md:flex-row flex-col h-screen tranastion-height duration-75">
      <div className="hidden md:flex h-screen flex-initial">
        <Sidebar user={sanityUser} />
      </div>
      <div className="flex md:hidden flex-row">
        <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
          <HiMenu fontSize={40} className="cursor-pointer" onClick={() => setToggleSidebar(true)} />
          <Link to="/">
            <img src={Logo} alt="Logo" className="w-28" />
          </Link>
          <Link to={`user-profile/${user?._id}`}>
            <img src={sanityUser?.image} alt="Logo" className="w-28" />
          </Link>
        </div>
        {toggleSidebar && (
          <div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
            <div className="absolute w-full flex justify-end items-center p-2">
              <AiFillCloseCircle
                fontSize={30}
                className="cursor-pointer"
                onClick={() => setToggleSidebar(false)}
              />
            </div>
            <Sidebar user={sanityUser} closeToggle={setToggleSidebar} />
          </div>
        )}
      </div>
      <div className="pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
        <Routes>
          <Route path="/user-profile/:userId" element={<UserProfile />} />
          <Route path="/*" element={<Posts user={sanityUser} />} />
          <Route />
        </Routes>
      </div>
    </div>
  );
};

export default Home;
