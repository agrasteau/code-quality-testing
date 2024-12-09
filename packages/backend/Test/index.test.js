const request = require('supertest'); // Pour simuler des requêtes HTTP
const express = require('express'); // Simuler un serveur
const productController = require('../src/controllers/productController'); // Votre fichier à tester
const db = require('../src/db/database'); // Module mocké

jest.mock('../src/db/database'); // Mock de la base de données

describe('Product Controller', () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use(express.json()); // Pour parse le JSON
    app.post('/products', productController.createProduct); // Route pour tester
  });

  afterEach(() => {
    jest.clearAllMocks(); // Nettoyer les mocks après chaque test
  });

  test('should create a product successfully', async () => {
    const newProduct = {
      name: 'Test Product',
      price: 99.99,
      stock: 10,
    };
  
    const response = await request(app)
      .post('/products')
      .send(newProduct);
  
    // Log de la réponse complète
    expect(response.body).toBe(201);
    console.log(response.body);
  
    expect(response.status).toBe(201);
  });
  

  test('should return 500 if database returns an error', async () => {
    const mockRun = jest.fn((sql, params, callback) => {
      callback(new Error('Database error')); // Simule une erreur
    });
    db.getDb.mockReturnValue({ run: mockRun });

    const response = await request(app)
      .post('/products')
      .send({
        name: 'Test Product',
        price: 99.99,
        stock: 10,
      });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Error creating product' });

    expect(mockRun).toHaveBeenCalled();
  });
});