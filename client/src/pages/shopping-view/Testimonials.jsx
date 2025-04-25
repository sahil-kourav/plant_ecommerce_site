import React, { useRef, useEffect } from "react";
import { Star, MoveLeft, MoveRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";

const testimonials = [
  {
    name: "Emily",
    text: `I bought an indoor plant from Vrakshearth, and it's thriving in my home. The customer service was excellent, and I will definitely be purchasing more!`,
    images: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Sneha Verma",
    text: `I ordered a set of indoor plants and was amazed by the quality! The packaging was super secure and the plants arrived fresh and vibrant.`,
    images:
      "https://d187goyob322lh.cloudfront.net/Pictures/480xAny/0/6/4/7064_Church_failing.png",
  },
  {
    name: "Priya",
    text: `I love the variety available at Vrakshearth. Their sustainability efforts also make me feel good about every purchase.`,
    images:
      "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    name: "Ajay Mehta",
    text: `Absolutely love the variety they offer! From succulents to flowering plants, everything is so easy to choose and order.`,
    images:
      "https://static.vecteezy.com/system/resources/thumbnails/026/408/485/small/man-lifestyle-portrait-hipster-serious-t-shirt-isolated-person-white-background-american-smile-confident-fashion-photo.jpg",
  },
  {
    name: "Amit Trivedi",
    text: `Customer support is amazing. I had a small issue with my order and they resolved it quickly and politely. That kind of service builds trust.`,
    images:
      "https://img.freepik.com/free-photo/portrait-young-african-man-profile_176420-12620.jpg?semt=ais_hybrid&w=740",
  },
];

export default function Testimonials() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className="text-center py-12 px-4 bg-white">
      <h2 className="text-3xl sm:text-3xl font-semibold text-green-900 mb-10">
      Loved by Plant Lovers
      </h2>

      <div className="relative max-w-3xl mx-auto">
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
          autoplay={{ delay: 1600, disableOnInteraction: false }}
          modules={[Autoplay]}
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="flex flex-col items-center">
                <img
                  src={testimonial.images}
                  alt={testimonial.name}
                  className="w-20 h-20 rounded-full object-cover mb-4"
                />
                <div className="flex justify-center mb-4 text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={20} fill="currentColor" />
                  ))}
                </div>
                <p className="text-gray-700 text-base leading-relaxed px-4">
                  “{testimonial.text}”
                </p>
                <p className="mt-4 italic text-sm text-gray-600">
                  – {testimonial.name}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
