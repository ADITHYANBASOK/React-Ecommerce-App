function ProductSort({ currentSort, onSortChange }) {
  return (
    <div className="flex items-center space-x-2">
      <label htmlFor="sort" className="text-gray-600">
        Sort by:
      </label>
      <select
        id="sort"
        value={currentSort}
        onChange={(e) => onSortChange(e.target.value)}
        className="border border-gray-300 rounded-md py-1 px-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="default">Default</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="name-asc">Name: A to Z</option>
        <option value="name-desc">Name: Z to A</option>
      </select>
    </div>
  );
}

export default ProductSort;