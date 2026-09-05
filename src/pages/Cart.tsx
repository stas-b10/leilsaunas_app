import { useState, useEffect } from "react"
import type { CustomerOrder } from "../utils/types/customer_orders"
import type { OrderItemOptions } from "../utils/types/order_item_options"
import type { OrderItems } from "../utils/types/order_items"
import type { TestPayments } from "../utils/types/test_payments"
import { supabase } from "../utils/supabase";
import CartImage from "../assets/images/CartImg.webp"
import type { countries } from "../utils/types/all_countries"
import { FaArrowLeft } from "react-icons/fa6"
import { FaArrowRight } from "react-icons/fa6"
import PaymentChoose from "../components/PaymentChoose"
import type { SaunaModelGalleryImage } from "../utils/types/sauna_model_gallery_images";

export default function Cart() {
    const savedCart = sessionStorage.getItem("saunaCartData");
    const cart = savedCart ? JSON.parse(savedCart) : null;
    const [customerOrder, setCustomerOrder] = useState<CustomerOrder>({ id: "", name: cart?.userInput?.name || "", email: cart?.userInput?.email || "", phone: cart?.userInput?.phone || "", country: cart?.userInput?.country || "", city: "", postalCode: "", address: "", apartment: "", deliveryNotes: "",additionalComments: cart?.userInput?.additionalComments || "",subtotal: cart?.model?.price || 0, deliveryPrice: 0, totalPrice: cart?.totalPrice || 0, currency: "USD", paymentMethod: "", paymentStatus: "", paymentProvider: null, paymentCustomerId: null, paymentIntentId: null, paymentSessionId: null, orderStatus: "", adminNotes: null, createdAt: "", updatedAt: "" });
    const [orderItem, setOrderItem] = useState<OrderItems>({ id: "", order_id: "", model_id: cart?.model?.id || "", model_name: cart?.model?.model_name || "", quantity: 1, base_price: cart?.model?.price || 0, options_price: cart?.optionsPrice || 0, unit_price: cart?.totalPrice || 0, total_price: cart?.totalPrice || 0, currency: "USD", created_at: "" });
    const orderItemOption: OrderItemOptions[] = cart?.selectedOptions?.map( (option: { id: string; name: string; option_group_id: string; option_group_name?: string; group_name?: string; price: number;}) => ({ id: "", order_item_id: "", option_group_id: option.option_group_id, option_value_id: option.id, option_group_name: option.option_group_name || option.group_name || "", option_name: option.name, price: option.price, currency: "USD", createdAt: ""})) || [];
    const [testPayment, setTestPayment] = useState<TestPayments>({ id: "", order_id: "", cardholder_name: "", card_number: "", expire_date: "", cvv: "", payment_status: "pending", created_at: ""});
    const [currentStep,setCurrentStep] = useState(1);
    const [errors, setErrors] = useState({ name: false, email: false, country: false, additionalComments: false, city: false, postalCode: false, address: false,});
    const [country,setCountry] = useState<countries[]>([]);
    const [galleryImages, setGalleryImages] = useState<SaunaModelGalleryImage[]>([]);
    const [selectedImage, setSelectedImage] = useState(0);
    const [paymentMethod, setPaymentMethod] =  useState<"pay_on_delivery" | "online_card" | "">("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    
  useEffect(() => {
    const fetchCountries = async () => {
      const { data, error } = await supabase
        .from("all_countries")
        .select("*")
        .order("name", { ascending: true });

      if (error) {
        console.error("Error fetching countries:", error);
        return;
      }
      setCountry(data || []);
    };

    fetchCountries();
  }, []);

  useEffect(() => {
  const fetchGalleryImages = async () => {
    if (!cart?.model?.id) return;

    const { data, error } = await supabase
      .from("sauna_model_gallery_images")
      .select("*")
      .eq("model_id", cart.model.id)
      .order("display_order", { ascending: true });

      if (error) {
       console.error("Error fetching gallery images:", error);
       return;
      }

      setGalleryImages(data || []);
    };

    fetchGalleryImages();
  }, [cart?.model?.id]);

  const handlePreviousImage = () => {
    setSelectedImage((prev) =>
      prev === 0 ? galleryImages.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setSelectedImage((prev) =>
      prev === galleryImages.length - 1 ? 0 : prev + 1
    );
  };

  const validateStep1 = () => {
  const newErrors = {
    ...errors,
    name: !customerOrder.name.trim(),
    email: !customerOrder.email.trim(),
    country: !customerOrder.country,
    additionalComments: !customerOrder.additionalComments?.trim(),
  };

  setErrors(newErrors);

  return !(
    newErrors.name ||
    newErrors.email ||
    newErrors.country ||
    newErrors.additionalComments
  );
};

const validateStep2 = () => {
  const newErrors = {
    ...errors,
    city: !customerOrder.city?.trim(),
    postalCode: !customerOrder.postalCode?.trim(),
    address: !customerOrder.address?.trim(),
  };

  setErrors(newErrors);

  return !(
    newErrors.city ||
    newErrors.postalCode ||
    newErrors.address
  );
};

const handlePlaceOrder = async () => {
  if (!paymentMethod) {
    alert("Please select a payment method.");
    return;
  }

  if (paymentMethod === "online_card") {
  if (!testPayment.cardholder_name.trim()) {
    alert("Please enter the cardholder name.");
    return;
  }

  if (!testPayment.card_number.trim()) {
    alert("Please enter the card number.");
    return;
  }

  if (!testPayment.expire_date.trim()) {
    alert("Please enter the expiration date.");
    return;
  }

  if (!testPayment.cvv.trim()) {
    alert("Please enter the CVV.");
    return;
  }
}

  if (isSubmitting) return;

  setIsSubmitting(true);

  try {
    const itemSubtotal = Number(orderItem.base_price) + Number(orderItem.options_price);
    const deliveryPrice = Number(customerOrder.deliveryPrice) || 0;
    const finalTotal = itemSubtotal + deliveryPrice;

    const { data: createdOrder, error: orderError } = await supabase
      .from("customer_orders")
      .insert({
        name: customerOrder.name,
        email: customerOrder.email,
        phone: customerOrder.phone,
        country: customerOrder.country,
        city: customerOrder.city,
        postal_code: customerOrder.postalCode,
        address: customerOrder.address,
        apartment: customerOrder.apartment,
        delivery_notes: customerOrder.deliveryNotes,
        additional_comments: customerOrder.additionalComments,

        subtotal: itemSubtotal,
        delivery_price: deliveryPrice,
        total_price: finalTotal,
        currency: customerOrder.currency,

        payment_method: paymentMethod,
        payment_status: "pending",

        payment_provider: null,
        payment_customer_id: null,
        payment_intent_id: null,
        payment_session_id: null,

        order_status: "pending",
        admin_notes: null,
      })
      .select()
      .single();

    if (orderError) {
      console.error("Order error message:", orderError?.message);
console.error("Order error code:", orderError?.code);
console.error("Order error details:", orderError?.details);
console.error("Order error hint:", orderError?.hint);
      alert("Could not create your order.");
      return;
    }

    const { data: createdOrderItem, error: orderItemError } = await supabase
      .from("order_items")
      .insert({
        order_id: createdOrder.id,
        model_id: orderItem.model_id,
        model_name: orderItem.model_name,
        quantity: orderItem.quantity,
        base_price: orderItem.base_price,
        options_price: orderItem.options_price,
        unit_price: itemSubtotal,
        total_price: itemSubtotal,
        currency: orderItem.currency,
      })
      .select()
      .single();

    if (orderItemError) {
      console.error("Error creating order item:", orderItemError);
      alert("Could not save your order item.");
      return;
    }

    if (orderItemOption.length > 0) {
      const optionsToInsert = orderItemOption.map((option) => ({
        order_item_id: createdOrderItem.id,
        option_group_id: option.option_group_id,
        option_value_id: option.option_value_id,
        option_group_name: option.option_group_name,
        option_name: option.option_name,
        price: option.price,
        currency: option.currency,
      }));

      const { error: optionsError } = await supabase
        .from("order_item_options")
        .insert(optionsToInsert);

      if (optionsError) {
        console.error("Error creating order options:", optionsError);
        alert("Could not save the selected options.");
        return;
      }
    }

    if (paymentMethod === "online_card") {
      const { error: paymentError } = await supabase
        .from("test_payments")
        .insert({
          order_id: createdOrder.id,
          cardholder_name: testPayment.cardholder_name,
          card_number: testPayment.card_number,
          expire_date: testPayment.expire_date,
          cvv: testPayment.cvv,
          payment_status: "pending",
        });

      if (paymentError) {
        console.error("Error creating test payment:", paymentError);
        alert("Could not save the test card payment.");
        return;
      }
    }

    setCustomerOrder((prev) => ({
      ...prev,
      id: createdOrder.id,
      paymentMethod: paymentMethod,
      paymentStatus: "pending",
      orderStatus: "pending",
      subtotal: itemSubtotal,
      totalPrice: finalTotal,
    }));

    setOrderItem((prev) => ({
      ...prev,
      id: createdOrderItem.id,
      order_id: createdOrder.id,
      unit_price: itemSubtotal,
      total_price: itemSubtotal,
    }));

    alert("Your order has been placed successfully!");

  } catch (error) {
    console.error("Unexpected error:", error);
    alert("Something went wrong while placing your order.");
  } finally {
    setIsSubmitting(false);
  }
};

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

        <section className="pb-[250px]">
         <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center justify-center gap-4 mb-16">
            <div className={`flex items-center gap-3 ${currentStep >= 1 ? "text-[#313C2B]" : "text-[#9A978F]"}`} >
              <span className={`flex items-center justify-center w-10 h-10 rounded-[12px] ${currentStep >= 1 ? "bg-[#313C2B] text-[#F7F5F0]" : "border border-[#C6C0AF]"}`}>1</span>
              <span style={{ fontFamily: "noah-bold, sans-serif" }}>Customer Details</span>
            </div>
            <div className={`w-32 h-[1px] transition-colors duration-300 ${currentStep >= 2 ? "bg-[#313C2B] h-[2px]": "bg-[#C6C0AF]" }`} />
            <div className={`flex items-center gap-3 ${currentStep >= 2 ? "text-[#313C2B]" : "text-[#9A978F]"}`} >
              <span className={`flex items-center justify-center w-10 h-10 rounded-[12px] ${currentStep >= 2 ? "bg-[#313C2B] text-[#F7F5F0]" : "border border-[#C6C0AF]"}`}>2</span>
              <span style={{ fontFamily: "noah-bold, sans-serif" }}>Address Info</span>
            </div>
            <div className={`w-32 h-[1px] transition-colors duration-300 ${currentStep >= 3 ? "bg-[#313C2B]": "bg-[#C6C0AF]" }`} />
            <div className={`flex items-center gap-3 ${currentStep >= 3 ? "text-[#313C2B]" : "text-[#9A978F]"}`} >
              <span className={`flex items-center justify-center w-10 h-10 rounded-[12px] ${currentStep >= 3 ? "bg-[#313C2B] text-[#F7F5F0]" : "border border-[#C6C0AF]"}`}>3</span>
              <span style={{ fontFamily: "noah-bold, sans-serif" }}>Payment</span>
            </div>
          </div>
          {currentStep === 1 && (
            <div className="max-w-[1400px] mx-auto gap-3 text-left mt-[70px] items-stretch min-h-[550px] ">
              <div className="grid grid-cols-[670px_670px] gap-10 items-start">
               <div className="flex flex-col items-center w-full pt-[110px]">
                <div className="relative w-full h-[520px] flex items-start justify-center -translate-y-[110px]">
                  {galleryImages.length > 1 && (
                    <button type="button" onClick={handlePreviousImage} className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-[#F7F5F0]/90 border border-[#C6C0AF] flex items-center justify-center text-[#313C2B] text-2xl hover:bg-[#313C2B] hover:text-[#F7F5F0] transition-all duration-200 cursor-pointer">
                      <FaArrowLeft />
                    </button>
                  )}
                  {(galleryImages.length > 0 || cart?.model?.product_sheet_url) && (
                    <img src={galleryImages.length > 0 ? galleryImages[selectedImage]?.image_url : cart?.model?.product_sheet_url} className="w-[670px] h-[520px] object-cover"/>
                  )}
                  {galleryImages.length > 1 && (
                    <button type="button" onClick={handleNextImage} className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-[#F7F5F0]/90 border border-[#C6C0AF] flex items-center justify-center text-[#313C2B] text-2xl hover:bg-[#313C2B] hover:text-[#F7F5F0] transition-all duration-200 cursor-pointer">
                      <FaArrowRight />
                    </button>
                  )}
                  </div>
                  {galleryImages.length > 0 && (
                    <div className="grid grid-cols-6 gap-3 -mt-[90px]">
                   {galleryImages.map((image,index) => (
                    <button key={image.id} type="button" onClick={() => setSelectedImage(index)} className={`cursor-pointer w-[90px] h-[70px] shrink-0 overflow-hidden rounded-[8px] border-2 transition-all duration-200 ${ selectedImage === index? "border-[#313C2B]": "border-transparent"}`}>
                      <img src={image.image_url} alt={image.alt_text ||`${cart?.model?.model_name || "Sauna"} image ${index + 1}`} className="w-full h-full object-cover"/>
                    </button>
                   ))}
                  </div>
                  )}
                </div>

              <div className="bg-[#EFECE1] rounded-[8px] p-8 space-y-6">
              <div className="col-span-2 flex flex-col pl-[10px]">
               <label htmlFor="reseller-name" className="text-[22px] text-[#313C2B]" style={{ fontFamily: "noah-bold, sans-serif" }}>Name <span className="text-red-500 w-2 h-2 ml-[1px]">*</span></label>
               <input id="reseller-name" type="text" value={customerOrder.name} onChange={(e) => { setCustomerOrder((prev) => ({...prev,name: e.target.value, })); 
                  setErrors((prev) => ({...prev,name: false,}));}} 
                  className={`w-full rounded-[6px] border ${errors.name ? "border-red-500" : "border-[#C6C0AF]"} bg-[#F7F5EF] px-4 py-3 outline-none text-[#313C2B] focus:bg-white transition-all duration-200`}/>
               {errors.name && (<span className="text-red-500 text-[11px]">This field is required</span>)}
              </div>

              <div className="col-span-2 flex flex-col pl-[10px]">
               <label htmlFor="contact-email" className="text-[22px] text-[#313C2B]" style={{ fontFamily: "noah-bold, sans-serif" }}>Email <span className="text-red-500 w-2 h-2 ml-[1px]">*</span></label>
                <input id="email" type="email" value={customerOrder.email} onChange={(e) => setCustomerOrder((prev) => ({
                  ...prev,email:e.target.value,
                }))}
                className={`w-full rounded-[6px] border ${errors.email ? "border-red-500" : "border-[#C6C0AF]"} bg-[#F7F5EF] px-4 py-3 outline-none text-[#313C2B] focus:bg-white transition-all duration-200`}
                />
                {errors.email && (<span className="text-red-500 text-[11px]">This field is required</span>)}
              </div>

              <div className="col-span-2 flex flex-col pl-[10px]">
               <label htmlFor="contact-country" className="text-[22px] text-[#313C2B]" style={{ fontFamily: "noah-bold, sans-serif" }}>Country <span className="text-red-500 w-2 h-2 ml-[1px]">*</span></label>
                <select id="country" value={customerOrder.country} onChange={(e) => setCustomerOrder((prev) => ({
                  ...prev,country:e.target.value,
                }))}
                className={`w-full appearance-none rounded-[6px] border ${errors.country ? "border-red-500" : "border-[#C6C0AF]"} bg-[#F7F5EF] px-4 py-3 outline-none text-[#313C2B] focus:bg-white transition-all duration-200`}>

                <option value="">Select country</option>
                {country.map((item) => (<option key={item.id} value={item.name}> {item.name} </option>))} 
                </select>
              {errors.country && (<span className="text-red-500 text-[11px]">This field is required</span>)}
              </div>

              <div className="col-span-2 flex flex-col pl-[10px]">
                <label htmlFor="contact-phone"  className="block text-[22px] text-[#313C2B] mb-2" style={{ fontFamily: "noah-bold, sans-serif" }}>
                  Phone/Mobile
                </label>
                <input id="contact-phone" placeholder="optional - for faster response on your quote" type="tel" value={customerOrder.phone} onChange={(e) => setCustomerOrder((prev) => ({  ...prev, phone: e.target.value,}))}
                  className="w-full rounded-[6px] border border-[#C6C0AF] bg-[#F7F5EF] px-4 py-3 outline-none text-[#313C2B] focus:bg-white transition-all duration-200"
                />
              </div>

              <div className="col-span-2 flex flex-col pl-[10px]">
                <label htmlFor="additional-comments" className="block text-[22px] text-[#313C2B] mb-2" style={{ fontFamily: "noah-bold, sans-serif" }}>
                  Additional comments <span className="text-red-500 w-2 h-2 ml-[1px]">*</span>
                </label>

                <textarea id="additional-comments" value={customerOrder.additionalComments} onChange={(e) => setCustomerOrder((prev) => ({  ...prev, additionalComments: e.target.value,}))}
                  rows={4} className={`w-full rounded-[6px] border ${ errors.additionalComments ? "border-red-500" : "border-[#C6C0AF]"} bg-[#F7F5EF] px-4 py-3 outline-none text-[#313C2B] focus:bg-white transition-all duration-200 resize-none`}
                />
                  {errors.additionalComments && (<span className="text-red-500 text-[11px]">This field is required</span>)}
              </div>

              <button type="button" onClick={() => {if (validateStep1()) { setCurrentStep(2); }}} className="w-full py-4 rounded-[8px] bg-[#313C2B] text-[#F7F5EF] hover:bg-[#778658] transition-colors duration-300 cursor-pointer mt-4" style={{ fontFamily: "noah-bold, sans-serif" }}>
                Next
              </button>

              </div>
            </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="max-w-[1400px] mx-auto gap-3 text-left mt-[70px] items-stretch min-h-[550px] ">
              <div className="grid grid-cols-[670px_670px] gap-10 items-start">
               <div className="flex flex-col items-center w-full pt-[110px]">
                <div className="relative w-full h-[520px] flex items-start justify-center -translate-y-[110px]">
                  {galleryImages.length > 1 && (
                    <button type="button" onClick={handlePreviousImage} className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-[#F7F5F0]/90 border border-[#C6C0AF] flex items-center justify-center text-[#313C2B] text-2xl hover:bg-[#313C2B] hover:text-[#F7F5F0] transition-all duration-200 cursor-pointer">
                      <FaArrowLeft />
                    </button>
                  )}
                  {(galleryImages.length > 0 || cart?.model?.product_sheet_url) && (
                    <img src={galleryImages.length > 0 ? galleryImages[selectedImage]?.image_url : cart?.model?.product_sheet_url} className="w-[670px] h-[520px] object-cover"/>
                  )}
                  {galleryImages.length > 1 && (
                    <button type="button" onClick={handleNextImage} className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-[#F7F5F0]/90 border border-[#C6C0AF] flex items-center justify-center text-[#313C2B] text-2xl hover:bg-[#313C2B] hover:text-[#F7F5F0] transition-all duration-200 cursor-pointer">
                      <FaArrowRight />
                    </button>
                  )}
                  </div>
                  {galleryImages.length > 0 && (
                    <div className="grid grid-cols-6 gap-3 -mt-[90px]">
                   {galleryImages.map((image,index) => (
                    <button key={image.id} type="button" onClick={() => setSelectedImage(index)} className={`cursor-pointer w-[90px] h-[70px] shrink-0 overflow-hidden rounded-[8px] border-2 transition-all duration-200 ${ selectedImage === index? "border-[#313C2B]": "border-transparent"}`}>
                      <img src={image.image_url} alt={image.alt_text ||`${cart?.model?.model_name || "Sauna"} image ${index + 1}`} className="w-full h-full object-cover"/>
                    </button>
                   ))}
                  </div>
                  )}
                </div>

              <div className="bg-[#EFECE1] rounded-[8px] p-8 space-y-6">
              <div className="col-span-2 flex flex-col pl-[10px]">
               <label htmlFor="city" className="text-[22px] text-[#313C2B]" style={{ fontFamily: "noah-bold, sans-serif" }}>City <span className="text-red-500 w-2 h-2 ml-[1px]">*</span></label>
               <input id="city" type="text" value={customerOrder.city} onChange={(e) => { setCustomerOrder((prev) => ({...prev,city: e.target.value, })); 
                  setErrors((prev) => ({...prev,city: false,}));}} 
                  className={`w-full rounded-[6px] border ${errors.city ? "border-red-500" : "border-[#C6C0AF]"} bg-[#F7F5EF] px-4 py-3 outline-none text-[#313C2B] focus:bg-white transition-all duration-200`}/>
               {errors.city && (<span className="text-red-500 text-[11px]">This field is required</span>)}
              </div>

              <div className="col-span-2 flex flex-col pl-[10px]">
               <label htmlFor="postal_code" className="text-[22px] text-[#313C2B]" style={{ fontFamily: "noah-bold, sans-serif" }}>Postal Code <span className="text-red-500 w-2 h-2 ml-[1px]">*</span></label>
                <input id="postal_code" type="text" value={customerOrder.postalCode} onChange={(e) => setCustomerOrder((prev) => ({
                  ...prev,postalCode:e.target.value,
                }))}
                className={`w-full rounded-[6px] border ${errors.postalCode ? "border-red-500" : "border-[#C6C0AF]"} bg-[#F7F5EF] px-4 py-3 outline-none text-[#313C2B] focus:bg-white transition-all duration-200`}
                />
                {errors.postalCode && (<span className="text-red-500 text-[11px]">This field is required</span>)}
              </div>

              <div className="col-span-2 flex flex-col pl-[10px]">
               <label htmlFor="address" className="text-[22px] text-[#313C2B]" style={{ fontFamily: "noah-bold, sans-serif" }}>Address <span className="text-red-500 w-2 h-2 ml-[1px]">*</span></label>
                <input id="address" type="text" value={customerOrder.address} onChange={(e) => setCustomerOrder((prev) => ({
                  ...prev,address:e.target.value,
                }))}
                className={`w-full rounded-[6px] border ${errors.address ? "border-red-500" : "border-[#C6C0AF]"} bg-[#F7F5EF] px-4 py-3 outline-none text-[#313C2B] focus:bg-white transition-all duration-200`}
                />
                {errors.address && (<span className="text-red-500 text-[11px]">This field is required</span>)}
              </div>

              <div className="col-span-2 flex flex-col pl-[10px]">
               <label htmlFor="apartment" className="text-[22px] text-[#313C2B]" style={{ fontFamily: "noah-bold, sans-serif" }}>Apartment</label>
                <input id="apartment" type="text" placeholder="optional" value={customerOrder.apartment ?? ""} onChange={(e) => setCustomerOrder((prev) => ({
                  ...prev,apartment:e.target.value,
                }))}
                 className="w-full rounded-[6px] border border-[#C6C0AF] bg-[#F7F5EF] px-4 py-3 outline-none text-[#313C2B] focus:bg-white transition-all duration-200"
                />
              </div>

              <div className="col-span-2 flex flex-col pl-[10px]">
                <label htmlFor="delivery_notes" className="block text-[22px] text-[#313C2B] mb-2" style={{ fontFamily: "noah-bold, sans-serif" }}>
                  Delivery Notes
                </label>

                <textarea id="delivery_notes" placeholder="optional" value={customerOrder.deliveryNotes ?? ""} onChange={(e) => setCustomerOrder((prev) => ({  ...prev, deliveryNotes: e.target.value,}))}
                  rows={4} className="w-full rounded-[6px] border border-[#C6C0AF] bg-[#F7F5EF] px-4 py-3 outline-none text-[#313C2B] focus:bg-white transition-all duration-200 resize-none"/>
              </div>
              <div className="col-span-2 flex gap-4 pt-4">
              <button type="button" onClick={() => setCurrentStep(1)} className="w-full py-4 rounded-[8px] bg-[#313C2B] text-[#F7F5EF] hover:bg-[#778658] transition-colors duration-300 cursor-pointer mt-4" style={{ fontFamily: "noah-bold, sans-serif" }}>
                Back
              </button>
              <button type="button" onClick={() => {if (validateStep2()) { setCurrentStep(3); }}} className="w-full py-4 rounded-[8px] bg-[#313C2B] text-[#F7F5EF] hover:bg-[#778658] transition-colors duration-300 cursor-pointer mt-4" style={{ fontFamily: "noah-bold, sans-serif" }}>
                Next
              </button>
              </div>
              </div>
            </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="max-w-[1400px] mx-auto gap-3 text-left mt-[70px] items-stretch min-h-[550px] ">
              <div className="grid grid-cols-[670px_670px] gap-10 items-start">
               <div className="flex flex-col items-center w-full pt-[110px]">
                 <div className="relative w-full h-[520px] flex items-start justify-center -translate-y-[110px]">
                  {galleryImages.length > 1 && (
                    <button type="button" onClick={handlePreviousImage} className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-[#F7F5F0]/90 border border-[#C6C0AF] flex items-center justify-center text-[#313C2B] text-2xl hover:bg-[#313C2B] hover:text-[#F7F5F0] transition-all duration-200 cursor-pointer">
                      <FaArrowLeft />
                    </button>
                  )}
                  {(galleryImages.length > 0 || cart?.model?.product_sheet_url) && (
                    <img src={galleryImages.length > 0 ? galleryImages[selectedImage]?.image_url : cart?.model?.product_sheet_url} className="w-[670px] h-[520px] object-cover"/>
                  )}
                  {galleryImages.length > 1 && (
                    <button type="button" onClick={handleNextImage} className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-[#F7F5F0]/90 border border-[#C6C0AF] flex items-center justify-center text-[#313C2B] text-2xl hover:bg-[#313C2B] hover:text-[#F7F5F0] transition-all duration-200 cursor-pointer">
                      <FaArrowRight />
                    </button>
                  )}
                 </div>
                 {galleryImages.length > 0 && (
                  <div className="grid grid-cols-6 gap-3 -mt-[90px]">
                   {galleryImages.map((image,index) => (
                    <button key={image.id} type="button" onClick={() => setSelectedImage(index)} className={`cursor-pointer w-[90px] h-[70px] shrink-0 overflow-hidden rounded-[8px] border-2 transition-all duration-200 ${ selectedImage === index? "border-[#313C2B]": "border-transparent"}`}>
                      <img src={image.image_url} alt={image.alt_text ||`${cart?.model?.model_name || "Sauna"} image ${index + 1}`} className="w-full h-full object-cover"/>
                    </button>
                   ))}
                  </div>
                  )}
               </div>
                <PaymentChoose paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} testPayment={testPayment} setTestPayment={setTestPayment} orderItem={orderItem} orderItemOption={orderItemOption} customerOrder={customerOrder} onBack={() => setCurrentStep(2)} onPay={handlePlaceOrder} isSubmitting={isSubmitting}/>   
             </div>
            </div>
          )}

         </div>
        </section>
    </div>
  )
}
