
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


function App() {
  return (
    <>


      <BrowserRouter>
        <NavbarSimple />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:category" element={<CategoryPost />} />
          <Route path="/singin" element={<Login />} />
          <Route path="/singup" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/addpost" element={<Addpost />} />
          <Route path="/dashboard/mypost" element={<Mypost />} />
          <Route path="/dashboard/addCategory" element={<Category />} />
          <Route path="/post/:id" element={<PostDetails />} />
          <Route path="/post/:id" element={<PostDetails />} />
          <Route path="*" element={<Notfound />} />



        </Routes>
        <Footer />
      </BrowserRouter>
    </>


  );
}

export default App;
