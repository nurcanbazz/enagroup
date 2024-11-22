// const updateStockEntry = async (itemCode, qty, warehouse) => {
//     try {
//       const response = await axios.put('http://localhost:8001/api/method/scope.api.stock.update_stock_entry', {
//         params: {
//           item_code: itemCode,
//           qty: qty,
//           warehouse: warehouse,
//         },
//       });
  
//       if (response.data.status === 'success') {
//         console.log('Stock updated successfully:', response.data.message);
//         return true; // Stok başarıyla güncellendi
//       } else {
//         console.error('Error updating stock:', response.data.message);
//         return false; // Stok güncelleme hatalı
//       }
//     } catch (error) {
//       console.error('Error calling the API:', error);
//       return false; // API çağrısı hatalı
//     }
//   };
  