import './ItemList.css';
import { useFrappeGetDocList } from 'frappe-react-sdk';
import { FaCartPlus, FaCheck, FaTimes } from 'react-icons/fa'; 
import { useNavigate } from 'react-router-dom'; 
import { useEffect, useState } from 'react';
import Footer from '../components/ui/Footer';
import { Item } from "../types/types";



function ItemList() {
  // Item ve Bin verilerini çekiyoruz
  const { data: itemData, isLoading: isItemLoading, error: itemError } = useFrappeGetDocList("Item", {
    fields: ["item_code", "item_name", "custom_oem_kodu", "valuation_rate", "stock_uom", "max_discount", "custom_list_price", "image"],
  });

  const { data: binData, isLoading: isBinLoading, error: binError } = useFrappeGetDocList("Bin", {
    fields: ["item_code", "actual_qty"],
  });

  const navigate = useNavigate();
  const [cart, setCart] = useState<Item[]>(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const [hasSearched, setHasSearched] = useState(false); 

  // Sepete ekleme işlevi
  const addToCart = (item: Item) => {
    const existingItemIndex = cart.findIndex(cartItem => cartItem.item_code === item.item_code);

    let newCart;
    if (existingItemIndex !== -1) {
      newCart = [...cart];
      newCart[existingItemIndex].quantity += 1;
    } else {
      newCart = [...cart, { ...item, quantity: 1 }];
    }

    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    navigate('/sepet');
  };

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Item verilerine Bin verisini ekleme (stok bilgisi)
  const enrichedItemData = itemData?.map(item => {
    const bin = binData?.find(b => b.item_code === item.item_code);
    return {
      ...item,
      stock_qty: bin ? bin.actual_qty : 0,
    };
  });

  // Arama kriterine göre filtreleme
  const handleSearch = () => {
    setHasSearched(true); // Arama yapıldığını işaretliyoruz
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const filtered = enrichedItemData?.filter(item => {
      return (
        item.item_code.toLowerCase().includes(lowerCaseSearchTerm) || 
        item.item_name.toLowerCase().includes(lowerCaseSearchTerm) || 
        item.custom_oem_kodu?.toLowerCase().includes(lowerCaseSearchTerm)
      );
    });
    setFilteredItems(filtered || []);
  };

 
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="ItemList">
      <div className="tabs">
        <div className="tab active">Arama</div>
        <div className="tab">Oem Fiyatları</div>
        <div className="tab">Motor Kodu</div>
        <div className="tab">Şaseden Ara</div>
      </div>

      <div className="main-content">
        <div className="search-section">
          <input 
            type="text" 
            placeholder="Arama" 
            className="search-input" 
            value={searchTerm} 
            onChange={e => setSearchTerm(e.target.value)} 
            onKeyPress={handleKeyPress} 
          />
          <button 
            className="search-button"
            onClick={handleSearch}  
          >
            Ara
          </button>
        </div>

        <div className="product-list">
          <table>
            <thead>
              <tr>
                <th>Stok Kodu</th>
                <th>Ürün Adı</th>
                <th>Oem Kodu</th>
                <th>Birim</th>
                <th>Depo</th> 
                <th>Fiyat</th>
                <th>Sepet</th> 
              </tr>
            </thead>
            <tbody>
              {isItemLoading || isBinLoading ? (
                <tr><td colSpan={7}>Yükleniyor...</td></tr>
              ) : itemError || binError ? (
                <tr><td colSpan={7}>Hata: {itemError?.message || binError?.message}</td></tr>
              ) : hasSearched ? (
                filteredItems.length > 0 ? (
                  filteredItems.map((item: Item, index: number) => (
                    <tr key={index}>
                      <td>{item.item_code}</td>
                      <td>{item.item_name}</td>
                      <td>{item.custom_oem_kodu}</td>
                      <td>{item.stock_uom}</td>
                      <td>
                        {item.stock_qty > 5 ? (
                          <FaCheck color="green" />
                        ) : item.stock_qty > 0 ? (
                          <span>{item.stock_qty}</span>
                        ) : (
                          <FaTimes color="red" />
                        )}
                      </td>
                      <td>{item.custom_list_price} ₺</td>
                      <td>
                        <button
                          className="add-to-cart-btn"
                          onClick={() => addToCart(item)}
                        >
                          <FaCartPlus />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan={7}>Arama kriterine uygun ürün bulunamadı.</td></tr>
                )
              ) : (
                <tr><td colSpan={7}>Lütfen arama yapın.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default ItemList;