const TrustLogos = () => {
  const companies = [
    { name: "Grab", logo: "GRAB" },
    { name: "DBS", logo: "DBS" },
    { name: "Shopee", logo: "SHOPEE" },
    { name: "Carousell", logo: "CAROUSELL" },
    { name: "Govtech", logo: "GOVTECH" },
    { name: "Singtel", logo: "SINGTEL" }
  ];

  return (
    <section className="py-20">
      <div className="text-center mb-12">
        <h2 className="text-2xl font-bold text-gray-400">Trusted by 1,000+ Companies in SG</h2>
      </div>
      <div className="flex justify-center items-center gap-16">
        {companies.map((company, index) => (
          <div
            key={index}
            className="text-gray-400 font-bold text-xl opacity-50 hover:opacity-75 transition-opacity"
          >
            {company.logo}
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrustLogos; 