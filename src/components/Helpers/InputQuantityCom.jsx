import { useState } from "react";
import { useCartContext } from "../../data/cart_context";

export default function InputQuantityCom({ quantitys, id, wishItem }) {
  const { toggleAmount, toggleAmountWish } = useCartContext()
  const [quantity, setQuantity] = useState(quantitys);
  const increment = () => {
    setQuantity((prev) => prev + 1);
    toggleAmount(id, 'inc');

  };
  const decrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
      toggleAmount(id, 'dec');
    }
  };
  return (
    <div className="w-[120px] h-[40px] px-[26px] flex items-center border border-qgray-border">
      <div className="flex justify-between items-center w-full">
        <button
          onClick={decrement}
          type="button"
          className="text-base text-qgray"
        >
          -
        </button>
        <span className="text-qblack">{quantity}</span>
        <button
          onClick={increment}
          type="button"
          className="text-base text-qgray"
        >
          +
        </button>
      </div>
    </div>
  );
}
