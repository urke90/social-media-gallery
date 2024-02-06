// uuid
import { v4 as uuidv4 } from 'uuid';
// hooks
import { useClient } from '..';
// types

// ----------------------------------------------------------------

interface ISavePost {
  isPostSaved: boolean;
  userId?: string;
  postId: string;
}

export const useSavePost = () => {
  const client = useClient();

  const handleSavePost = async ({ isPostSaved, postId, userId }: ISavePost) => {
    if (!isPostSaved) {
      await client
        .patch(postId)
        .setIfMissing({ save: [] })
        .insert('after', 'save[-1]', [
          {
            _key: uuidv4(),
            userId: userId,
            postedBy: {
              _type: 'postedBy',
              _ref: userId,
            },
          },
        ])
        .commit();
      window.location.reload();
    }
  };

  return handleSavePost;
};
