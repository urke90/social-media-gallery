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

export interface IGoogleUser {
  aud: string;
  azp: string;
  email: string;
  email_verified: boolean;
  exp: number;
  family_name: string;
  given_name: string;
  iat: number;
  iss: string;
  jti: string;
  locale: string;
  name: string;
  nbf: number;
  picture: string;
  sub: string;
}
