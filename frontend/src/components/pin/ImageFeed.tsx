import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useClient } from '@/hooks';
import { MasonryLayout, Spinner } from '..';
// ----------------------------------------------------------------

type ImageFeedPropsProps = {};

const ImageFeed: React.FC<ImageFeedPropsProps> = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  return <div>ImageFeed</div>;
};

export default ImageFeed;
