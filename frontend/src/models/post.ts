// This is category object i expect to receive from Sanity
export interface IPost {
  destination: string;
  image: {
    asset: {
      url: string;
    };
  };
  postedBy: {
    image: string;
    userName: string;
    _id: string;
  };
  save: unknown[] | null;
}
