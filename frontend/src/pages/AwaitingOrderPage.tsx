import { useEffect, useState } from 'react';
import Footer from '../components/ui/Footer';
import { FaCheck, FaTimes } from 'react-icons/fa';

function AwaitingOrderPage() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    // Yerel depolamadan "onay bekleyen" siparişleri al
    const awaitingOrders = localStorage.getItem('awaitingOrders');
    if (awaitingOrders) {
      setOrders(JSON.parse(awaitingOrders));
    }
  }, []);

  // Siparişi onayla ve tablodan sil
  const handleOrderApproval = (index: number) => {
    const updatedOrders = [...orders];
    const approvedOrder = updatedOrders[index];

    // Siparişi onaylanmış olarak işaretle
    approvedOrder.status = 'onaylanmis';
    approvedOrder.onaylamaTarihi = new Date().toLocaleString();

    // Onaylanmış siparişleri yerel depolamaya kaydet
    const approvedOrders = JSON.parse(localStorage.getItem('approvedOrders') || '[]');
    approvedOrders.push(approvedOrder);

    // Güncellenmiş siparişleri depolamaya kaydet
    const remainingOrders = updatedOrders.filter((_, i) => i !== index);
    localStorage.setItem('awaitingOrders', JSON.stringify(remainingOrders));
    localStorage.setItem('approvedOrders', JSON.stringify(approvedOrders));

    // Tablodaki sipariş listesini güncelle
    setOrders(remainingOrders);
  };

  // Siparişi sil
  const handleDeleteOrder = (index: number) => {
    const updatedOrders = [...orders];
    // Siparişi listeden sil
    const remainingOrders = updatedOrders.filter((_, i) => i !== index);

    // Güncellenmiş siparişleri yerel depolamaya kaydet
    localStorage.setItem('awaitingOrders', JSON.stringify(remainingOrders));

    // Tablodaki sipariş listesini güncelle
    setOrders(remainingOrders);
  };

  return (
    <div className="container">
      <h1>Onay Bekleyen Siparişler</h1>

      <table className="order-table">
        <thead>
          <tr>
            <th>Sipariş No</th>
            <th>Depo Durumu</th>
            <th>Gönderim Tarihi</th>
            <th>Onaylama Tarihi</th>
            <th>Müşteri Notu</th>
            <th>Gönderen</th>
            <th>Toplam Tutar</th>
            <th>İskonto (%)</th>
            <th>Net Fiyat</th>
            <th>Net Fiyat + KDV</th>
            <th>İşlem</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan={11} style={{ textAlign: 'center' }}>
                Henüz onay bekleyen sipariş bulunamadı.
              </td>
            </tr>
          ) : (
            orders.map((order, index) => {
              // Sipariş numarası
              const orderNumber = index + 1;

              // İskonto ve fiyat hesaplamaları
              const discountAmount = (order.custom_list_price * order.max_discount) / 100;
              const discountedPrice = order.custom_list_price - discountAmount;
              const netPrice = discountedPrice * order.quantity;
              const netPriceWithVAT = netPrice * 1.20;

              return (
                <tr key={index}>
                  <td>{orderNumber}</td>
                  <td>
                    {order.stock_qty > 5 ? (
                      <FaCheck color="green" />
                    ) : order.stock_qty > 0 ? (
                      <span>{order.stock_qty}</span>
                    ) : (
                      <FaTimes color="red" />
                    )}
                  </td>
                  <td>{order.gonderimTarihi}</td>
                  <td>{order.onaylamaTarihi || 'Henüz onaylanmadı'}</td>
                  <td>{order.musteriNotu || 'Yok'}</td>
                  <td>120-24-00919</td>
                  <td>{(order.custom_list_price * order.quantity).toFixed(2)} ₺</td>
                  <td>{order.max_discount || 0}%</td>
                  <td>{netPrice.toFixed(2)} ₺</td>
                  <td>{netPriceWithVAT.toFixed(2)} ₺</td>
                  <td>
                    <button onClick={() => handleOrderApproval(index)} className="approve-button">
                      Onayla
                    </button>
                    <button
                      onClick={() => handleDeleteOrder(index)}
                      className="delete-button"
                      style={{ marginTop: '5px', backgroundColor: 'red', color: 'white' }}
                    >
                      Sil
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>

      <Footer />
    </div>
  );
}

export default AwaitingOrderPage;
