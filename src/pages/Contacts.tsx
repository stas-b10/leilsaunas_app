export default function Contacts() {
  return (
    <div className="min-h-screen bg-[#F7F5F0] text-black">
      
      {/* Header / Contact section */}
      <section className="px-6 py-20 max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Contact Us</h1>

        <p className="text-lg opacity-80 leading-relaxed">
          If you have any questions, feel free to reach out. We usually respond within 24 hours.
        </p>

        {/* Example contact info */}
        <div className="mt-10 space-y-2 text-lg">
          <p>Email: contact@yourwebsite.com</p>
          <p>Phone: +373 00 000 000</p>
          <p>Location: Chișinău, Moldova</p>
        </div>
      </section>

      <section
        id="map"
        className="h-[500px] w-full bg-gray-300 flex items-center justify-center"
      >
        <p className="text-xl font-semibold opacity-70">
          Map goes here
        </p>
      </section>

    </div>
  );
}