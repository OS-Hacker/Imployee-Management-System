import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserDetails from "./components/UserDetails ";
import Context from "./context/Context";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { api } from "./Redux-toolkit/userSlice";

const App = () => {
  return (
    <ApiProvider api={api}>
      <Context>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/userDetails/:id" element={<UserDetails />} />
          </Routes>
        </BrowserRouter>
      </Context>
    </ApiProvider>
  );
};

export default App;
