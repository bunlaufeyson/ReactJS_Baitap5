import { useState } from 'react'
import Phone from './phone'
import TechDetail from './tech-detail'
import data from './data.json'
import Modal from './modal'

export default function ShoppingPhone() {
    const [listProduct, setListProduct] = useState(data)
    const [productDetail, setProductDetail] = useState(listProduct[0])

    const [carts, setCarts] = useState([])

    const handleAddCart = (phone) => {
        // spread operator
        const newCarts = [...carts]

        // Kiểm tra sp đã tồn tại trong carts hay chưa
        const index = newCarts.findIndex((item) => item.maSP === phone.maSP)

        if (index === -1) {
            // sp đang muốn thêm vào carts chưa tồn tại trong carts

            // Thêm sản phẩm vào carts với số lượng là 1
            // key: soLuong dùng để quản lý số lượng của sản phẩm trong giỏ hàng

            // const newPhone = { ...phone, soLuong: 1 }
            // newCarts.push(newPhone)

            setCarts([...newCarts, { ...phone, soLuong: 1 }])
            return
        }

        // Thay đổi số lượng sản phẩm hiện có trong carts
        newCarts[index].soLuong += 1
        // Set carts với giá trị new carts
        setCarts(newCarts)
    }

    // maSP: dùng để xác định sản phẩm đang cần thay đổi số lượng
    // quantity: 1 (btn +) hoặc -1 (btn -) : dùng để xđ số lượng cần thay đổi
    const handleCartQuantity = (maSP, quantity) => {
        // C1:
        // const newCarts = [...carts]

        // // Tìm sản phầm đang cần thay đổi số lượng
        // const index = newCarts.findIndex((item) => item.maSP === maSP)

        // if (index !== -1) {
        //     newCarts[index].soLuong += quantity
        // }

        // setCarts(newCarts)

        // C2:
        setCarts(
            carts.map((item) => {
                if (item.maSP !== maSP) return item
                return {
                    ...item,
                    soLuong: item.soLuong + quantity,
                }
            })
        )
    }

    // maSP: dùng để xác định sp cần xóa
    const handleDeleteCart = (maSP) => {
        // C1:
        // const newCarts = [...carts]
        // // tìm index sp cần xóa
        // const index = newCarts.findIndex((item) => item.maSP === maSP)

        // if (index !== -1) {
        //     // xóa sp khỏi carts
        //     newCarts.splice(index, 1)
        //     setCarts(newCarts)
        // }

        // C2:
        setCarts(carts.filter((item) => item.maSP !== maSP))
    }

    // const demo = [{ age: 10 }, { age: 20 }]
    // demo[0].age += 2

    const renderListProduct = () => {
        return listProduct.map((product) => {
            return (
                <Phone
                    key={product.maSP}
                    product={product}
                    getProduct={handleGetProduct}
                    handleAddCart={handleAddCart}
                />
            )
        })
    }

    const handleGetProduct = (product) => {
        setProductDetail(product)
    }

    return (
        <div className="container mx-auto">
            <Modal
                carts={carts}
                handleCartQuantity={handleCartQuantity}
                handleDeleteCart={handleDeleteCart}
            />
            <h1 className="text-5xl text-center mb-5">Shopping Phone</h1>
            <div className="grid grid-cols-3 gap-5">{renderListProduct()}</div>
            <TechDetail productDetail={productDetail} />
        </div>
    )
}
