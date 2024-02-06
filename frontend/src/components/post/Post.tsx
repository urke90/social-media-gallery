// react
import { useState } from 'react';
// react router
import { useNavigate, Link } from 'react-router-dom';
// uuid
import { v4 as uuidv4 } from 'uuid';
// react icons
import { AiTwotoneDelete } from 'react-icons/ai';
import { MdDownloadForOffline } from 'react-icons/md';
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs';
// hooks
import { useClient, useDeletePost, useSavePost } from '@/hooks';
import { useLocalStorage } from '@/hooks';
// types
import { urlFor } from '@/lib';
import { type IPost, IGoogleUser } from '@/models';

// ----------------------------------------------------------------

interface IPostProps {
  post: IPost;
}

// TODO: 2.36.16 finish commented out code

const Post: React.FC<IPostProps> = ({ post }) => {
  const { getLocalStorageItem } = useLocalStorage();
  const user = getLocalStorageItem<IGoogleUser>('user');
  const navigate = useNavigate();
  const [isPostHovered, setIsPostHovered] = useState(false);
  const client = useClient();
  const handleSavePost = useSavePost();
  const handleDeletePost = useDeletePost();

  const { _id, destination, image, postedBy, save } = post;
  // checks if post is already saved
  const isPostSaved = !!save?.filter((item) => item.postedBy._id === user?.sub)?.length;

  if (!user) return null;

  const deletePost = async (id: string) => {
    await client.delete(id);
    window.location.reload();
  };

  return (
    <div className="m-2">
      <div
        onMouseEnter={() => setIsPostHovered(true)}
        onMouseLeave={() => setIsPostHovered(false)}
        onClick={() => navigate(`/pin-details/${_id}`)}
        className="relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
      >
        <img
          src={image ? urlFor(image).width(250).url() : ''}
          alt="user-post"
          className="rounded w-full"
        />
        {isPostHovered && (
          <div
            className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50"
            style={{ height: '100%' }}
          >
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <a
                  href={`${image?.asset?.url}?dl=`}
                  download
                  onClick={(e) => e.stopPropagation()}
                  className="flex bg-white w-9 h-9 rounded-full items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none"
                >
                  <MdDownloadForOffline />
                </a>
              </div>
              {isPostSaved ? (
                <button
                  type="button"
                  className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none"
                >
                  {save?.length} Saved
                </button>
              ) : (
                <button
                  type="button"
                  className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSavePost({ isPostSaved, postId: _id, userId: user.sub });
                  }}
                >
                  Save
                </button>
              )}
            </div>
            <div className="flex justify-between items-center gap-2 w-full">
              {destination && (
                <a
                  href={destination}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-white flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:100 hover:shadow-md"
                >
                  <BsFillArrowUpRightCircleFill />
                  {destination.length > 20 ? destination.slice(8, 20) : destination.slice(8)}
                </a>
              )}
              {postedBy._id === user.sub && (
                <button
                  type="button"
                  className="bg-white p-2 opacity-70 hover:opacity-100  font-bold text-dark text-base rounded-3xl hover:shadow-md outline-none"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeletePost(_id);
                  }}
                >
                  <AiTwotoneDelete />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      <Link to={`user-profile/${postedBy?._id}`} className="flex gap-2 mt-2 items-center">
        <img
          src={postedBy.image}
          alt="user-profile"
          className="w-8 h-8 rounded-full object-cover"
        />
        <p className="font-semibold capitalize">{postedBy.userName}</p>
      </Link>
    </div>
  );
};

export default Post;
