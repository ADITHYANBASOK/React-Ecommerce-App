function CategorySidebar({ categories, currentCategory, onCategoryChange }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Categories</h2>
      <ul className="space-y-2">
        <li>
          <button
            onClick={() => onCategoryChange('all')}
            className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
              currentCategory === 'all'
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            All Products
          </button>
        </li>
        {categories.map(category => (
          <li key={category}>
            <button
              onClick={() => onCategoryChange(category)}
              className={`w-full text-left px-3 py-2 rounded-md transition-colors capitalize ${
                currentCategory === category
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {category}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategorySidebar;