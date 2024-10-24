import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Function to parse the recommendations string into an array of objects 
const parseRecommendations = (recommendations) => {
  if (!recommendations) return [];

  return recommendations.split('\n').map((wine) => {
    const parts = wine.includes(',') ? wine.split(',') : wine.split('.');
    return {
      name: parts[0]?.trim() || 'Unknown Wine',
      region: parts[1]?.trim() || 'Unknown Region',
      match: Math.floor(Math.random() * 21) + 80, // Random match score between 80-100
      rating: (Math.random() * 1.5 + 3.5).toFixed(1), // Random rating between 3.5-5.0
      image: '/wine_bottle.png', // Placeholder image path
    };
  });
};

const Profile = () => {
  const navigate = useNavigate();
  const [favoriteWines, setFavoriteWines] = useState([]);
  const [error, setError] = useState(null);
  const [profileId, setProfileId] = useState(null);

  useEffect(() => {
    const profileIdFromStorage = localStorage.getItem('ProfileID');
    if (!profileIdFromStorage) {
      // Redirect to login if no ProfileID is found
      navigate('/login', { state: { message: 'Please login first' } });
      return;
    }
    setProfileId(profileIdFromStorage);
  }, [navigate]);

  useEffect(() => {
    if (!profileId) return;

    const fetchFavoriteWines = async () => {
      try {
        const response = await axios.get(`http://localhost:7071/api/getFavoriteWines?profileId=${profileId}`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setFavoriteWines(response.data.favoriteWines);
      } catch (err) {
        setError('Failed to fetch favorite wines. Please try again later.');
      }
    };

    fetchFavoriteWines();
  }, [profileId]);

  return (
    <div className="pt-20 p-8 pb-20">
      <h2 className="text-4xl font-bold text-center text-gold mb-6">Welcome Back!</h2>

      <div className="mb-10">
        <h3 className="text-3xl font-semibold text-gold mb-4">Your Favorite Wines</h3>
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {favoriteWines.map((wine, index) => (
              <div key={index} className="p-6 bg-white rounded-xl shadow-md flex items-center transition-all duration-300 hover:scale-105">
                <img src='/wine_bottle.png' alt={wine.Title} className="w-20 h-20 rounded-full object-cover" />
                <div className="ml-6">
                  <h3 className="text-2xl font-bold text-gray-800">{wine.Title}</h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Link to="/scanner">
        <button className="px-6 py-3 bg-wine-red text-white rounded-lg shadow-md hover:bg-red-700 w-full transition-all duration-300">
          Scan a Wine List
        </button>
      </Link>
    </div>
  );
};

export default Profile;
