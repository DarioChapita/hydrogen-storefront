// app/components/FavoriteButton.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FavoriteButton = ({ productId }) => {
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    // Check if the product is already favorited
    const checkFavoriteStatus = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/favorites`);
        const favorites = response.data;
        setIsFavorited(favorites.includes(productId));
      } catch (error) {
        console.error('Error checking favorite status:', error);
      }
    };

    checkFavoriteStatus();
  }, [productId]);

  const handleFavoriteClick = async () => {
    try {
      if (isFavorited) {
        await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/favorite`, { data: { productId } });
        setIsFavorited(false);
      } else {
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/favorite`, { productId });
        setIsFavorited(true);
      }
    } catch (error) {
      console.error('Error updating favorite status:', error);
    }
  };

  return (
    <button onClick={handleFavoriteClick}>
      {isFavorited ? 'Unfavorite' : 'Favorite'}
    </button>
  );
};

export default FavoriteButton;
