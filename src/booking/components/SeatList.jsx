import React from 'react';
import Seat from './Seat';

const SeatList = ({ danhSachGhe, gheDangChon, onSelect }) => {
  return (
    <div className="space-y-1">
      {danhSachGhe.map((hang, index) => (
        <div
          key={index}
          className="grid grid-cols-[60px_repeat(12,_minmax(40px,_1fr))] gap-2 items-center"
        >
          {/* Cột hiển thị chữ cái A-K */}
          <div className="font-bold text-yellow-300 text-center">
            {hang.hang}
          </div>

          {/* Các ghế trong từng hàng */}
          {hang.danhSachGhe.map((ghe) => (
            <Seat
              key={ghe.soGhe}
              ghe={ghe}
              isSelected={gheDangChon.some((g) => g.soGhe === ghe.soGhe)}
              onSelect={onSelect}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default SeatList;
