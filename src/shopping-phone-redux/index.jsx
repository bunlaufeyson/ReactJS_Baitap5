import Phone from "./phone";
import TechDetail from "./tech-detail";
import Modal from "./modal";

// useSelector giúp lấy state từ redux store
import { useSelector } from "react-redux";

export default function ShoppingPhone() {
  // Lấy state từ redux store
  const listProduct = useSelector((state) => state.shoppingPhone.listProduct);

  const renderListProduct = () => {
    return listProduct.map((product) => {
      return <Phone key={product.maSP} product={product} />;
    });
  };

  return (
    <div className="container mx-auto">
      <Modal />
      <h1 className="text-5xl text-center mb-5">Shopping Phone</h1>
      <div className="grid grid-cols-3 gap-5">{renderListProduct()}</div>
      <TechDetail />
    </div>
  );
}
