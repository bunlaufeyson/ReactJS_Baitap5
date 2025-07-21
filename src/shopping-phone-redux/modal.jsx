import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateQuantity, deleteCart } from "./../store/shoppingPhoneReducer";

export default function Modal(props) {
  const dispatch = useDispatch();

  const { handleDeleteCart } = props;
  // Lấy state từ redux store
  const carts = useSelector((state) => state.shoppingPhone.carts);

  return (
    <div>
      {/* Modal toggle */}
      <button
        data-modal-target="default-modal"
        data-modal-toggle="default-modal"
        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        Open Cart
      </button>
      {/* Main modal */}
      <div
        id="default-modal"
        tabIndex={-1}
        aria-hidden="true"
        className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Product name
                </th>
                <th scope="col" className="px-6 py-3">
                  Image
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Quantity
                </th>
                <th scope="col" className="px-6 py-3">
                  Total
                </th>
                <th scope="col" className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {carts.map((item) => {
                return (
                  <tr
                    key={item.maSP}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item.tenSP}
                    </th>
                    <td className="px-6 py-4">
                      <img className="size-20" src={item.hinhAnh} alt="..." />
                    </td>
                    <td className="px-6 py-4">{item.giaBan}</td>
                    <td className="px-6 py-4 space-x-2">
                      <button
                        disabled={item.soLuong === 1}
                        className="px-2 py-1 rounded-md border border-black text-black disabled:bg-gray-300"
                        onClick={() => {
                          dispatch(
                            updateQuantity({ maSP: item.maSP, quantity: -1 })
                          );
                        }}
                      >
                        -
                      </button>
                      <span>{item.soLuong}</span>
                      <button
                        className="px-2 py-1 rounded-md border border-black text-black"
                        onClick={() => {
                          dispatch(
                            updateQuantity({ maSP: item.maSP, quantity: 1 })
                          );
                        }}
                      >
                        +
                      </button>
                    </td>
                    <td className="px-6 py-4">{item.giaBan * item.soLuong}</td>
                    <td className="px-6 py-4 font-bold text-red-500 cursor-pointer">
                      <button
                        onClick={() => {
                          dispatch(deleteCart(item.maSP));
                        }}
                      >
                        X
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
