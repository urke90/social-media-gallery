// manually crated interface for the user schema defined in the backend folder for user.ts file
export interface ISanityUser {
  image: string;
  userName: string;
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: 'user';
  _updatedAt: string;
}
