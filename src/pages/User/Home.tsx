import React from "react";
import {FaStar,} from "react-icons/fa";
import { colors } from "../../constant/color";

const Home: React.FC = () => {
  return (
    <div
      className="min-h-screen font-sans bg-white"
      style={{ color: colors.text }}
    >
      {/* Hero Section */}
      <section
        className="relative h-[80vh] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1600891964599-f61ba0e24092')",
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center text-white px-6">
          <h1 className="text-4xl md:text-6xl font-bold">
            Fresh, Fast &{" "}
            <span style={{ color: colors.accent }}>Street Delicious</span>
          </h1>
          <p className="mt-4 text-lg max-w-xl mx-auto">
            The best bites from the street, served hot & tasty. Grab your
            favorites and satisfy your cravings!
          </p>
          <button
            className="mt-6 px-8 py-3 rounded-full shadow-lg font-semibold transition"
            style={{
              backgroundColor: colors.accent,
              color: colors.white,
            }}
          >
            Order Now
          </button>
        </div>
      </section>

      {/* Popular Picks */}
      <section className="mt-16 px-6 max-w-7xl mx-auto">
        <h2
          className="text-3xl font-bold text-center"
          style={{ color: colors.text }}
        >
          Popular Picks
        </h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Card */}
          {[
            {
              img: "/img/cheesepizza.jpg",
              title: "Cheesy Pizza",
              desc: "Loaded with melting cheese & fresh toppings.",
            },
            {
              img: "/img/chicken.jpg",
              title: "Crispy Chicken",
              desc: "Golden fried, juicy, and seasoned to perfection.",
            },
            {
              img: "/img/corndog.jpg",
              title: "Sweet Treats",
              desc: "Cool off with creamy, delightful desserts.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="rounded-2xl shadow-lg bg-white overflow-hidden hover:scale-105 transition"
             
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6 text-center">
                <h3 className="font-bold text-lg" style={{ color: colors.text }}>
                  {item.title}
                </h3>
                <p className="text-sm mt-2" style={{ color: colors.text }}>
                  {item.desc}
                </p>
                <div
                  className="mt-3 flex items-center justify-center gap-1"
                  style={{ color: colors.accent }}
                >
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Home;
