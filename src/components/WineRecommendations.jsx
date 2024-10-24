import React from 'react';
import { useLocation } from 'react-router-dom';
import WineCard from './WineCard';

const WineRecommendations = () => {
  const location = useLocation();
  const { recommendations } = location.state || {};

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

  // Use either the parsed recommendations or default data
  const recommendedWines = recommendations
    ? parseRecommendations(recommendations)
    : [
        { name: 'Chateau Margaux', match: 95, rating: 4.8, region: 'Bordeaux', image: '/wine1.jpg' },
        { name: 'Silver Oak Cabernet Sauvignon', match: 90, rating: 4.7, region: 'Napa Valley', image: '/wine2.jpg' },
      ];

  return (
    <div className="pt-20 p-8 pb-20">
      <h2 className="text-4xl font-bold text-center text-gold mb-6">Recommended Wines</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {recommendedWines.map((wine, index) => (
          <WineCard key={index} wine={wine} />
        ))}
      </div>
    </div>
  );
};

export default WineRecommendations;
