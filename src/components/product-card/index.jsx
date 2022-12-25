import React from "react";
import { useState } from "react";
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react';

const ProductCard = ({ item }) => {

    useEffect(() => {
        // fetchAPI()
        fetchAPIAxios()
    }, [])

    const [data, setData] = useState()

    const fetchAPIAxios = () => {
        axios.get('https://lapcenter-v1.onrender.com/api/product')
            .then(function (response) {
                // handle success
                console.log('axios response: ', response);
                setData(response.data.products)

            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
    }

    const navigate = useNavigate()
    return (
        <div className="w-[200px] h-[350px] p-[10px] bg-[#fff]
                        rounded-lg shadow-lg shadow-gray-500/40 ...">
            <img
                className="w-[200px] h-[140px] transition ease-in-out delay-150 hover:-translate-y-2 hover:scale-110 duration-300 ..."
                src={item?.images?.length && item?.images[0]} alt="" />
            <div>
                <p className="font-medium text-xl truncate">{item.name}</p>
                <p className="flex mt-1">Hãng: <p className="ml-1 font-medium text-[16px] flex truncate">{item.brand}</p></p>
                <p className="flex mt-1">Chip: <p className="ml-1 font-medium text-[16px] flex truncate">{item.cpu}</p></p>
                <p className="flex mt-1">Giá: <p className="ml-1 font-medium text-[16px] flex text-red-400">{item.price}</p></p>
                <div>
                    <div
                        onClick={() => navigate(`/product/${item?._id}`, {state: {id: item._id}})}
                        className="w-[160px] bg-zinc-900 rounded-xl my-2 m-auto text-[#fff]
                                hover:bg-[#fff] hover:text-zinc-900
                                transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 ...">
                        <p className="text-center font-medium h-[30px] cursor-pointer">Xem sản phẩm</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductCard