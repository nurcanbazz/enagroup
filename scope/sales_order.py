import frappe

@frappe.whitelist(allow_guest=True)
def siparis_olustur(items=None):
    try:
        if not items:
            return {"message": "Ürünler parametresi eksik"}

        # items parametresini list olarak parse et
        items = frappe.parse_json(items)  # JSON verisini çözümlüyoruz

        if not items:  # Eğer items listesi boşsa
            return {"message": "Sepet boş, sipariş oluşturulamadı!"}

        sales_order = frappe.new_doc('Sales Order')
        sales_order.customer = "Deneme Müşterisi" 

        for urun in items: 
            item = sales_order.append('items', {})
            item.item_code = urun.get('item_code', '')  
            item.item_name = urun.get('item_name', '')
            item.qty = urun.get('qty', 1)
            item.rate = urun.get('rate', 0)
            item.discount_percentage = urun.get('discount_percentage', 0)
            item.uom = urun.get('uom', 'Nos')

        sales_order.insert()
        frappe.db.commit()

        return {"message": "Sipariş başarıyla oluşturuldu", "siparis_id": sales_order.name}
    except Exception as e:
        frappe.log_error(message=str(e), title="Sipariş Oluşturma Hatası")
        return {"message": "Bir hata oluştu", "error": str(e)}
