import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'; // Import useParams to get category from URL if needed
import RecipeCard from '../components/RecipeCard';
import './RecipeList.css';

const RecipeList = () => {
  const { category: categoryParam } = useParams(); // Get category from URL
  const [recipes, setRecipes] = useState([]);
  const [selectedTab, setSelectedTab] = useState('all'); 
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [currentCategory, setCurrentCategory] = useState(categoryParam || 'all'); // Initialize with URL category or default to 'all'

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const fetchRecipes = useCallback(async () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('user_id');

    try {
      let response;
      if (selectedTab === 'saved') {
        response = await axios.get('http://88.200.63.148:8288/api/saved/saved', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (currentCategory !== 'all') {
          response = {
            data: response.data.filter(recipe => recipe.category === currentCategory)
          };
        }
      } else if (selectedTab === 'my') {
        if (!userId) {
          console.error('No user ID found. Cannot fetch user-specific recipes.');
          return;
        }
        response = await axios.get('http://88.200.63.148:8288/api/recipes', {
          headers: { Authorization: `Bearer ${token}` }
        });
        response = {
          data: response.data.filter(recipe => recipe.user_id === parseInt(userId) && (currentCategory === 'all' || recipe.category === currentCategory))
        };
      } else {
        if (currentCategory === 'all') {
          response = await axios.get('http://88.200.63.148:8288/api/recipes');
        } else {
          response = await axios.get(`http://88.200.63.148:8288/api/recipes/category/${currentCategory}`);
        }
      }

      setRecipes(response.data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  }, [selectedTab, currentCategory]);

  useEffect(() => {
    // Update the currentCategory state if the URL changes (when navigating from Home)
    if (categoryParam) {
      setCurrentCategory(categoryParam);
    }
  }, [categoryParam]);

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  const handleCategorySelect = (category) => {
    setCurrentCategory(category);
    if (category === 'all') {
      navigate('/recipes');
    } else {
      navigate(`/recipes/category/${category}`);
    }
  };

  const handleAddRecipe = () => {
    navigate('/add-recipe');
  };

  return (
    <div className="recipe-list">
      <div className="tabs">
        <button className={selectedTab === 'saved' ? 'active' : ''} onClick={() => setSelectedTab('saved')}>Saved Recipes</button>
        <button className={selectedTab === 'all' ? 'active' : ''} onClick={() => setSelectedTab('all')}>All Recipes</button>
        <button className={selectedTab === 'my' ? 'active' : ''} onClick={() => setSelectedTab('my')}>My Recipes</button>
      </div>
      <div className="recipe-header">
        <div className="recipe-actions">
          <select className="category-select" value={currentCategory} onChange={(e) => handleCategorySelect(e.target.value)}>
            <option value="all">All</option>
            <option value="Salads">Salads</option>
            <option value="Vegetarian Dishes">Vegetarian Dishes</option>
            <option value="Low-Sugar Snacks">Low-Sugar Snacks</option>
            <option value="Sugar-Free Desserts">Sugar-Free Desserts</option>
            <option value="Healthy Beverages">Healthy Beverages</option>
            <option value="Low-Sugar Desserts">Low-Sugar Desserts</option>
            <option value="Sugar-Free Snacks">Sugar-Free Snacks</option>
            <option value="Non-Vegetarian Food">Non-Vegetarian Food</option>
          </select>
          {isLoggedIn && (
            <button className="add-recipe-button" onClick={handleAddRecipe}>+ Add Recipe</button>
          )}
        </div>
      </div>

      <div className="recipes-container">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <RecipeCard key={recipe.recipe_id} recipe={recipe} fetchRecipes={fetchRecipes} />
          ))
        ) : (
          <p>No recipes found.</p>
        )}
      </div>
    </div>
  );
};

export default RecipeList;