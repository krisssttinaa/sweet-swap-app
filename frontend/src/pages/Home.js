import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [newRecipes, setNewRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNewRecipes = async () => {
      try {
        const response = await axios.get('http://88.200.63.148:8288/api/recipes/newest');
        setNewRecipes(response.data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchNewRecipes();
  }, []);

  const handleViewRecipe = (id) => {
    navigate(`/recipe/${id}`);
  };

  const handleCategoryClick = (category) => {
    navigate(`/recipes/category/${category}`);
  };

  return (
    <div className="home">
      <header className="home-header">
        <div className="hero-image">
          <div className="hero-text">
            <p>Explore the world of sugar-free food</p>
          </div>
        </div>
      </header>
      <section className="home-recipes">
        <div className="recipe-categories">
          <div className="category" onClick={() => handleCategoryClick('Salads')}>
            <img src="/images/salad.jpg" alt="Salads" />
            <p>Salads</p>
          </div>
          <div className="category" onClick={() => handleCategoryClick('Vegetarian Dishes')}>
            <img src="/images/vegetarian.jpg" alt="Vegetarian Dishes" />
            <p>Vegetarian Dishes</p>
          </div>
          <div className="category" onClick={() => handleCategoryClick('Low-Sugar Snacks')}>
            <img src="/images/snacks.jpg" alt="Low-Sugar Snacks" />
            <p>Low-Sugar Snacks</p>
          </div>
          <div className="category" onClick={() => handleCategoryClick('Sugar-Free Desserts')}>
            <img src="/images/sugar-free-desserts.jpg" alt="Sugar-Free Desserts" />
            <p>Sugar-Free Desserts</p>
          </div>
          <div className="category" onClick={() => handleCategoryClick('Healthy Beverages')}>
            <img src="/images/beverages.jpg" alt="Healthy Beverages" />
            <p>Healthy Beverages</p>
          </div>
          <div className="category" onClick={() => handleCategoryClick('Low-Sugar Desserts')}>
            <img src="/images/low-sugar-desserts.jpg" alt="Low-Sugar Desserts" />
            <p>Low-Sugar Desserts</p>
          </div>
          <div className="category" onClick={() => handleCategoryClick('Sugar-Free Snacks')}>
            <img src="/images/sugar-free-snacks.jpg" alt="Sugar-Free Snacks" />
            <p>Sugar-Free Snacks</p>
          </div>
          <div className="category" onClick={() => handleCategoryClick('Non-Vegetarian Food')}>
            <img src="/images/non-vegetarian.jpg" alt="Non-Vegetarian Food" />
            <p>Non-Vegetarian Food</p>
          </div>
        </div>
      </section>
      <section className="home-new-recipes">
        <h2>New recipes</h2>
        <div className="new-recipes-list">
          {newRecipes.length > 0 ? (
            newRecipes.map((recipe) => (
              <div className="recipe-card" key={recipe.recipe_id}>
                {recipe.image_filename && (
                  <img
                    src={`http://88.200.63.148:8288/uploads/${recipe.image_filename}`}
                    alt={recipe.title}
                  />
                )}
                <h3>{recipe.title}</h3>
                <button onClick={() => handleViewRecipe(recipe.recipe_id)}>Recipe</button>
              </div>
            ))
          ) : (
            <p>No recipes found.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;