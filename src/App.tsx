import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import PostPage from './pages/PostPage';
import CreateEditPost from './pages/CreateEditPost';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
        <Navbar />
        <main className="container mx-auto px-4 py-24">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/post/:id" element={<PostPage />} />
            <Route path="/create" element={<CreateEditPost />} />
            <Route path="/edit/:id" element={<CreateEditPost />} />
          </Routes>
        </main>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;