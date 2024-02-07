// react
import { useState } from 'react';
// hooks
import { useClient } from '..';
import { useRedirect } from '@/hooks';
// types
import type { SanityAssetDocument, SanityDocument, SanityImageAssetDocument } from '@sanity/client';
import type { ISanityUser } from '@/models';

// ----------------------------------------------------------------

interface IPostData {
  title: string;
  about: string;
  destination: string;
  category: string;
}

type ImageDocumentType = SanityImageAssetDocument & SanityAssetDocument & SanityDocument;

export const useCreatePost = (user: ISanityUser | null) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isWrongImageType, setIsWrongImageType] = useState(false);
  const [fields, setFields] = useState(false);
  const [imageAsset, setImageAsset] = useState<ImageDocumentType | null>(null);

  const client = useClient();
  const redirectTo = useRedirect();

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) return;

    const { type, name } = e.target.files[0];

    if (
      type === 'image/png' ||
      type === 'image/svg' ||
      type === 'image/jpeg' ||
      type === 'image/tiff'
    ) {
      console.log('da');
      setIsWrongImageType(false);
      setIsLoading(true);
      try {
        const document = await client.assets.upload('image', e.target.files[0], {
          contentType: type,
          filename: name,
        });

        setImageAsset(document);
      } catch (error) {
        console.log('Image upload error: ', error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsWrongImageType(true);
    }
  };

  const saveCreatedPost = async ({ title, about, destination, category }: IPostData) => {
    if (title && about && destination && imageAsset?._id && category) {
      const doc = {
        _type: 'post',
        title,
        about,
        destination,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageAsset?._id,
          },
        },
        userId: user?._id,
        postedBy: {
          _type: 'postedBy',
          _ref: user?._id,
        },
        category,
      };

      try {
        await client.create(doc);
        redirectTo('/');
      } catch (error) {
        console.log('Could not create post', error);
      }
    } else {
      setFields(true);

      setTimeout(() => {
        setFields(false);
      }, 2000);
    }
  };

  return {
    isLoading,
    fields,
    isWrongImageType,
    imageAsset,
    setImageAsset,
    uploadImage,
    saveCreatedPost,
  };
};
