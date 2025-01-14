import { useEffect, useMemo, useState } from 'react';
import { getProducts } from '../services/api';
// eslint-disable-next-line no-unused-vars
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [stockFilter, setStockFilter] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        const processedData = data.map((item) => ({
          ...item,
          searchableText: `${item.name.toLowerCase()} ${item.price} ${item.stock}`,
          priceCategory: item.price < 50 ? 'cheap' : item.price < 100 ? 'medium' : 'expensive',
          stockStatus: item.stock === 0 ? 'out' : item.stock < 10 ? 'low' : 'available'
        }));
        setProducts(processedData);
      } catch (err) {
        setError('Failed to load products');
        console.error(err);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    const searchFiltered = products.filter((product) => {
      if (!searchTerm) return true;

      const searchWords = searchTerm.toLowerCase().split(' ');

      const searchableWords = product.searchableText.split(' ');

      return searchWords.every((searchWord) =>
        searchableWords.some((word) => {
          const normalizedWord = word.toLowerCase().trim();
          const normalizedSearch = searchWord.toLowerCase().trim();

          // Levenshtein distance calculation for fuzzy matching
          const distance = Array(normalizedWord.length + 1)
            .fill(null)
            .map(() => Array(normalizedSearch.length + 1).fill(null));

          for (let i = 0; i <= normalizedWord.length; i++) {
            distance[i][0] = i;
          }

          for (let j = 0; j <= normalizedSearch.length; j++) {
            distance[0][j] = j;
          }

          for (let i = 1; i <= normalizedWord.length; i++) {
            for (let j = 1; j <= normalizedSearch.length; j++) {
              const cost = normalizedWord[i - 1] === normalizedSearch[j - 1] ? 0 : 1;

              distance[i][j] = Math.min(distance[i - 1][j] + 1, distance[i][j - 1] + 1, distance[i - 1][j - 1] + cost);
            }
          }

          // Allow for fuzzy matching with a threshold
          return distance[normalizedWord.length][normalizedSearch.length] <= 2;
        })
      );
    });

    const priceFiltered = searchFiltered.filter((product) => {
      if (!priceFilter) return true;

      const price = parseFloat(product.price);
      switch (priceFilter) {
        case 'low':
          return price < 50 && product.priceCategory === 'cheap';
        case 'medium':
          return price >= 50 && price < 100 && product.priceCategory === 'medium';
        case 'high':
          return price >= 100 && product.priceCategory === 'expensive';
        default:
          return true;
      }
    });

    return priceFiltered.filter((product) => {
      if (!stockFilter) return true;

      const stockNum = parseInt(product.stock);

      switch (stockFilter) {
        case 'out':
          return stockNum === 0 && product.stockStatus === 'out';
        case 'low':
          return stockNum > 0 && stockNum < 10 && product.stockStatus === 'low';
        case 'available':
          return stockNum >= 10 && product.stockStatus === 'available';
        default:
          return true;
      }
    });
  }, [products, searchTerm, priceFilter, stockFilter]);

  return (
    <div className="p-5">
      {/* Header Section */}
      <div className="mb-5 flex items-center justify-between">
        <h2>Products</h2>
        <Link to="/add-product">
          <button
            className="rounded-md px-5 py-2 text-white"
            style={{
              backgroundColor: '#4c8250'
            }}
          >
            Add Product
          </button>
        </Link>
      </div>
      {/* Filters Section */}
      <div className="mb-5 flex gap-2">
        {/* Search Input */}
        <div className="flex flex-1 flex-col">
          <label htmlFor="search-products" className="sr-only">
            Search Products
          </label>
          <input
            id="search-products"
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-[#4c8250]"
          />
        </div>

        {/* Price Filter */}
        <div className="flex flex-col">
          <label htmlFor="price-filter" className="sr-only">
            Filter by Price
          </label>
          <select
            id="price-filter"
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
            className="rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-[#4c8250]"
          >
            <option value="">All Prices</option>
            <option value="low">Low (&lt; $50)</option>
            <option value="medium">Medium ($50 - $100)</option>
            <option value="high">High (&gt; $100)</option>
          </select>
        </div>

        {/* Stock Filter */}
        <div className="flex flex-col">
          <label htmlFor="stock-filter" className="sr-only">
            Filter by Stock
          </label>
          <select
            id="stock-filter"
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value)}
            className="rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-[#4c8250]"
          >
            <option value="">All Stock</option>
            <option value="out">Out of Stock</option>
            <option value="low">Low Stock</option>
            <option value="available">Available</option>
          </select>
        </div>
      </div>

      {/* Error Message */}
      {error && <div className="mb-5 rounded-md bg-[#ffebee] p-3 text-red-700">{error}</div>}

      {/* Products Grid */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-5">
        {filteredProducts.map((product) => (
          <div key={product.id} className="rounded-lg border border-gray-300 bg-white p-4">
            <h3 className="mb-2">{product.name}</h3>
            <p className="mb-2 text-gray-600">Price: ${product.price}</p>
            <p
              className="mb-0"
              style={{
                color: product.stock > 0 ? '#4c8250' : '#d3180b'
              }}
            >
              Stock: {product.stock}
            </p>
          </div>
        ))}
      </div>

      {/* No Products Message */}
      {filteredProducts.length === 0 && (
        <p className="text-center text-gray-600">No products found matching your criteria</p>
      )}
    </div>
  );
};

export default ProductList;
