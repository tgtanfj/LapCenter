import React from "react";
import { useNavigate } from 'react-router-dom'

const ProductCard = ({ item }) => {
    const navigate = useNavigate()
    return (
        <div className="w-[200px] h-[350px] p-[10px] bg-[#fff]
                        rounded-lg shadow-lg shadow-gray-500/40 ...">
            <img
            className="w-[200px] h-[140px] transition ease-in-out delay-150 hover:-translate-y-2 hover:scale-110 duration-300 ..."
            src="https://fptshop.com.vn/Uploads/images/2015/0511/Lenovo-IdeaPad-Gaming-3-fpt-1.jpg" alt="" />
            <div>
                <p className="font-medium text-xl">{item.productName}</p>
                <p className="flex mt-1">Hãng: <p className="ml-1 font-medium text-[16px] flex">{item.productBrand}</p></p>
                <p className="flex mt-1">Chip: <p className="ml-1 font-medium text-[16px] flex">{item.chip}</p></p>
                <p className="flex mt-1">Giá: <p className="ml-1 font-medium text-[16px] flex text-red-400">{item.price}</p></p>
                <div>
                    <div
                    onClick={() => navigate('/product/1')}
                    className="w-[160px] bg-zinc-900 rounded-xl my-2 m-auto text-[#fff]
                                hover:bg-[#fff] hover:text-zinc-900
                                transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 ...">
                        <p className="text-center font-medium  cursor-pointer">Xem sản phẩm</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductCard