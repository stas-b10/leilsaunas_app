export interface OrderItems {
    id: string;
    order_id: string;
    model_id: string;
    model_name: string;
    quantity: number;
    base_price: number;
    options_price: number;
    unit_price: number;
    total_price: number;
    currency: string;
    created_at: string;
}