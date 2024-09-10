
import { NavbarSimple } from "./components/NavbarSimple";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import PostDetails from "./components/PostDetails";
import Addpost from "./components/Addpost";
import Category from "./components/Category";
import Mypost from "./components/Mypost";
import CategoryPost from "./components/CategoryPost";
import Notfound from "./components/Notfound";
import { Footer } from "./components/Footer";
import UserProfile from "./components/UserProfile";
import { createContext } from "react";
import { useState } from "react";
import Videopost from "./components/Videopost";
import AllUser from "./components/AllUser";
import FollowingPost from "./components/FollowingPost";

export const MyContext = createContext();


function App() {

  const [state, setState] = useState(false);
  const [gThem, setGThem] = useState(null);
  return (
    <>


      <BrowserRouter>
        <MyContext.Provider value={[state, setState, gThem, setGThem]}>
          <NavbarSimple />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:category" element={<CategoryPost />} />
            <Route path="/singin" element={<Login />} />
            <Route path="/singup" element={<Register />} />
            <Route path="/video" element={<Videopost />} />
            <Route path="/explore" element={<AllUser />} />
            <Route path="/followingpost" element={<FollowingPost />} />
            <Route path="/profile/:username" element={<UserProfile />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/addpost" element={<Addpost />} />
            <Route path="/dashboard/mypost" element={<Mypost />} />
            <Route path="/dashboard/addCategory" element={<Category />} />
            <Route path="/post/:id" element={<PostDetails />} />
            <Route path="/post/:id" element={<PostDetails />} />
            <Route path="*" element={<Notfound />} />



          </Routes>
          <Footer />
        </MyContext.Provider>
      </BrowserRouter>
    </>


  );
}

export default App;
