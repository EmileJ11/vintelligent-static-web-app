import React from 'react';
import { useLocation } from 'react-router-dom';
import WineCard from './WineCard';

const WineRecommendations = () => {
  const location = useLocation();
  const { recommendations, profileId } = location.state || {};

  // Hardcoded recommendations based on user profile ID
  const getHardcodedRecommendations = (profileId) => {
    if (profileId === '2') { // Martin Butler -> menu 1
      return [
        { name: "Rupert & Rothschild 'Classique' 2019/20", match: 60.6, rating: 4.7, region: 'South Africa', image: 'wine_bottle.png' },
        { name: 'Bodegas Bardos Ribera del Duero Crianza', match: 39.4, rating: 4.3, region: '/', image: 'wine_bottle.png' }
      ];
    } else if (profileId === '1') { // Robbe Mannens -> menu 3
      return [
        { name: 'Château de la Cour d’Argent 2014', match: 40.1, rating: 4.9, region: 'Bordeaux Supérieur', image: 'wine_bottle.png' },
        { name: "Bodegas Ontañón 'Canderuela' Rioja Crianza 2019", match: 40.1, rating: 4.2, region: '/', image: 'wine_bottle.png' },
        { name: 'Cuvée de Richard Rouge 2021/22', match: 27.0, rating: 4.6, region: 'France', image: 'wine_bottle.png' }
      ];
    } else if (profileId === '3') { // Emile Peeters -> menu 2
      return [
        { name: "St Cosme 'Micro Cosme' Sauvignon-Viognier 2019/20", match: 58.2, rating: 4.9, region: 'France', image: 'wine_bottle.png' },
        { name: "Paolo Leo 'Renèe Bianco Organic' 2020/21", match: 41.8, rating: 4.7, region: 'Puglia', image: 'wine_bottle.png' }
      ];
    } else {
      // Default hardcoded recommendations if no profile ID matches
      return [
        { name: 'Chateau Margaux', match: 95, rating: 4.8, region: 'Bordeaux', image: 'wine_bottle.png' },
        { name: 'Silver Oak Cabernet Sauvignon', match: 90, rating: 4.7, region: 'Napa Valley', image: 'wine_bottle.png' }
      ];
    }
  };

  // Using hardcoded recommendations if profileId is present, otherwise parse recommendations
  console.log('profileId:', profileId);
  const recommendedWines = getHardcodedRecommendations(profileId);

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
// import React from 'react';
// import { useLocation } from 'react-router-dom';
// import WineCard from './WineCard';

// const WineRecommendations = () => {
//   const location = useLocation();
//   const { recommendations } = location.state || {};

//   // Function to parse recommendations when passed as an object
//   const parseRecommendations = (recommendations) => {
//     if (!recommendations || typeof recommendations !== 'object') return [];

//     // Convert recommendations object to an array of wine objects
//     return Object.entries(recommendations)
//       .map(([nameAndRegion, matchPercentage]) => {
//         const [name, region] = nameAndRegion.split(',').map(part => part.trim());

//         return {
//           name: name || 'Unknown Wine',
//           region: region || 'Unknown Region',
//           match: parseFloat(matchPercentage).toFixed(2), // Use the provided match percentage
//           rating: (Math.random() * 1.5 + 3.5).toFixed(1), // Random rating between 3.5-5.0
//           image: '/wine_bottle.png', // Placeholder image path
//         };
//       })
//       .sort((a, b) => b.match - a.match); // Sort by match percentage in descending order
//   };

//   // Use either the parsed recommendations or default data
//   const recommendedWines = recommendations
//     ? parseRecommendations(recommendations)
//     : [
//         { name: 'Chateau Margaux', match: 95, rating: 4.8, region: 'Bordeaux', image: '/wine1.jpg' },
//         { name: 'Silver Oak Cabernet Sauvignon', match: 90, rating: 4.7, region: 'Napa Valley', image: '/wine2.jpg' },
//       ];

//   return (
//     <div className="pt-20 p-8 pb-20">
//       <h2 className="text-4xl font-bold text-center text-gold mb-6">Recommended Wines</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         {recommendedWines.map((wine, index) => (
//           <WineCard key={index} wine={wine} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default WineRecommendations;
