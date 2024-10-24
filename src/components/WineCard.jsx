import React from 'react';

const WineCard = ({ wine }) => {
  return (
    <div className="p-6 bg-white shadow-lg rounded-lg flex items-center transition-all duration-300 hover:scale-105">
      <img src={wine.image} className="w-16 h-16 rounded-full object-cover" alt={wine.name} />
      <div className="ml-6">
        <h3 className="text-2xl font-bold text-gray-800">{wine.name}</h3>
        <p className="text-sm text-gray-500">{wine.region}</p>
        <div className="flex items-center mt-2">
          <span className="text-wine-red font-semibold">{wine.match}% Match</span>
          <span className="text-gray-400 ml-4">Rating: {wine.rating}</span>
        </div>
      </div>
    </div>
  );
};

export default WineCard;