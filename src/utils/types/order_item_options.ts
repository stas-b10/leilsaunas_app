export interface OrderItemOptions {
    id: string;
    order_item_id: string;
    option_group_id?: string | null;
    option_value_id?: string | null;
    option_group_name: string;
    option_name: string;
    price: number;
    currency: string;
    createdAt: string;
}