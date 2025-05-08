import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import RecipeCard from '../components/RecipeCard';
import './SearchResults.css';

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchSearchResults = async () => {
      const queryParams = new URLSearchParams(location.search);
      const query = queryParams.get('query');

      if (query) {
        try {
          const response = await axios.get(`http://88.200.63.148:8288/api/recipes/search?query=${query}`);
          setResults(response.data);
        } catch (error) {
          console.error('Error fetching search results:', error);
        }
      }
    };

    fetchSearchResults();
  }, [location.search]);

  return (
    
    <div className="search-results">
      {results.length > 0 ? (
        <div className="search-results-container">
          {results.map(recipe => (
            <RecipeCard key={recipe.recipe_id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <p>No results found for your search.</p>
      )}
    </div>
  );
};

export default SearchResults;