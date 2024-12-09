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
    app.get('/getProducts/:id', productController.getProduct); 
    app.post('/addProducts', productController.createProduct); 
    const mockRun = jest.fn((sql, params, callback) => {
      
      callback.call({ lastID: 1 });
    });
    

    const mockGet = jest.fn((sql, params, callback) => {
      const id = params[0]; // Récupère l'ID passé
     
      if (id == 1) {
          callback(null, { id: 1, name: 'Test Product', price: 99.99, stock: 10 });
      } else {
          callback(null, null); // Aucun produit trouvé pour d'autres IDs
      }
    });
  
    db.getDb.mockReturnValue({ run: mockRun, get: mockGet });
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
      .post('/addProducts')
      .send(newProduct);
  
    // Log de la réponse complète
    // console.log(response.body);
    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      id: 1,
      name: 'Test Product',
      price: 99.99,
      stock: 10,
  });
  
  });

  test('should get a product successfully', async () => {
    
    
    const response = await request(app).get('/getProducts/1');

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('success');
    expect(response.body.data).toEqual({
        id: 1,
        name: 'Test Product',
        price: 99.99,
        stock: 10,
    });
  
  
  });
  
/*
  test('should return 500 if database returns an error', async () => {
    
    const mockRun = jest.fn((sql, params, callback) => {
      callback(new Error('Database error')); // Simule une erreur
    });
    db.getDb.mockReturnValue({ run: mockRun });

    const response = await request(app)
      .post('/addProducts')
      .send({
        name: 'Test Product',
        price: 99.99,
        stock: 10,
      });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Error creating product' });

    expect(mockRun).toHaveBeenCalled();
  });
  */
});
