import { useEffect, useState } from 'react';
import "./ApprovedorderPage.css";
import Footer from '../components/ui/Footer';
import { FaCheck, FaTimes } from 'react-icons/fa';


function ApprovedOrderPage() {
  const [approvedOrders, setApprovedOrders] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);  // Hangi sayfada olduğumuzu takip ediyoruz
  const [itemsPerPage, setItemsPerPage] = useState<number>(10); // Sayfa başına gösterilecek öğe sayısı

  useEffect(() => {
    // Yerel depolamadan onaylanmış siparişleri al
    const savedApprovedOrders = localStorage.getItem('approvedOrders');
    if (savedApprovedOrders) {
      setApprovedOrders(JSON.parse(savedApprovedOrders));
    }
  }, []);

  // Sayfa numarasına göre gösterilecek siparişleri hesapla
  const indexOfLastOrder = currentPage * itemsPerPage;
  const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
  const currentOrders = approvedOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  // Sayfa değiştirildiğinde çağrılacak fonksiyon
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Sayfa başına toplam sayfa sayısını hesapla
  const totalPages = Math.ceil(approvedOrders.length / itemsPerPage);

  return (
    <div className="table-container">
      <h1>Onaylanmış Siparişler</h1>

      {/* Sayfa başına gösterilecek öğe sayısını ayarlamak için bir seçim */}
      <div className="pagination-controls">
        <label htmlFor="itemsPerPage">Sayfa başına öğe sayısı: </label>
        <select
          id="itemsPerPage"
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(Number(e.target.value))}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>

      <table className="order-table">
        <thead>
          <tr>
            <th>Sipariş No</th>
            <th>Depo Çıkış</th>
            <th>Gönderim Tarihi</th>
            <th>Onaylama Tarihi</th>
            <th>Müşteri Notu</th>
            <th>Gönderen</th>
            <th>Tutar</th>
            <th>İskonto</th>
            <th>Net Fiyat</th>
            <th>Net Fiyat+KDV</th>
            <th>Detay</th>
          </tr>
        </thead>
        <tbody>
          {currentOrders.length === 0 ? (
            <tr>
              <td colSpan={12}>Henüz onaylanmış sipariş bulunamadı.</td>
            </tr>
          ) : (
            currentOrders.map((order, index) => {
              // Sipariş numarasını bir önceki sayfadan devam ettiriyoruz
              const orderNumber = index + 1 + (currentPage - 1) * itemsPerPage;  // Sipariş numarasını buradan hesaplıyoruz

              // İskonto uygulanmış net fiyat hesaplaması
              const discountAmount = (order.custom_list_price * order.max_discount) / 100;
              const discountedPrice = order.custom_list_price - discountAmount;
              const netPrice = discountedPrice * order.quantity; // Net Fiyat
              const netPriceWithVAT = netPrice * 1.20; // KDV dahil Net Fiyat

              return (
                <tr key={index}>
                  <td>{orderNumber}</td> {/* Sipariş numarasını burada gösteriyoruz */}
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
                  <td>{order.onaylamaTarihi}</td>
                  <td>{order.musteriNotu}</td>
                  <td>120-24-00919</td>
                  <td>{(order.custom_list_price * order.quantity).toFixed(2)} ₺</td>
                  <td>{order.max_discount}%</td>
                  <td>{netPrice.toFixed(2)} ₺</td> {/* Net Fiyat */}
                  <td>{(netPriceWithVAT).toFixed(2)} ₺</td> {/* Net Fiyat + KDV */}
                  <td>
                    <button className="detail-button">Detay</button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>

      {/* Sayfalama Butonları */}
      <div className="pagination">
        <button 
          onClick={() => paginate(currentPage - 1)} 
          disabled={currentPage === 1}
          className="pagination-btn"
        >
          Önceki
        </button>
        
        {[...Array(totalPages)].map((_, index) => (
          <button 
            key={index} 
            onClick={() => paginate(index + 1)} 
            className={`pagination-btn ${index + 1 === currentPage ? 'active' : ''}`}
          >
            {index + 1}
          </button>
        ))}
        
        <button 
          onClick={() => paginate(currentPage + 1)} 
          disabled={currentPage === totalPages}
          className="pagination-btn"
        >
          Sonraki
        </button>
      </div>

      <Footer />
    </div>
  );
}

export default ApprovedOrderPage;
