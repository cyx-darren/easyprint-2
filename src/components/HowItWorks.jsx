const StepCard = ({ icon, title, description }) => {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg">
      <div className="w-16 h-16 flex items-center justify-center text-3xl mb-6 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const HowItWorks = () => {
  const steps = [
    {
      icon: "🎨",
      title: "Upload Your Logo",
      description: "Drag and drop or upload your brand assets."
    },
    {
      icon: "✨",
      title: "Approve Your Mockup",
      description: "Get a realistic preview – no surprises."
    },
    {
      icon: "📦",
      title: "We Handle the Rest",
      description: "Gifts packed, branded, and delivered to your team or clients."
    }
  ];

  return (
    <section className="py-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">From Idea to Delivery in 3 Simple Steps</h2>
        <p className="text-gray-600">We make corporate gifting easy and efficient</p>
      </div>
      <div className="grid grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <StepCard key={index} {...step} />
        ))}
      </div>
    </section>
  );
};

export default HowItWorks; 