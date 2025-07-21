import React from 'react';

const SelectedSeatList = ({ gheDangChon, onRemove }) => {
  const total = gheDangChon.reduce((sum, ghe) => sum + ghe.gia, 0);

  return (
    <div>
      <h3 className="text-xl font-semibold text-yellow-400 mb-3">Danh sách ghế bạn chọn</h3>
      <table className="w-full mb-3">
        <thead className="text-yellow-300">
          <tr>
            <th className="text-left pb-1">Số ghế</th>
            <th className="text-left pb-1">Giá</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {gheDangChon.map((ghe) => (
            <tr key={ghe.soGhe} className="border-t border-gray-600">
              <td className="py-1">{ghe.soGhe}</td>
              <td className="py-1">{ghe.gia.toLocaleString()} VNĐ</td>
              <td>
                <button
                  onClick={() => onRemove(ghe)}
                  className="text-red-500 font-bold hover:text-red-700"
                >
                  ❌
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-yellow-300 font-bold">Tổng tiền: {total.toLocaleString()} VNĐ</p>
    </div>
  );
};

export default SelectedSeatList;