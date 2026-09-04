export interface TestPayments {
  id: string;
  order_id: string;
  cardholder_name: string;
  card_number: string;
  expire_date: string;
  cvv: string;
  payment_status: string;
  created_at: string;
}