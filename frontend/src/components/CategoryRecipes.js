import React from 'react';
import { useParams } from 'react-router-dom';
import RecipeList from '../pages/RecipeList';

const CategoryRecipes = () => {
  const { category } = useParams();
  return (
    <div>
      <RecipeList category={category} />
    </div>
  );
};

export default CategoryRecipes;