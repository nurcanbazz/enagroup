import { useState, useEffect } from "react";
import { useFrappeGetDocList } from "frappe-react-sdk";
import CarouselComponent from "../components/ui/CarouselImage";
import "./HomePage.css";
import Header from "../components/ui/Header";
import Footer from "../components/ui/Footer";
import ItemCard from "../components/ui/ItemCard";
import { Item } from "../types/types";
import CardGroup from "../components/ui/CardGroup";

const HomePage = () => {
  const { data: itemData, isLoading, error } = useFrappeGetDocList("Item", {
    fields: ["item_code", "item_name", "custom_oem_kodu", "stock_uom", "custom_list_price", "image", "max_discount"],
  });

  const { data: binData, isLoading: isBinLoading, error: binError } = useFrappeGetDocList("Bin", {
    fields: ["item_code", "actual_qty"],
  });

  const [cart, setCart] = useState<Item[]>(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    if (itemData && binData) {
      const enrichedItemData = itemData
        .map((item: any) => {
          const bin = binData.find((b) => b.item_code === item.item_code);
          return {
            ...item,
            stock_qty: bin ? bin.actual_qty : 0,
            max_discount: item.max_discount || 0,
            price: item.custom_list_price,
            discount: 0,
            total: item.custom_list_price,
          };
        });

      setItems(enrichedItemData);
    }
  }, [itemData, binData]);

  const addToCart = (item: Item) => {
    const existingItemIndex = cart.findIndex((cartItem) => cartItem.item_code === item.item_code);

    let updatedCart;
    if (existingItemIndex !== -1) {
      updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += 1;
    } else {
      updatedCart = [...cart, { ...item, quantity: 1 }];
    }

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    alert(`${item.item_name} sepete eklendi!`);
  };

  return (
    <div className="home-page">
      <Header />
      <CarouselComponent />
      <CardGroup />

      <div className="item-cards">
        {isLoading || isBinLoading ? (
          <p>Yükleniyor...</p>
        ) : error || binError ? (
          <p>Hata: {error ? error.message : binError ? binError.message : "Bilinmeyen hata"}</p>
        ) : items.length === 0 ? (
          <p>Ürün bulunamadı.</p>
        ) : (
          items.slice(0, 8).map((item: Item, index: number) => (
            <ItemCard key={index} item={item} addToCart={addToCart} index={index} />
          ))
        )}
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
