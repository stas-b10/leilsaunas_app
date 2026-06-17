export default function LeafIcon({ className = "" }) {
  return (
    <div
      className={`bg-[#707F4F] w-4 h-4 ${className}`}
      style={{
        borderRadius:
          "100% 0% 100% 100% / 100% 0% 100% 100%",
        transform: "rotate(275deg)",
        boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
      }}
    />
  );
}