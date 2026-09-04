import { useState } from "react"
import type { CustomerOrder } from "../utils/types/customer_orders"
import type { OrderItemOptions } from "../utils/types/order_item_options"
import type { OrderItems } from "../utils/types/order_items"
import type { TestPayments } from "../utils/types/test_payments"
import { supabase } from "../utils/supabase";
import CartImage from "../assets/images/CartImg.webp"

export default function Cart() {
    const savedCart = sessionStorage.getItem("saunaCartData");
    const cart = savedCart ? JSON.parse(savedCart) : null;
    const [customerOrder, setCustomerOrder] = useState<CustomerOrder>({ id: "", name: cart?.userInput?.name || "", email: cart?.userInput?.email || "", phone: cart?.userInput?.phone || "", country: cart?.userInput?.country || "", city: "", postalCode: "", address: "", apartment: "", deliveryNotes: "", subtotal: cart?.model?.price || 0, deliveryPrice: 0, totalPrice: cart?.totalPrice || 0, currency: "USD", paymentMethod: "", paymentStatus: "", paymentProvider: null, paymentCustomerId: null, paymentIntentId: null, paymentSessionId: null, orderStatus: "", adminNotes: null, createdAt: "", updatedAt: "" });
    const [orderItem, setOrderItem] = useState<OrderItems>({ id: "", order_id: "", model_id: cart?.model?.id || "", model_name: cart?.model?.model_name || "", quantity: 1, base_price: cart?.model?.price || 0, options_price: cart?.optionsPrice || 0, unit_price: cart?.totalPrice || 0, total_price: cart?.totalPrice || 0, currency: "USD", created_at: "" });
    const [orderItemOption, setOrderItemOption] = useState<OrderItemOptions[]>(cart?.selectedOptions?.map((option: { id: string; name: string; option_group_id: string; price: number }) => ({ id: "", order_item_id: "", option_group_id: option.option_group_id, option_value_id: option.id, option_group_name: "", option_name: option.name, price: option.price, currency: "USD", createdAt: "" })) || []);
    const [testPayment, setTestPayment] = useState<TestPayments>({ id: "", order_id: "", cardholder_name: "", card_number: "", expire_date: "", cvv: "", payment_status: "pending", created_at: "" });
    const [currentStep,setCurrentStep] = useState(1);
    

return (
     <div className="min-h-screen bg-[#F7F5F0] text-black">
      
      <section className="w-full mb-16">
          <div className="relative w-full h-[400px] overflow-hidden">

            <img
              src={CartImage}
              alt={"main_img"}
              className="w-full h-full object-cover object-[50%_60%]"
            />

            <div className="absolute inset-0 bg-black/20" />

            <div className="absolute bottom-18 right-2 md:right-48 text-white">
              <div className="flex items-end gap-16 max-w-[1600px]">
                <p className="w-[1550px] text-[64px] leading-[0.95]" style={{ fontFamily: "sogo-light, sans-serif" }}>
                  Finalize the last details to buy the Sauna,just 3 steps.
                </p>
              </div>
            </div>
          </div>
        </section>
    </div>
  )
}
