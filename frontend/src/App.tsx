// react router dom
import { Route, Routes } from "react-router-dom";

// pages
import Login from "@pages/Login";
import Home from "@pages/Home";

const App = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="/*" element={<Home />} />
    </Routes>
  );
};

export default App;
