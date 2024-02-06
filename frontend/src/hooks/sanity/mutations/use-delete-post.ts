// hooks
import { useClient } from '..';

// ----------------------------------------------------------------

export const useDeletePost = () => {
  const client = useClient();

  const handleDeletePost = async (postId: string) => {
    await client.delete(postId);
    window.location.reload();
  };

  return handleDeletePost;
};
