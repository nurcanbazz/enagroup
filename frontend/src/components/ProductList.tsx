import React from "react";
import { Item } from "../types/types";
import ItemCard from "./ui/ItemCard";

interface ProductListProps {
  items: Item[];
  addToCart: (item: Item) => void;
}

const ProductList: React.FC<ProductListProps> = ({ items, addToCart }) => {
  return (
    <div className="product-list">
      {items.map((item, index) => (
        <ItemCard
          key={item.item_code}
          item={item}
          addToCart={addToCart}
          index={index} // index'i buradan geçiriyoruz
        />
      ))}
    </div>
  );
};

export default ProductList;
