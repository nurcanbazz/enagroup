import { useState } from 'react';
import { Item } from "../../types/types";
import "./WarehouseCart.css";

interface CartSummaryProps {
  cart: Item[];
  handleSubmit: () => void;
}

function WarehouseCart({ cart, handleSubmit }: CartSummaryProps) {

  const calculateTotal = (cart: Item[]) => {
    let totalAmount = 0;
    let totalDiscount = 0;
    let subtotal = 0;
    let vatAmount = 0;

    cart.forEach(item => {
      const discountAmount = (item.custom_list_price * item.max_discount) / 100;
      const discountedPrice = item.custom_list_price - discountAmount;
      const itemTotal = discountedPrice * item.quantity;
      const itemTotalWithVAT = itemTotal * 1.20;

      totalAmount += itemTotalWithVAT;
      totalDiscount += discountAmount * item.quantity;
      subtotal += itemTotal;
      vatAmount += itemTotalWithVAT - itemTotal;
    });

    return {
      totalAmount,
      totalDiscount,
      subtotal,
      vatAmount,
    };
  };

  const { totalAmount, totalDiscount, subtotal, vatAmount } = calculateTotal(cart);

  const [paymentStatus, setPaymentStatus] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handlePayment = async () => {
    if (cart.length === 0) {
      setErrorMessage('Sepet boş, sipariş oluşturamazsınız.');
      setPaymentStatus('');
      return; // Sepet boşsa işlemi durdur
    }

    try {
      await handleSubmit();
      setPaymentStatus('success');
      setErrorMessage(''); // Sipariş başarılı olduğunda hata mesajını temizle
    } catch (error) {
      setPaymentStatus('error');
      setErrorMessage('Sipariş sırasında bir hata oluştu.');
    }
  };

  return (
    <div className="cart-summary">
      <h2>Genel Toplam</h2>
      <p>Toplam İskonto: {totalDiscount.toFixed(2)} ₺</p>
      <p>Ön Toplam: {subtotal.toFixed(2)} ₺</p>
      <p>Toplam KDV: {vatAmount.toFixed(2)} ₺</p>
      <p>Toplam Tutar: {totalAmount.toFixed(2)} ₺</p>

      <div className="payment-action">
        <button onClick={handlePayment}>Siparişi Öde</button>
      </div>

      {errorMessage && (
        <p className="error-message">{errorMessage}</p>
      )}

      {paymentStatus && (
        <p className={`payment-status ${paymentStatus}`}>
          {paymentStatus === 'success' ? 'Sipariş başarılı' : 'Hata oluştu'}
        </p>
      )}
    </div>
  );
}

export default WarehouseCart;
