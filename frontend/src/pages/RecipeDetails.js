import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './RecipeDetails.css';

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://88.200.63.148:8288/api/recipes/${id}`);
        setRecipe(response.data);
      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    };

    fetchRecipe();
  }, [id]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div className="recipe-details">
      <img src={`data:image/jpeg;base64,${Buffer.from(recipe.image.data).toString('base64')}`} alt={recipe.title} />
      <div className="recipe-info">
        <h2>{recipe.title}</h2>
        <h3>Products</h3>
        <ul className='products-txt'>
          {recipe.products && recipe.products.map((product) => (
            <li key={product.product_id}>
              <strong>{product.name}</strong> - {product.quantity}
              <br />
              <em>{product.description}</em>
              <br />
              Price: {product.price}, Brand: {product.brand}, Shop: {product.shop}
            </li>
          ))}
        </ul>
        <h3>Instructions</h3>
        <p className='instructions-txt'>{recipe.instructions}</p>
        
      </div>
    </div>
  );
};

export default RecipeDetails;