// react router dom
import { Route, Routes } from "react-router-dom";

import { Home, Login } from "@/pages";

const Router = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="/*" element={<Home />} />
    </Routes>
  );
};

export default Router;
