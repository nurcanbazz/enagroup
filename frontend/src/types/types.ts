
export interface CartItem {
    item_code: string;
    quantity: number;
    max_discount:number;
  }
  
  export interface Item {
    item_code: string;  
    item_name: string;  
    image: string;      
    unit: string;      
    price: number;      
    discount: number;   
    warehouse: string;  
    quantity: number;   
    total: number;      
    date: string;       
    stock_qty:number;
    custom_list_price:number;
    max_discount:number;
    custom_oem_kodu: string;
    stock_uom: string;
  }

 