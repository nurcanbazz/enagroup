import { useState, useEffect } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import "./ShoppingCart.css";
import { Item } from "../types/types";
import WarehouseCart from '../components/ui/WarehouseCart';
import Footer from '../components/ui/Footer';

function ShoppingCart() {
  const [cart, setCart] = useState<Item[]>([]);

  useEffect(() => {
    // Sepet verisini localStorage'dan alıyoruz
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
      console.log('Sepet ShoppingCart Bileşeninde Yüklendi:', savedCart);
    }
  }, []); // sayfa ilk yüklendiğinde çalışacak

  const removeFromCart = (index: number) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const increaseQuantity = (index: number) => {
    const newCart = [...cart];
    newCart[index].quantity += 1;
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const decreaseQuantity = (index: number) => {
    const newCart = [...cart];
    if (newCart[index].quantity > 1) {
      newCart[index].quantity -= 1;
      setCart(newCart);
      localStorage.setItem('cart', JSON.stringify(newCart));
    } else {
      removeFromCart(index);
    }
  };

  const handleSubmit = async () => {
    if (cart.length === 0) {
      alert("Sepet boş, sipariş oluşturamazsınız!");
      return;
    }
  
    const requestData = {
      customer: "78910",
      items: cart.map((item) => ({
        item_code: item.item_code,
        item_name: item.item_name,
        qty: item.quantity,
        rate: item.custom_list_price,
        discount_percentage: item.max_discount,
        uom: item.stock_uom,
      })),
    };
  
    try {
      const response = await fetch(
        "http://localhost:8001/api/method/scope.sales_order.siparis_olustur",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );
  
      const result = await response.json();
      console.log("Sipariş Sonucu:", result);
  
      if (response.ok) {
        alert("Sipariş başarıyla oluşturuldu!");
  
        // Onay bekleyen siparişler listesine ekle
        const savedOrders = localStorage.getItem("awaitingOrders");
        const awaitingOrders = savedOrders ? JSON.parse(savedOrders) : [];
  
        // Siparişleri onay bekleyen listeye ekle ve gönderim tarihi ekle (tarih, saat, dakika, saniye dahil)
        const updatedOrders = [
          ...awaitingOrders,
          ...cart.map((item) => ({
            ...item,
            gonderimTarihi: new Date().toLocaleString(), // Tam tarih ve saat ekle
          })),
        ];
  
        localStorage.setItem("awaitingOrders", JSON.stringify(updatedOrders));
  
        // Sepeti temizle
        setCart([]);
        localStorage.removeItem("cart");
      } else {
        alert("Sipariş oluşturulamadı: " + result.message);
      }
    } catch (error) {
      console.error("Hata:", error);
      alert("Bir hata oluştu.");
    }
  };

  return (
    <div className="container">
      <h1>Genel Sepet</h1>

      {/* Sepet Tablosu */}
      <table className="order-table">
        <thead>
          <tr>
            <th>Ürün Kodu</th>
            <th>Ürün Adı</th>
            <th>Birim</th>
            <th>Liste Fiyatı</th>
            <th>Miktar</th>
            <th>Depo</th>
            <th>Tutar</th>
            <th>İskonto</th>
            <th>Net Fiyat</th>
            <th>Net Fiyat+KDV</th>
            <th>Firma Kodu</th>
            <th>İşlem</th>
            <th>Tarih</th>
          </tr>
        </thead>
        <tbody>
          {cart.length === 0 ? (
            <tr>
              <td colSpan={13}>Sepetiniz boş</td>
            </tr>
          ) : (
            cart.map((item: Item, index: number) => {
              const discountAmount = (item.custom_list_price * item.max_discount) / 100;
              const discountedPrice = item.custom_list_price - discountAmount;
              const netPrice = discountedPrice * item.quantity;
              const netPriceWithVAT = netPrice * 1.20; // KDV dahil

              return (
                <tr key={index}>
                  <td>{item.item_code}</td>
                  <td>{item.item_name}</td>
                  <td>{item.stock_uom}</td>
                  <td>{item.custom_list_price} ₺</td>
                  <td>
                    <button onClick={() => increaseQuantity(index)}>+</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => decreaseQuantity(index)}>-</button>
                  </td>
                  <td>
                    {item.stock_qty > 5 ? (
                      <FaCheck color="green" />
                    ) : item.stock_qty > 0 ? (
                      <span>{item.stock_qty}</span>
                    ) : (
                      <FaTimes color="red" />
                    )}
                  </td>
                  <td>{(item.custom_list_price * item.quantity).toFixed(2)} ₺</td>
                  <td>{item.max_discount}%</td>
                  <td>{netPrice.toFixed(2)} ₺</td>
                  <td>{netPriceWithVAT.toFixed(2)} ₺</td>
                  <td>120-24-00919</td>
                  <td>
                    <button className="edit-button">✎</button>
                    <button className="delete-button" onClick={() => removeFromCart(index)}>
                      ✖
                    </button>
                  </td>
                  <td>{new Date().toLocaleDateString()}</td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>

      <WarehouseCart cart={cart} handleSubmit={handleSubmit} />
      <Footer/>
    </div>
  );
}

export default ShoppingCart;
