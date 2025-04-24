const Testimonials = () => {
  return (
    <section className="py-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">They Said It Best</h2>
      </div>
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl p-8 shadow-lg relative">
          {/* Speech bubble triangle */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-white transform rotate-45" />
          
          <blockquote className="text-xl text-gray-600 text-center mb-6">
            "Easyprint 2.0 made corporate gifting a breeze. Their platform is intuitive, and the team is incredibly responsive. We've been able to scale our gifting program effortlessly."
          </blockquote>
          
          <div className="flex items-center justify-center gap-4 relative z-10">
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
              👤
            </div>
            <div className="text-left">
              <p className="font-semibold">Sarah Chen</p>
              <p className="text-sm text-gray-500">Head of People Operations, TechCorp</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 