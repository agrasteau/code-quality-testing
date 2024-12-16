import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../services/api';
import '../index.css';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !price || !stock) {
      setError('All fields are required!');
      return;
    }

    try {
      await createProduct({
        name,
        price: price,
        stock: stock
      });
      navigate('/products');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create product');
      console.error('Error creating product:', err);
    }
  };
  return (
    <div className="mx-auto max-w-sm rounded-lg p-5 shadow-md">
      <h2 className="mb-5 text-center text-lg font-semibold">Add New Product</h2>

      {error && <div className="mb-2 rounded bg-red-100 p-3 text-red-600">{error}</div>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded border border-gray-300 p-2"
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="rounded border border-gray-300 p-2"
        />

        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="rounded border border-gray-300 p-2"
        />

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => navigate('/products')}
            className="flex-1 rounded bg-red-600 p-2 text-white transition hover:bg-red-700"
          >
            Cancel
          </button>

          <button type="submit" className="flex-1 rounded bg-green-700 p-2 text-white transition hover:bg-green-800">
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
