// This is category object i expect to receive from Sanity
export interface ISanityPost {
  destination: string;
  image: {
    asset: {
      url: string;
    };
  };
  _id: string;
  postedBy: {
    image: string;
    userName: string;
    _id: string;
  };
  save: {
    _key: string;
    postedBy: {
      _id: string;
      userName: string;
      image: string;
    };
  }[];
}
