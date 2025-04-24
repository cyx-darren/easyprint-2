const CategoryCard = ({ icon, title, bgColor }) => {
  return (
    <div className={`${bgColor} rounded-2xl p-8 transition-transform hover:-translate-y-1`}>
      <div className="w-16 h-16 flex items-center justify-center text-3xl mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
    </div>
  );
};

const ProductCategories = () => {
  const categories = [
    {
      icon: "💻",
      title: "Tech Gifts",
      bgColor: "bg-blue-50"
    },
    {
      icon: "🌱",
      title: "Eco Gifts",
      bgColor: "bg-green-50"
    },
    {
      icon: "👕",
      title: "Custom Apparel",
      bgColor: "bg-teal-50"
    },
    {
      icon: "🍫",
      title: "Gourmet Treats",
      bgColor: "bg-pink-50"
    }
  ];

  return (
    <section className="py-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Product Categories</h2>
        <p className="text-gray-600">Find the perfect gifts for your team or clients</p>
      </div>
      <div className="grid grid-cols-4 gap-8">
        {categories.map((category, index) => (
          <CategoryCard key={index} {...category} />
        ))}
      </div>
    </section>
  );
};

export default ProductCategories; 