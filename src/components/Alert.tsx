import { IoCheckmarkCircle } from "react-icons/io5";

interface AlertProps {
  onClose: () => void;
}

export default function Alert({ onClose }: AlertProps) {
  return (
    <div className="fixed inset-0 z-[10000] bg-black/40 flex items-center justify-center">
      <div className="relative w-[500px] bg-[#F7F5EF] rounded-[10px] border border-[#AFC5A5] p-7 shadow-lg">

        <div className="flex items-start gap-4">
          <IoCheckmarkCircle className="text-[#7A9A6A] text-[32px] mt-1 flex-shrink-0" />
          <div className="flex-1">
            <h3
              className="text-[22px] text-[#4F7045]"
              style={{ fontFamily: "noah-bold, sans-serif" }}
            >
              Success
            </h3>

            <p
              className="text-[17px] text-[#313C2B] mt-2 leading-relaxed"
              style={{ fontFamily: "noah-regular, sans-serif" }}
            >
              You successfully sent a reseller request. Please wait for
              someone to contact you.
            </p>

            <div className="flex justify-end mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-6 h-[40px] rounded-[6px] bg-[#313C2B] text-white cursor-pointer"
                style={{ fontFamily: "noah-bold, sans-serif" }}
              >
                Close
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}