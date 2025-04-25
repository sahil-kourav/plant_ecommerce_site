    import React from "react";

    const testimonials = [
      {
        name: "Emily",
        title: "Happy Customer",
        text: "I bought an indoor plant from Vrakshearth, and it's thriving in my home. The customer service was excellent, and I will definitely be purchasing more!",
        image: "https://randomuser.me/api/portraits/women/44.jpg", // replace with exact image if needed
      },
      {
        name: "Arjun",
        title: "First-Time Buyer",
        text: "Excellent packaging and beautiful plants. The instructions included helped me take care of my first plant easily.",
        image: "https://randomuser.me/api/portraits/men/32.jpg",
      },
      {
        name: "Priya",
        title: "Loyal Customer",
        text: "I love the variety available at Vrakshearth. Their sustainability efforts also make me feel good about every purchase.",
        image: "https://randomuser.me/api/portraits/women/68.jpg",
      },
    ];
    
    export default function AboutusPage() {
      return (
        <section className="px-4 py-10 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-semibold text-green-900 mb-4">
              Our Commitment to Sustainability
            </h2>
            <p className="text-gray-700 mb-10">
              At Vrakshearth, we are committed to reducing our environmental impact.
              We use eco-friendly packaging materials and source our plants from
              local, sustainable growers.
            </p>
    
            <h3 className="text-lg font-semibold text-green-900 mb-6">
              Customer Testimonials
            </h3>
    
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-white border border-green-100 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="text-left">
                  <p className="font-semibold text-green-900">{t.name}</p>
                  <p className="text-sm text-green-700 italic">{t.title}</p>
                </div>
              </div>
              <p className="text-gray-800 text-sm leading-relaxed">
                “{t.text}”
              </p>
            </div>
          ))}
        </div>
    
            <div>
              <h3 className="text-lg font-semibold text-green-900 mb-2">
                Ready to add greenery to your home?
              </h3>
              <p className="text-gray-700">
                Browse our wide variety of indoor plants today!
              </p>
            </div>
          </div>
        </section>
      );
    }
    