import React from 'react';
import { useGlobalContext } from '../../../data/context';
export default function ProductCardRowStyleTwo({ className, datas }) {

  const { country, nairavalue } = useGlobalContext();

  return (
    <div
      data-aos="fade-up"
      className={`product-card-row-two w-full  ${className || ""}`}
    >
      <div className="w-full h-[105px] bg-white border border-primarygray px-5 ">
        <div className="w-full h-full flex space-x-5 justify-center items-center">
          <div className="w-[75px] h-full">
            <img
              src={datas.url}
              alt=""
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex-1 h-full flex flex-col justify-center ">
            <a href={`/single-product/${datas.id}`}>
              <p className="title mb-2 sm:text-[15px] text-[13px] font-600 text-qblack leading-[24px] line-clamp-1 hover:text-blue-600">
                {datas.title}
              </p>
            </a>

            <p className="price">
              <span className="main-price text-qgray line-through font-600 text-[18px]">
                {country === "Nigeria" ? "₦" : "$"}{country === "Nigeria" ? (datas.price * nairavalue).toFixed(2) : (datas.price).toFixed(2)}
              </span>
              <span className="offer-price text-qred font-600 text-[18px] ml-2">
                {country === "Nigeria" ? "₦" : "$"}{country === "Nigeria" ? (datas.offer_price * nairavalue).toFixed(2) : (datas.offer_price).toFixed(2)}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
