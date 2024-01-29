// google
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
// jwt
import { JwtPayload, jwtDecode } from 'jwt-decode';
// sanity
import { client } from '@/lib/sanity';
import { IdentifiedSanityDocumentStub } from '@sanity/client';
// hooks
import { useRedirect, useLocalStorage } from '@/hooks';
// assets
import { LogoWhiteImg } from '@/assets/images';
import { LoginVideo } from '@/assets/videos';

// ----------------------------------------------------------------

type GoogleCredentials = JwtPayload & {
  given_name: string;
  picture: string;
  sub: string;
};

export const Login: React.FC = () => {
  const { redirectTo } = useRedirect();
  const { setLocalStorageItem } = useLocalStorage();

  const handleLogin = async (credentialRes: CredentialResponse) => {
    if (!credentialRes || !credentialRes.credential) {
      console.log('Error with sign in');
      return;
    }

    const userProfile = jwtDecode<GoogleCredentials>(credentialRes.credential);
    setLocalStorageItem('user', userProfile);

    const { sub, picture, given_name } = userProfile;

    const doc: IdentifiedSanityDocumentStub = {
      _id: sub,
      _type: 'user',
      userName: given_name,
      image: picture,
    };

    await client.createIfNotExists(doc);
    redirectTo('/', { replace: true });
  };

  const handleErrorLogin = () => {
    console.log('Error while login');
  };

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full">
        <video loop muted autoPlay className="w-full h-full object-cover">
          <source src={LoginVideo} type="video/mp4" />
        </video>
        <div className="absolute flex flex-col justify-center items-center top-0 left-0 right-0 bottom-0 bg-blackOverlay">
          <div className="p-5">
            <img src={LogoWhiteImg} width="130px" alt="logo" />
          </div>
          <div className="shadow-2xl">
            <GoogleLogin onSuccess={handleLogin} onError={handleErrorLogin} />
          </div>
        </div>
      </div>
    </div>
  );
};
