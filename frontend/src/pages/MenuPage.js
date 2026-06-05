import { useState, useEffect } from 'react';
import { useMenu } from '../context/MenuContext';
// import { useEffect } from 'react';

// import { useMenu } from '../context/MenuContext';

export default function MenuPage() {
    const { menuItems, loading, fetchMenuItems, searchMenuItems, addMenuItem,updateMenuItem,deleteMenuItem } = useMenu();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
      name: '',
      price: '',
      category: 'main_course',
      description: ''
    });
    const [editingItem, setEditingItem] = useState(null);
    const handleSearch = () => {
      // if (searchTerm.trim()) {
      //   console.log("if block working");
      //   searchMenuItems(searchTerm);
      // } else {
      //   console.log("else block working");
      //   fetchMenuItems(); // If empty, show all items
      // }
      applyFilters();
    };

    const applyFilters = () => {
      const filters = {};
      if (searchTerm.trim()) filters.search = searchTerm.trim();
      if (selectedCategory) filters.category = selectedCategory;
      fetchMenuItems(filters);
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
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Menu Items</h2>
          <button
            onClick={() => setShowModal(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            + Add Menu Item
          </button>
        </div>
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
            disabled={loading}
            className={`bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              // Auto-apply filter when category changes
              const filters = {};
              if (searchTerm.trim()) filters.search = searchTerm.trim();
              if (e.target.value) filters.category = e.target.value;
              fetchMenuItems(filters);
            }}
            className="border rounded-lg px-4 py-2"
          >
            <option value="">All Categories</option>
            <option value="starters">Starters</option>
            <option value="main_course">Main Course</option>
            <option value="desserts">Desserts</option>
            <option value="beverages">Beverages</option>
          </select>
          {searchTerm && (
            <button
               onClick={() => {
                setSearchTerm('');
                setSelectedCategory('');
                fetchMenuItems();
              }}
              disabled={loading}
              className={`bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              Clear
            </button>
          )}
          
        </div>
        {/* <div className="grid grid-cols-3 gap-4">
          {menuItems.map(item => (
            <div key={item.id} className="border p-4 rounded">
              <h3 className="font-bold">{item.name}</h3>
              <p>${item.price}</p>
            </div>
          ))}
        </div> */}

        <h2 className="text-2xl font-bold mb-4">Menu Items</h2>

        {loading ? (
          <div className="text-center py-10">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2">Loading menu...</p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {menuItems.map(item => (
              <div key={item.id} className="border p-4 rounded">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-lg">{item.name}</h3>
                  <div className="flex gap-1">
                    <button
                      onClick={() => {
                        setEditingItem(item);
                        setFormData({
                          name: item.name,
                          price: item.price.toString(),
                          category: item.category,
                          description: item.description || ''
                        });
                        setShowModal(true);
                      }}
                      className="text-blue-600 hover:text-blue-800 px-2"
                      title="Edit"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={async () => {
                        if (window.confirm(`Delete "${item.name}"?`)) {
                          await deleteMenuItem(item.id);
                        }
                      }}
                      className="text-red-600 hover:text-red-800 px-2"
                      title="Delete"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
                <p className="text-gray-600">${item.price}</p>
                <p className="text-sm text-gray-500 capitalize">{item.category.replace('_', ' ')}</p>
                {item.description && (
                  <p className="text-sm text-gray-400 mt-1">{item.description}</p>
                )}
              </div>
            ))}
          </div>
        )}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-96 max-w-full">
              <h2 className="text-xl font-bold mb-4">
                {editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}
              </h2>
              
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2"
                />
                
                <input
                  type="number"
                  placeholder="Price"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2"
                />
                
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2"
                >
                  <option value="starters">Starters</option>
                  <option value="main_course">Main Course</option>
                  <option value="desserts">Desserts</option>
                  <option value="beverages">Beverages</option>
                </select>
                
                <textarea
                  placeholder="Description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2"
                  rows="3"
                />
              </div>
              
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => {
                    setShowModal(false);
                    setEditingItem(null);
                    setFormData({ name: '', price: '', category: 'main_course', description: '' });
                  }}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={async () => {
                    if (!formData.name || !formData.price) {
                      alert('Name and price are required');
                      return;
                    }
                    
                    if (editingItem) {
                      await updateMenuItem(editingItem.id, {
                        name: formData.name,
                        price: parseFloat(formData.price),
                        category: formData.category,
                        description: formData.description
                      });
                    } else {
                      await addMenuItem({
                        name: formData.name,
                        price: parseFloat(formData.price),
                        category: formData.category,
                        description: formData.description
                      });
                    }
                    
                    setShowModal(false);
                    setEditingItem(null);
                    setFormData({ name: '', price: '', category: 'main_course', description: '' });
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {editingItem ? 'Update' : 'Save'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
}