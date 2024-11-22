import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function PaymentPage() {
  const [paymentStatus, setPaymentStatus] = useState('');
  const navigate = useNavigate();

  // Ödeme başarılı olduğunda çağrılan fonksiyon
  const handlePaymentSuccess = async () => {
    setPaymentStatus('Ödeme Başarılı');

    // Sepet verisini localStorage'dan alıyoruz

    // Ödeme başarılı, kullanıcıyı başarılı sayfasına yönlendir
    setTimeout(() => {
      navigate('/success');
    }, 2000);

    // Sepeti temizle
    localStorage.removeItem('cart');
  };

  return (
    <div className="payment-page">
      <h3>Kredi Kartı Bilgileri</h3>
      <form>
        <input type="text" placeholder="Kart Numarası" required />
        <input type="text" placeholder="Ad Soyad" required />
        <input type="text" placeholder="Son Kullanma Tarihi (AA/YY)" required />
        <input type="text" placeholder="CVC" required />
        <button type="button" onClick={handlePaymentSuccess}>Öde</button>
      </form>
      {paymentStatus && <p>{paymentStatus}</p>}
    </div>
  );
}

export default PaymentPage;
