import React from "react";
import { useState } from "react";
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react';

const BrandCard = ({ item }) => {

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
        <div
            onClick={() => navigate(`/product/${item?._id}`, { state: { id: item._id, brand: item.brand } })}
            className="w-[200px] h-[auto] p-[10px] bg-[#fff]
                        rounded-lg shadow-lg shadow-gray-500/40 ..."
            title={item.name}
        >
            <img
                onClick={() => navigate(`/product/${item?._id}`, { state: { id: item._id } })}
                className="w-[200px] h-[140px] transition ease-in-out delay-150 hover:-translate-y-2 hover:scale-110 duration-300 ..."
                src={item?.images?.length && item?.images[0]} alt="" />
            <div>
                <p className="font-medium text-xl truncate">{item.name}</p>
                <p className="flex mt-1">Chip: <p className="ml-1 font-medium text-[16px] flex truncate">{item.cpu}</p></p>
                <p className="flex mt-1">Giá: <p className="ml-1 font-medium text-[16px] flex text-red-400">{item.price}</p></p>

            </div>
        </div>
    )
}

export default BrandCard