import React from "react";
import { Item } from "../../types/types";
import "./ItemCard.css";
import itemImage from "@/assets/itemImage.jpg";

interface ItemCardProps {
  item: Item;
  addToCart: (item: Item) => void;
  index: number; // Ürünlerin index'ini alıyoruz
}

const ItemCard: React.FC<ItemCardProps> = ({ item, addToCart, index }) => {
  // Eğer index 8'den büyükse, hiçbir şey render etme
  if (index >= 8) {
    return null;
  }

  return (
    <div className="item-card">
      <img
        src={item.image || itemImage}
        alt={item.item_name}
        className="item-image"
      />
      <h4>{item.item_name}</h4>
      <p>Ürün Kodu: {item.item_code}</p>
      <button className="add-to-cart-btn" onClick={() => addToCart(item)}>
        Sepete Ekle
      </button>
    </div>
  );
};

export default ItemCard;
