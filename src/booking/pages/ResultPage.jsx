import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ResultPage = () => {
  const { danhSachGhe } = useSelector(state => state.seat);
  const navigate = useNavigate();

  const gheDaDat = danhSachGhe
    .flatMap(hang => hang.danhSachGhe)
    .filter(ghe => ghe.daDat);

  const total = gheDaDat.reduce((sum, ghe) => sum + ghe.gia, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white py-10 px-5">
      <h2 className="text-2xl text-center font-semibold text-yellow-400 mb-4">Vé đã đặt thành công</h2>
      <div className="max-w-2xl mx-auto bg-gray-800 p-6 rounded-lg">
        <table className="w-full text-left mb-4">
          <thead>
            <tr className="text-yellow-300">
              <th className="pb-2">Số ghế</th>
              <th className="pb-2">Giá</th>
            </tr>
          </thead>
          <tbody>
            {gheDaDat.map((ghe) => (
              <tr key={ghe.soGhe} className="border-t border-gray-600">
                <td className="py-1">{ghe.soGhe}</td>
                <td className="py-1">{ghe.gia.toLocaleString()} VNĐ</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="font-bold text-yellow-300 mb-4">Tổng tiền: {total.toLocaleString()} VNĐ</p>
        <button onClick={() => navigate('/')} className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded w-full">
          Đặt lại
        </button>
      </div>
    </div>
  );
};

export default ResultPage;
