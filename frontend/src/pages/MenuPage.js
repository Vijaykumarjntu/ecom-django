import { useState, useEffect } from 'react';
import { useMenu } from '../context/MenuContext';
// import { useEffect } from 'react';

// import { useMenu } from '../context/MenuContext';

export default function MenuPage() {
    const { menuItems, loading, fetchMenuItems, searchMenuItems } = useMenu();
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = () => {
      if (searchTerm.trim()) {
        searchMenuItems(searchTerm);
      } else {
        fetchMenuItems(); // If empty, show all items
      }
    };

    useEffect(() => {
      console.log("this is the fetch function we are getting from the context")
      console.log(fetchMenuItems);
      fetchMenuItems();
      console.log("this is the search function we are getting from the")
      console.log(searchMenuItems);
    }, []);

    if (loading) {
      return <div className="text-center py-10">Loading menu...</div>;
    }

    return (
      <div>
        <h2 className="text-2xl font-bold mb-4">Menu Items</h2>
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="Search menu items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 border rounded-lg px-4 py-2"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Search
          </button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {menuItems.map(item => (
            <div key={item.id} className="border p-4 rounded">
              <h3 className="font-bold">{item.name}</h3>
              <p>${item.price}</p>
            </div>
          ))}
        </div>
      </div>
    );
}