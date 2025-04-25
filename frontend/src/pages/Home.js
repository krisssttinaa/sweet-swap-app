import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css';

const Home = () => {
  const [newRecipes, setNewRecipes] = useState([]);

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
          <div className="category">
            <img src="/images/salad.jpg" alt="Salads" />
            <p>Salads</p>
          </div>
          <div className="category">
            <img src="/images/vegetarian.jpg" alt="Vegetarian Dishes" />
            <p>Vegetarian Dishes</p>
          </div>
          <div className="category">
            <img src="/images/snacks.jpg" alt="Low-Sugar Snacks" />
            <p>Low-Sugar Snacks</p>
          </div>
          <div className="category">
            <img src="/images/sugar-free-desserts.jpg" alt="Sugar-Free Desserts" />
            <p>Sugar-Free Desserts</p>
          </div>
          <div className="category">
            <img src="/images/beverages.jpg" alt="Healthy Beverages" />
            <p>Healthy Beverages</p>
          </div>
          <div className="category">
            <img src="/images/low-sugar-desserts.jpg" alt="Low-Sugar Desserts" />
            <p>Low-Sugar Desserts</p>
          </div>
        </div>
      </section>
      <section className="home-new-recipes">
        <h2>New recipes</h2>
        <div className="new-recipes-list">
          {newRecipes.length > 0 ? (
            newRecipes.map((recipe) => (
              <div className="recipe-card" key={recipe.recipe_id}>
                <img src={`data:image/jpeg;base64,${Buffer.from(recipe.image.data).toString('base64')}`} alt={recipe.title} />
                <h3>{recipe.title}</h3>
                <p>Place here some short description of a lovely offer.</p>
                <a href="#">Recipe</a>
              </div>
            ))
          ) : (
            <p>No recipes found.</p>
          )}
        </div>
       
      </section>
      <footer className="home-footer">
        <div className="social-links">
          {/*
          <a href="#"><i className="fab fa-facebook-f"></i></a>
          <a href="#"><i className="fab fa-twitter"></i></a>
          <a href="#"><i className="fab fa-google-plus-g"></i></a> */}
        </div>
        <p>© 2021 Sweet Swap</p>
      </footer>
    </div>
  );
};

export default Home;