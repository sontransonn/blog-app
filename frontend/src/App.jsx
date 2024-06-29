import React from "react"
import "./App.css"
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Home from "./pages/home/Home"
import BlogDetail from "./pages/blogDetail/BlogDetail";
import Admin from "./pages/admin/Admin";
import Profile from "./pages/profile/Profile";
import Auth from "./pages/auth/Auth";

function App() {

  return (
    <div className="App font-opensans">
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/blog/:slug" element={<BlogDetail />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
