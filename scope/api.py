import frappe


@frappe.whitelist(allow_guest=True)
def update_stock_entry(item_code, qty, s_warehouse, t_warehouse=None):
    try:
        stock_entry_type = "Material Issue" if not t_warehouse else "Material Transfer"

        stock_entry = frappe.get_doc({
            "doctype": "Stock Entry",
            "stock_entry_type": stock_entry_type,
            "items": [{
                "item_code": item_code,
                "qty": qty,
                "s_warehouse": s_warehouse,
                "t_warehouse": t_warehouse if t_warehouse else None
            }]
        })

        stock_entry.insert()
        stock_entry.submit()

        return {"status": "success", "message": "Stok başarıyla güncellendi"}
    except Exception as e:
        frappe.log_error(message=str(e), title="Stock Entry Error")
        return {"status": "error", "message": str(e)}
