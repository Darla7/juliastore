const Newsletter = () => {
  return (
    <section className="py-16 bg-emerald-50">
      <div className="max-w-xl mx-auto text-center px-4">
        <h2 className="text-3xl font-bold mb-4">
          Subscribe to Our Newsletter
        </h2>

        <p className="text-gray-600 mb-6">
          Get updates on new products and special offers
        </p>

        <div className="flex gap-2">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />

          <button className="bg-emerald-600 text-white px-6 py-3 rounded-md hover:bg-emerald-700 transition">
            Subscribe
          </button>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
