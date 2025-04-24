const NewProjectCard = () => {
  const items = [
    { icon: "🥤", name: "Tumbler", status: "In review" },
    { icon: "📓", name: "Recycled Notebook", status: "Pending" },
    { icon: "👕", name: "Polo Shirt", status: "Pending" }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 w-[300px]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg">New Project</h3>
        <button className="text-gray-400">•••</button>
      </div>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-3">
            <span className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-lg">
              {item.icon}
            </span>
            <div className="flex-1">
              <p className="text-sm font-medium">{item.name}</p>
              <p className="text-xs text-gray-500">{item.status}</p>
            </div>
            <div className="w-2 h-2 rounded-full bg-blue-400" />
          </div>
        ))}
      </div>
    </div>
  );
};

const HeroSection = () => {
  return (
    <section className="py-20">
      <div className="grid grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <h1 className="text-6xl font-bold leading-tight">
            The Smartest Way to Automate Corporate Gifting
          </h1>
          <p className="text-xl text-gray-600">
            Corporate swag. Personalized gifts. Delivered at scale. All in one platform.
          </p>
          <div className="flex gap-4">
            <button className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:shadow-lg transition-shadow">
              Start a Project
            </button>
            <button className="px-8 py-3 rounded-full border-2 border-gray-200 text-gray-700 font-medium hover:border-gray-300 transition-colors">
              Explore Products
            </button>
          </div>
        </div>
        <div className="flex justify-end">
          <NewProjectCard />
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 