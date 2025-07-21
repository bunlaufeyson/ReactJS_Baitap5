import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SeatList from '../components/SeatList';
import SelectedSeatList from '../components/SelectedSeatList';
import { chonGhe, huyGhe, datVe, resetGhe } from '../redux/actions/seatActions';
import { useNavigate } from 'react-router-dom';

const BookingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { danhSachGhe, gheDangChon } = useSelector(state => state.seat);
  const [userInfo, setUserInfo] = useState({ name: '', quantity: '' });
  const [allowSelecting, setAllowSelecting] = useState(false);
  const [bookingHistory, setBookingHistory] = useState([]);

  useEffect(() => {
    dispatch(resetGhe(['A11', 'A12']));
    setBookingHistory([]); // reset mỗi lần reload
  }, [dispatch]);

  const handleSelect = (ghe) => {
    if (!allowSelecting) {
      alert('Vui lòng nhập tên và số ghế trước khi chọn.');
      return;
    }
    if (gheDangChon.length < parseInt(userInfo.quantity)) {
      dispatch(chonGhe(ghe));
    } else {
      alert('Không được chọn quá số lượng ghế đã nhập.');
    }
  };

  const handleRemove = (ghe) => {
    dispatch(huyGhe(ghe));
  };

  const handleBooking = () => {
    if (userInfo.name.trim() && userInfo.quantity > 0 && gheDangChon.length > 0) {
      const data = {
        name: userInfo.name.trim(),
        seats: gheDangChon.map(g => g.soGhe),
        quantity: gheDangChon.length,
      };
      const newHistory = [data];
      setBookingHistory(newHistory);
      dispatch(datVe());
      navigate('/result');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-6 uppercase text-yellow-500">Đặt vé xem phim cyberlearn.vn</h1>

      {/* FORM INPUT */}
      <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded-xl shadow-lg mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-semibold mb-1">Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded bg-gray-900 text-white border border-gray-600"
              placeholder="Nhập tên của bạn"
              value={userInfo.name}
              onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Number of Seats <span className="text-red-500">*</span></label>
            <input
              type="number"
              className="w-full px-4 py-2 rounded bg-gray-900 text-white border border-gray-600"
              placeholder="VD: 3"
              min="1"
              value={userInfo.quantity}
              onChange={(e) => setUserInfo({ ...userInfo, quantity: e.target.value })}
            />
          </div>
        </div>
        <button
          className="mt-4 px-6 py-2 bg-white text-black rounded font-bold hover:bg-yellow-400"
          onClick={() => {
            if (userInfo.name.trim() && userInfo.quantity > 0) setAllowSelecting(true);
            else alert('Vui lòng nhập tên và số ghế muốn đặt.');
          }}
        >
          Start Selecting
        </button>

        <div className="mt-6 flex items-center gap-4">
          <div className="w-5 h-5 bg-green-600 border"></div><span>Selected Seat</span>
          <div className="w-5 h-5 bg-red-600 border"></div><span>Reserved Seat</span>
          <div className="w-5 h-5 bg-white border"></div><span>Empty Seat</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="lg:col-span-2">
          <div className="grid grid-cols-[60px_repeat(12,_minmax(40px,_1fr))] gap-2 mb-4">
            <div></div>
            {[...Array(12)].map((_, i) => (
              <div key={i} className="text-center font-bold text-yellow-300">{i + 1}</div>
            ))}
          </div>
          <SeatList danhSachGhe={danhSachGhe} gheDangChon={gheDangChon} onSelect={handleSelect} />
          <div className="mt-6 w-full text-center bg-yellow-500 text-black font-semibold py-2 uppercase tracking-wide">Screen this way</div>
        </div>

        <div className="bg-gray-800 p-4 rounded-xl shadow-xl">
          <SelectedSeatList gheDangChon={gheDangChon} onRemove={handleRemove} />
          {gheDangChon.length > 0 && (
            <button
              onClick={handleBooking}
              className="w-full mt-4 bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded"
            >
              Đặt vé
            </button>
          )}

          {/* Lịch sử đặt vé */}
          {bookingHistory.length > 0 && (
            <div className="mt-6">
              <h3 className="font-bold text-lg text-yellow-400 mb-2">Lịch sử đặt vé:</h3>
              <ul className="text-sm space-y-1">
                {bookingHistory.map((item, idx) => (
                  <li key={idx} className="border-b border-gray-600 pb-1">
                    {item.name} – {item.seats.join(', ')} ({item.quantity} vé)
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingPage;