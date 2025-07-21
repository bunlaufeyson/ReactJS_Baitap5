
import React from 'react';

const Seat = ({ ghe, isSelected, onSelect }) => {
  const handleClick = () => {
    if (!ghe.daDat) onSelect(ghe);
  };

  let className = "w-10 h-10 rounded flex items-center justify-center font-bold";

  if (ghe.daDat) className += " bg-orange-500 text-white cursor-not-allowed";
  else if (isSelected) className += " bg-green-500 text-white";
  else className += " bg-white text-black hover:bg-yellow-200 cursor-pointer";

  return (
    <button className={className} onClick={handleClick} disabled={ghe.daDat}>
      {ghe.soGhe.replace(/^\D/, '')}
    </button>
  );
};

export default Seat;
