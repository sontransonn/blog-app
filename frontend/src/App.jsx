import React from "react"
import "./App.css"
import { Routes, Route } from "react-router-dom";

import Home from "./pages/home/Home"
import ArticleDetail from "./pages/home/Articles/ArticleDetail/ArticleDetail";
import Register from "./pages/register/Register";

function App() {

  return (
    <div className="App font-opensans">
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/blog/:slug" element={<ArticleDetail />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  )
}

export default App
