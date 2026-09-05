import type { TestPayments } from "../utils/types/test_payments";
import type { OrderItemOptions } from "../utils/types/order_item_options";
import type { OrderItems } from "../utils/types/order_items";
import type { CustomerOrder } from "../utils/types/customer_orders";

type PaymentMethod = "pay_on_delivery" | "online_card" | "";

interface PaymentChooseProps {
  paymentMethod: PaymentMethod;
  setPaymentMethod: React.Dispatch<React.SetStateAction<PaymentMethod>>;

  testPayment: TestPayments;
  setTestPayment: React.Dispatch<React.SetStateAction<TestPayments>>;

  orderItem: OrderItems;
  orderItemOption: OrderItemOptions[];
  customerOrder: CustomerOrder;

  onBack: () => void;
  onPay: () => void;
  isSubmitting: boolean;
}

export default function PaymentChoose({
  paymentMethod,
  setPaymentMethod,
  testPayment,
  setTestPayment,
  orderItem,
  orderItemOption,
  customerOrder,
  onBack,
  onPay,
  isSubmitting,
}: PaymentChooseProps) {
  return (
    <div className="bg-[#EFECE1] rounded-[8px] p-8">
      <div className="grid grid-cols-2 gap-x-5 gap-y-6">
        <div className="col-span-2">
          <h2
            className="text-[28px] text-[#313C2B] mb-6"
            style={{ fontFamily: "noah-bold, sans-serif" }}
          >
            Choose payment method
          </h2>
        </div>

        <button
          type="button"
          onClick={() => setPaymentMethod("pay_on_delivery")}
          className={`text-left rounded-[8px] border-2 p-5 transition-all duration-200 cursor-pointer ${
            paymentMethod === "pay_on_delivery"
              ? "border-[#313C2B] bg-[#F7F5F0]"
              : "border-[#C6C0AF] bg-[#F7F5EF]"
          }`}
        >
          <h2
            className="text-[20px] text-[#313C2B]"
            style={{ fontFamily: "noah-bold, sans-serif" }}
          >
            Pay at home
          </h2>

          <p
            className="text-[16px] text-[#6D6A63] mt-2"
            style={{ fontFamily: "noah-regular, sans-serif" }}
          >
            Pay when the sauna arrives.
          </p>
        </button>

        <button
          type="button"
          onClick={() => setPaymentMethod("online_card")}
          className={`text-left rounded-[8px] border-2 p-5 transition-all duration-200 cursor-pointer ${
            paymentMethod === "online_card"
              ? "border-[#313C2B] bg-[#F7F5F0]"
              : "border-[#C6C0AF] bg-[#F7F5EF]"
          }`}
        >
          <h2
            className="text-[20px] text-[#313C2B]"
            style={{ fontFamily: "noah-bold, sans-serif" }}
          >
            Pay with card
          </h2>

          <p
            className="text-[16px] text-[#6D6A63] mt-2"
            style={{ fontFamily: "noah-regular, sans-serif" }}
          >
            Pay with test card.
          </p>
        </button>


        {paymentMethod === "online_card" && (
          <div className="col-span-2 border-t border-[#C6C0AF] pt-6 mt-2">
            <div className="grid grid-cols-2 gap-5">

              <div className="col-span-2">
                <label
                  className="block text-[16px] text-[#313C2B] mb-2"
                  style={{ fontFamily: "noah-bold, sans-serif" }}
                >
                  Cardholder Name
                </label>

                <input
                  type="text"
                  value={testPayment.cardholder_name}
                  onChange={(e) =>
                    setTestPayment((prev) => ({...prev,cardholder_name: e.target.value, }))}
                  className="w-full rounded-[6px] border border-[#C6C0AF] bg-[#F7F5EF] px-4 py-3 outline-none text-[#313C2B] focus:bg-white transition-all duration-200"
                />
              </div>

              <div className="col-span-2">
                <label
                  className="block text-[16px] text-[#313C2B] mb-2"
                  style={{ fontFamily: "noah-bold, sans-serif" }}
                >
                  Card Number
                </label>

                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={19}
                  placeholder="1234 5678 9012 3456"
                  value={testPayment.card_number.replace(/\D/g, "").replace(/(\d{4})(?=\d)/g, "$1 ")}
                  onChange={(e) => {
                    const digits = e.target.value.replace(/\D/g, "").slice(0, 16);

                    setTestPayment((prev) => ({
                      ...prev,
                      card_number: digits,
                    }))
                  }
                }
                  className="w-full rounded-[6px] border border-[#C6C0AF] bg-[#F7F5EF] px-4 py-3 outline-none text-[#313C2B] focus:bg-white transition-all duration-200"
                />
              </div>

              <div>
                <label
                  className="block text-[16px] text-[#313C2B] mb-2"
                  style={{ fontFamily: "noah-bold, sans-serif" }}
                >
                  Expiration Date
                </label>

                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="MM/YY"
                  maxLength={5}
                  value={testPayment.expire_date}
                  onChange={(e) => {
                    const digits = e.target.value.replace(/\D/g, "").slice(0, 4);
                    let formattedDigits = digits;
                    if (digits.length >= 2) { const month = Number(digits.slice(0, 2));  if (month === 0) { formattedDigits = `01${digits.slice(2)}`; } else if (month > 12) {formattedDigits = `12${digits.slice(2)}`;}}
                    const formatted = formattedDigits.length > 2 ? `${formattedDigits.slice(0, 2)}/${formattedDigits.slice(2)}` : formattedDigits;
                    setTestPayment((prev) => ({...prev,expire_date: formatted,}));}}
                  className="w-full rounded-[6px] border border-[#C6C0AF] bg-[#F7F5EF] px-4 py-3 outline-none text-[#313C2B] focus:bg-white transition-all duration-200"
                />
              </div>

              <div>
                <label
                  className="block text-[16px] text-[#313C2B] mb-2"
                  style={{ fontFamily: "noah-bold, sans-serif" }}
                >
                  CVV
                </label>

                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={3}
                  placeholder="123"
                  value={testPayment.cvv}
                  onChange={(e) =>
                    setTestPayment((prev) => ({
                    ...prev,
                    cvv: e.target.value.replace(/\D/g, "").slice(0, 3),
                  }))
                } 
                  className="w-full rounded-[6px] border border-[#C6C0AF] bg-[#F7F5EF] px-4 py-3 outline-none text-[#313C2B] focus:bg-white transition-all duration-200"
                />
              </div>

            </div>
          </div>
        )}

        {paymentMethod && (
          <div className="col-span-2 border-t border-[#C6C0AF] pt-6 mt-2">

            <div className="mb-6">
              <p
                className="text-[16px] text-[#313C2B] mb-4"
                style={{ fontFamily: "noah-bold, sans-serif" }}
              >
                Your sauna
              </p>

              <div className="flex justify-between gap-4">
                <div>
                  <p
                    className="text-[18px] text-[#313C2B]"
                    style={{ fontFamily: "noah-bold, sans-serif" }}
                  >
                    {orderItem.model_name}
                  </p>

                  <p
                    className="text-[16px] text-[#6D6A63] mt-1"
                    style={{ fontFamily: "noah-regular, sans-serif" }}
                  >
                    Quantity: {orderItem.quantity}
                  </p>
                </div>

                <p
                  className="text-[18px] text-[#313C2B]"
                  style={{ fontFamily: "noah-bold, sans-serif" }}
                >
                  ${Number(orderItem.base_price).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="border-t border-[#C6C0AF] pt-5 mb-6">
              <p
                className="text-[16px] text-[#313C2B] mb-4"
                style={{ fontFamily: "noah-bold, sans-serif" }}
              >
                Selected options
              </p>

              {orderItemOption.length > 0 ? (
                <div className="space-y-4">
                  {orderItemOption.map((option) => (
                    <div
                      key={`${option.option_group_id}-${option.option_value_id}`}
                      className="flex justify-between items-start gap-6"
                    >
                      <div>
                        {option.option_group_name && (
                          <p
                            className="text-[16px] text-[#6D6A63]"
                            style={{
                              fontFamily: "noah-regular, sans-serif",
                            }}
                          >
                            {option.option_group_name} : <span className="text-[15px] text-[#313C2B]" style={{ fontFamily: "noah-bold, sans-serif"}}>{option.option_name}</span>
                          </p>
                        )}
                      </div>

                      <p
                        className="text-[16px] text-[#313C2B] shrink-0"
                        style={{
                          fontFamily: "noah-bold, sans-serif",
                        }}
                      >
                        {Number(option.price) > 0
                          ? `+$${Number(option.price).toLocaleString()}`
                          : "Included"}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p
                  className="text-[16px] text-[#6D6A63]"
                  style={{ fontFamily: "noah-regular, sans-serif" }}
                >
                  No additional options selected.
                </p>
              )}
            </div>

            <div className="border-t border-[#C6C0AF] pt-5 mb-6">
              <p
                className="text-[16px] text-[#313C2B] mb-4"
                style={{ fontFamily: "noah-bold, sans-serif" }}
              >
                Delivery details
              </p>

              <div className="space-y-3">

                <div className="flex justify-between gap-6">
                  <span
                    className="text-[16px] text-[#6D6A63]"
                    style={{ fontFamily: "noah-regular, sans-serif" }}
                  >
                    Name
                  </span>

                  <span
                    className="text-[16px] text-[#313C2B] text-right"
                    style={{ fontFamily: "noah-bold, sans-serif" }}
                  >
                    {customerOrder.name}
                  </span>
                </div>

                <div className="flex justify-between gap-6">
                  <span
                    className="text-[16px] text-[#6D6A63]"
                    style={{ fontFamily: "noah-regular, sans-serif" }}
                  >
                    Email
                  </span>

                  <span
                    className="text-[16px] text-[#313C2B] text-right"
                    style={{ fontFamily: "noah-bold, sans-serif" }}
                  >
                    {customerOrder.email}
                  </span>
                </div>

                {customerOrder.phone && (
                  <div className="flex justify-between gap-6">
                    <span
                      className="text-[16px] text-[#6D6A63]"
                      style={{ fontFamily: "noah-regular, sans-serif" }}
                    >
                      Phone
                    </span>

                    <span
                      className="text-[16px] text-[#313C2B] text-right"
                      style={{ fontFamily: "noah-bold, sans-serif" }}
                    >
                      {customerOrder.phone}
                    </span>
                  </div>
                )}

                <div className="flex justify-between gap-6">
                  <span
                    className="text-[16px] text-[#6D6A63]"
                    style={{ fontFamily: "noah-regular, sans-serif" }}
                  >
                    Country
                  </span>

                  <span
                    className="text-[16px] text-[#313C2B] text-right"
                    style={{ fontFamily: "noah-bold, sans-serif" }}
                  >
                    {customerOrder.country}
                  </span>
                </div>

                <div className="flex justify-between gap-6">
                  <span
                    className="text-[16px] text-[#6D6A63]"
                    style={{ fontFamily: "noah-regular, sans-serif" }}
                  >
                    City
                  </span>

                  <span
                    className="text-[16px] text-[#313C2B] text-right"
                    style={{ fontFamily: "noah-bold, sans-serif" }}
                  >
                    {customerOrder.city}
                  </span>
                </div>

                <div className="flex justify-between gap-6">
                  <span
                    className="text-[16px] text-[#6D6A63]"
                    style={{ fontFamily: "noah-regular, sans-serif" }}
                  >
                    Postal Code
                  </span>

                  <span
                    className="text-[16px] text-[#313C2B] text-right"
                    style={{ fontFamily: "noah-bold, sans-serif" }}
                  >
                    {customerOrder.postalCode}
                  </span>
                </div>

                <div className="flex justify-between gap-6">
                  <span
                    className="text-[16px] text-[#6D6A63]"
                    style={{ fontFamily: "noah-regular, sans-serif" }}
                  >
                    Address
                  </span>

                  <span
                    className="text-[16px] text-[#313C2B] text-right"
                    style={{ fontFamily: "noah-bold, sans-serif" }}
                  >
                    {customerOrder.address}
                  </span>
                </div>

                {customerOrder.apartment && (
                  <div className="flex justify-between gap-6">
                    <span
                      className="text-[16px] text-[#6D6A63]"
                      style={{ fontFamily: "noah-regular, sans-serif" }}
                    >
                      Apartment
                    </span>

                    <span
                      className="text-[16px] text-[#313C2B] text-right"
                      style={{ fontFamily: "noah-bold, sans-serif" }}
                    >
                      {customerOrder.apartment}
                    </span>
                  </div>
                )}

                {customerOrder.deliveryNotes && (
                  <div className="flex justify-between items-start gap-6">
                    <p
                      className="text-[16px] text-[#6D6A63]"
                      style={{ fontFamily: "noah-regular, sans-serif" }}
                    >
                      Delivery Notes
                    </p>

                    <p
                      className="text-[16px] text-[#313C2B] mt-1"
                      style={{ fontFamily: "noah-bold, sans-serif" }}
                    >
                      {customerOrder.deliveryNotes}
                    </p>
                  </div>
                )}

              </div>
            </div>

            <div className="border-t border-[#C6C0AF] pt-5 space-y-3">

              <div className="flex justify-between">
                <span
                  className="text-[16px] text-[#6D6A63]"
                  style={{ fontFamily: "noah-regular, sans-serif" }}
                >
                  Sauna
                </span>

                <span
                  className="text-[16px] text-[#313C2B]"
                  style={{ fontFamily: "noah-bold, sans-serif" }}
                >
                  ${Number(orderItem.base_price).toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between">
                <span
                  className="text-[16px] text-[#6D6A63]"
                  style={{ fontFamily: "noah-regular, sans-serif" }}
                >
                  Options
                </span>

                <span
                  className="text-[16px] text-[#313C2B]"
                  style={{ fontFamily: "noah-bold, sans-serif" }}
                >
                  ${Number(orderItem.options_price).toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between">
                <span
                  className="text-[16px] text-[#6D6A63]"
                  style={{ fontFamily: "noah-regular, sans-serif" }}
                >
                  Delivery
                </span>

                <span
                  className="text-[16px] text-[#313C2B]"
                  style={{ fontFamily: "noah-bold, sans-serif" }}
                >
                  {Number(customerOrder.deliveryPrice) > 0
                    ? `$${Number(
                        customerOrder.deliveryPrice
                      ).toLocaleString()}`
                    : "Free"}
                </span>
              </div>

              <div className="flex justify-between border-t border-[#C6C0AF] pt-4">
                <span
                  className="text-[21px] text-[#313C2B]"
                  style={{ fontFamily: "noah-bold, sans-serif" }}
                >
                  Total
                </span>

                <span
                  className="text-[21px] text-[#313C0B]"
                  style={{ fontFamily: "noah-bold, sans-serif" }}
                >
                  $
                  {(
                    Number(orderItem.base_price) +
                    Number(orderItem.options_price) +
                    Number(customerOrder.deliveryPrice)
                  ).toLocaleString()}{" "}
                  {orderItem.currency}
                </span>
              </div>

            </div>

            <div className="mt-6 rounded-[8px] bg-[#F7F5F0] border border-[#C6C0AF] p-4">
              <p
                className="text-[16px] text-[#313C2B]"
                style={{ fontFamily: "noah-bold, sans-serif" }}
              >
                Payment method
              </p>

              <p
                className="text-[16px] text-[#6D6A63] mt-1"
                style={{ fontFamily: "noah-regular, sans-serif" }}
              >
                {paymentMethod === "pay_on_delivery"
                  ? "Pay at home when the sauna is delivered."
                  : "Test card payment."}
              </p>
            </div>

            <div className="flex gap-4 pt-6">
            <button type="button" onClick={onBack} className="w-full py-4 rounded-[8px] bg-[#313C2B] text-[#F7F5EF] hover:bg-[#778658] transition-colors duration-300 cursor-pointer mt-4" style={{ fontFamily: "noah-bold, sans-serif" }}>
              Back
            </button>

            <button type="button" onClick={onPay} disabled={isSubmitting} className="w-full py-4 rounded-[8px] bg-[#313C2B] text-[#F7F5EF] hover:bg-[#778658] transition-colors duration-300 cursor-pointer mt-4" style={{ fontFamily: "noah-bold, sans-serif" }}>
              {isSubmitting ? "Processing..." : paymentMethod === "online_card" ? "Pay Now" : "Place Order"}
            </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}