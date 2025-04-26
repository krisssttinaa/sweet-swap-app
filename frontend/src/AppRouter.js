import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import RecipeList from './pages/RecipeList';
import RecipeDetails from './pages/RecipeDetails';
import AddRecipe from './pages/AddRecipe';
import MessageList from './pages/MessageList';
import AchievementList from './pages/AchievementList';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Header from './components/Header';
import Footer from './components/Footer';
import Contact from './pages/Contact';

const AppRouter = () => (
  <Router>
    <Header />
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/recipes" element={<RecipeList />} />
      <Route path="/recipe/:id" element={<RecipeDetails />} />
      <Route path="/add-recipe" element={<AddRecipe />} />
      <Route path="/messages" element={<MessageList />} />
      <Route path="/achievements" element={<AchievementList />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/recipes/category/:category" element={<RecipeList />} />
    </Routes>
    <Footer />
  </Router>
);

export default AppRouter;