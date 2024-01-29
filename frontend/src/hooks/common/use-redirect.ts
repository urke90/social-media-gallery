// react router
import { useNavigate, NavigateOptions } from "react-router-dom";

// ----------------------------------------------------------------

export const useRedirect = () => {
  const navigate = useNavigate();

  const redirectTo = (href: string, options: NavigateOptions) =>
    navigate(href, options);

  return {
    redirectTo,
  };
};
