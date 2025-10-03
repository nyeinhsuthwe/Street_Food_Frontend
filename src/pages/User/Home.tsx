import React from "react";
import {
  FaStar,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";

const Home: React.FC = () => {
  return (
    <div className="bg-[#FFF5E1] min-h-screen font-sans">

      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600891964599-f61ba0e24092')" }}>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center text-white px-6">
          <h1 className="text-4xl md:text-6xl font-bold">
            Fresh, Fast & <span className="text-[#F4A261]">Street Delicious</span>
          </h1>
          <p className="mt-4 text-lg max-w-xl mx-auto">
            The best bites from the street, served hot & tasty. Grab your favorites and satisfy your cravings!
          </p>
          <button className="mt-6 bg-[#E63946] text-white px-8 py-3 rounded-full shadow-lg hover:bg-[#F4A261] transition font-semibold">
            Order Now
          </button>
        </div>
      </section>

      {/* Popular Picks */}
      <section className="mt-16 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-[#3D2C2E]">Popular Picks</h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          
          {/* Card */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition">
            <img src="/img/cheesepizza.jpg"
              alt="Pizza" className="w-full h-48 object-cover" />
            <div className="p-6 text-center">
              <h3 className="font-bold text-lg text-[#3D2C2E]">Cheesy Pizza</h3>
              <p className="text-[#3D2C2E] text-sm mt-2">Loaded with melting cheese & fresh toppings.</p>
              <div className="mt-3 flex items-center justify-center gap-1 text-[#F4A261]">
                <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition">
            <img src="/img/chicken.jpg"
              alt="Chicken" className="w-full h-48 object-cover" />
            <div className="p-6 text-center">
              <h3 className="font-bold text-lg text-[#3D2C2E]">Crispy Chicken</h3>
              <p className="text-[#3D2C2E] text-sm mt-2">Golden fried, juicy, and seasoned to perfection.</p>
              <div className="mt-3 flex items-center justify-center gap-1 text-[#F4A261]">
                <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition">
            <img src="/img/corndog.jpg"
              alt="Dessert" className="w-full h-48 object-cover" />
            <div className="p-6 text-center">
              <h3 className="font-bold text-lg text-[#3D2C2E]">Sweet Treats</h3>
              <p className="text-[#3D2C2E] text-sm mt-2">Cool off with creamy, delightful desserts.</p>
              <div className="mt-3 flex items-center justify-center gap-1 text-[#F4A261]">
                <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="mt-20 px-6 py-16 bg-[#FFF5E1]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <img src="https://images.unsplash.com/photo-1543353071-873f17a7a088"
            alt="Street Food" className="rounded-2xl shadow-lg" />
          <div>
            <h2 className="text-3xl font-bold text-[#3D2C2E]">Street Food, Reimagined</h2>
            <p className="mt-4 text-lg text-[#3D2C2E]">
              We bring the vibrant flavors of the street straight to your plate. Made with love, served with fun!
            </p>
            <button className="mt-6 bg-[#E63946] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#F4A261] transition font-semibold">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
