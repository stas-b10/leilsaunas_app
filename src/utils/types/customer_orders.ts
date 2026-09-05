export interface CustomerOrder {
  id: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  postalCode: string;
  address: string;
  apartment?: string | null;
  deliveryNotes?: string | null;
  additionalComments?: string;
  subtotal: number;
  deliveryPrice: number;
  totalPrice: number;
  currency: string;
  paymentMethod: string;
  paymentStatus: string;
  paymentProvider?: string | null;
  paymentCustomerId?: string | null;
  paymentIntentId?: string | null;
  paymentSessionId?: string | null;
  orderStatus: string;
  adminNotes?: string | null;
  createdAt: string;
  updatedAt: string;
}