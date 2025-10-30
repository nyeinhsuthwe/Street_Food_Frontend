// components/Category.tsx
import React, { useState, useEffect } from 'react';

// Type definitions
interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  isPopular: boolean;
}

interface Category {
  id: string;
  name: string;
}

export const UserMenu: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState<boolean>(true);

  // Mock data - replace with API calls
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockCategories: Category[] = [
        { id: 'all', name: 'All Items' },
        { id: 'appetizers', name: 'Appetizers' },
        { id: 'main-courses', name: 'Main Courses' },
        { id: 'desserts', name: 'Desserts' },
        { id: 'beverages', name: 'Beverages' },
      ];

      const mockMenuItems: MenuItem[] = [
        {
          id: 1,
          name: 'Margherita Pizza',
          description: 'Classic pizza with tomato sauce, mozzarella, and basil',
          price: 12.99,
          category: 'main-courses',
          image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400&h=300&fit=crop',
          isPopular: true
        },
        {
          id: 2,
          name: 'Garlic Bread',
          description: 'Toasted bread with garlic butter and herbs',
          price: 5.99,
          category: 'appetizers',
          image: 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?w=400&h=300&fit=crop',
          isPopular: true
        },
        {
          id: 3,
          name: 'Caesar Salad',
          description: 'Fresh romaine lettuce with Caesar dressing and croutons',
          price: 8.99,
          category: 'appetizers',
          image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop',
          isPopular: false
        },
        {
          id: 4,
          name: 'Chocolate Lava Cake',
          description: 'Warm chocolate cake with molten center, served with ice cream',
          price: 7.99,
          category: 'desserts',
          image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400&h=300&fit=crop',
          isPopular: true
        },
        {
          id: 5,
          name: 'Iced Coffee',
          description: 'Chilled coffee with milk and sweetener',
          price: 3.99,
          category: 'beverages',
          image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop',
          isPopular: false
        },
        {
          id: 6,
          name: 'Grilled Salmon',
          description: 'Fresh salmon fillet with lemon butter sauce',
          price: 18.99,
          category: 'main-courses',
          image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop',
          isPopular: true
        },
      ];

      setCategories(mockCategories);
      setMenuItems(mockMenuItems);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredItems = selectedCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  const popularItems = menuItems.filter(item => item.isPopular);

  const handleAddToCart = (item: MenuItem) => {
    // Implement add to cart functionality
    console.log('Added to cart:', item);
    // You can integrate with your cart context or state management here
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Delicious Menu</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover our wide variety of dishes made with the freshest ingredients
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-6 py-3 rounded-full font-medium transition-colors duration-200 ${
              selectedCategory === category.id
                ? 'bg-red-500 text-white'
                : 'bg-white text-red-500 border border-red-500 hover:bg-red-50'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Menu Items Grid */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          {selectedCategory === 'all' ? 'All Menu Items' : categories.find(c => c.id === selectedCategory)?.name}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                {item.isPopular && (
                  <span className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-medium">
                    Popular
                  </span>
                )}
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">{item.name}</h3>
                  <span className="text-lg font-bold text-red-500">${item.price.toFixed(2)}</span>
                </div>
                
                <p className="text-gray-600 mb-4 line-clamp-2">{item.description}</p>
                
                <button
                  onClick={() => handleAddToCart(item)}
                  className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors duration-200 font-medium"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No items found in this category.</p>
          </div>
        )}
      </div>

      {/* Popular Items Section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          Popular Choices
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {popularItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                <span className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-medium">
                  Popular
                </span>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">{item.name}</h3>
                  <span className="text-lg font-bold text-red-500">${item.price.toFixed(2)}</span>
                </div>
                
                <p className="text-gray-600 mb-4">{item.description}</p>
                
                <button
                  onClick={() => handleAddToCart(item)}
                  className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors duration-200 font-medium"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {popularItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No popular items available.</p>
          </div>
        )}
      </div>
    </div>
  );
};

