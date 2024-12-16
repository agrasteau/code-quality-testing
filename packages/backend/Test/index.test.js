const request = require('supertest'); // Pour simuler des requêtes HTTP
const express = require('express'); // Simuler un serveur
const productController = require('../src/controllers/productController'); // Votre fichier à tester
const userController = require('../src/controllers/userController'); // Votre fichier à tester
const db = require('../src/db/database'); // Module mocké
const bcrypt = require('bcryptjs');

jest.mock('../src/db/database'); // Mock de la base de données

describe('Product Controller', () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use(express.json()); // Pour parse le JSON
    app.get('/getProduct/:id', productController.getProduct);
    app.get('/getAllProducts', productController.getAllProducts);
    app.post('/addProducts', productController.createProduct); 
    app.get('/updateStock/:id', productController.updateStock);
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

   

    const mockGetAll = jest.fn((sql, params, callback) => {
        callback(null, { id: 1, name: 'Test Product', price: 99.99, stock: 10 });
       
    });
  
    db.getDb.mockReturnValue({ run: mockRun, get: mockGet, all : mockGetAll });
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
    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      id: 1,
      name: 'Test Product',
      price: 99.99,
      stock: 10,
  });
  
  });

  test('should get a product successfully', async () => {
    
    
    const response = await request(app).get('/getProduct/1');

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('success');
    expect(response.body.data).toEqual({
        id: 1,
        name: 'Test Product',
        price: 99.99,
        stock: 10,
    });
  
  
  });

  test('should get all a product successfully', async () => {
    
    
    const response = await request(app).get('/getAllProducts');

    expect(response.status).toBe(200);
    
  
  
  });
  
  test('should update a product successfully', async () => {
   
   
      
    
    const response = await request(app).get('/updateStock/1').send({stock : 5});
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);

  
    
  
  });


  test('should return 500 if database returns an error on creating product', async () => {

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

  test('should return 500 if database returns an error on get product', async () => {

    const mockGet = jest.fn((sql, params, callback) => {
      callback(new Error('Database error')); // Simule une erreur
    });
    db.getDb.mockReturnValue({ get: mockGet });


    const response = await request(app)
      .get('/getProduct/1')

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Database error' });

    expect(mockGet).toHaveBeenCalled();
  });

  test('should return 500 if database returns an error on get all products', async () => {

    const mockGets = jest.fn((sql, params, callback) => {
      callback(new Error('Database error')); // Simule une erreur
    });
    db.getDb.mockReturnValue({ all: mockGets });


    const response = await request(app)
      .get('/getAllProducts')

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Database error' });

    expect(mockGets).toHaveBeenCalled();
  });

  test('should return 500 if database returns an error on update products', async () => {

    const mockRun = jest.fn((sql, params, callback) => {
      callback(new Error('Database error')); // Simule une erreur
    });
    db.getDb.mockReturnValue({ run: mockRun });


    const response = await request(app)
      .get('/updateStock/1').send({stock : 5});

    expect(response.status).toBe(500);

    expect(mockRun).toHaveBeenCalled();
  });

  test('should return 404 if stock=0 on update products', async () => {

    const mockRun = jest.fn((sql, params, callback) => {
      const id = params[0];
      if(id==0){
        callback.call({ changes : 0 });
      }else{
        callback.call();
      }
      
    });
    db.getDb.mockReturnValue({ run: mockRun });

    const response = await request(app)
      .get('/updateStock/1').send({stock : 0});

    expect(response.status).toBe(404);

    expect(mockRun).toHaveBeenCalled();
  });
  
  
});

describe('user Controller', () => {

  let app;

  beforeEach(() => {
    app = express();
    app.use(express.json()); // Pour parse le JSON
    app.post('/registerUser', userController.registerUser);
    app.post('/loginUser', userController.loginUser);
    app.get('/getAllUsers', userController.getAllUsers);
    

    const mockRun = jest.fn((sql, params, callback) => {
      
      callback.call({ lastID: 1 });
    });

    const mockGet = jest.fn((sql, params, callback) => {
      const [username] = params;
      if (username === 'admin') {
          // Simule un utilisateur trouvé
          callback(null, {
              id: 1,
              username: 'admin',
              password: bcrypt.hashSync('admin123', 8), // Hash simulé
              firstname: 'Admin',
              lastname: 'User'
          });
      } else {
          // Simule utilisateur non trouvé
          callback(null, null);
      }
  });

  const mockGetAll = jest.fn((sql, params, callback) => {
    callback(null, { id: 1,
      username: 'admin',
      password: bcrypt.hashSync('admin123', 8), // Hash simulé
      firstname: 'Admin',
      lastname: 'User'});
   
  });
  
    db.getDb.mockReturnValue({ run: mockRun, get: mockGet, all: mockGetAll});
  });

  afterEach(() => {
    jest.clearAllMocks(); // Nettoyer les mocks après chaque test
  });

  test('should register a new user successfully', async () => {
   
    const newUser = {
      username: 'Kynoah',
      password: 'Test_1234',
      firstname: 'Mathieu',
      lastname: 'Gouin',
    };
  
    const response = await request(app)
      .post('/registerUser')
      .send(newUser);
    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      auth: true,
      token: expect.any(String), // Vérifie qu'un token est retourné
    });
  
  });

  test('should return 500 if database returns an error on register user', async () => {

    const mockRun = jest.fn((sql, params, callback) => {
      callback(new Error('Database error')); // Simule une erreur
    });
    db.getDb.mockReturnValue({ run: mockRun });


    const response = await request(app)
      .post('/registerUser')
      .send({
        username: 'Kynoah',
        password: 'Test_1234',
        firstname: 'Mathieu',
        lastname: 'Gouin',
      });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Error creating user' });

    expect(mockRun).toHaveBeenCalled();
  });

  test('should login as user successfully', async () => {
   
    const user = {
      username: 'admin',
      password: 'admin123',
    };
  
    const response = await request(app)
      .post('/loginUser')
      .send(user);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      auth: true,
      token: expect.any(String), // Vérifie qu'un token est retourné
      user: {
        id: 1,
        username: 'admin',
        firstname: 'Admin',
        lastname: 'User',
      },
    });
  
  });

  test('should not login as user because wrong password', async () => {
   
    const user = {
      username: 'admin',
      password: 'WrongPassword',
    };
  
    const response = await request(app)
      .post('/loginUser')
      .send(user);
    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      auth: false,
      token: null,
    });
  
  });

  test('should not login as not exist user', async () => {
   
    const user = {
      username: 'Kynoah',
      password: 'Test_1234',
    };
  
    const response = await request(app)
      .post('/loginUser')
      .send(user);
    expect(response.status).toBe(404);
    expect(response.body.error).toEqual('No user found.');
  
  });

  test('should return 500 if database returns an error on login user', async () => {

    const mockGet = jest.fn((sql, params, callback) => {
      callback(new Error('Database error')); // Simule une erreur
    });
    db.getDb.mockReturnValue({ get: mockGet });


    const response = await request(app)
      .post('/loginUser')
      .send({
        username: 'Kynoah',
        password: 'Test_1234',
      });

    expect(response.status).toBe(500);

    expect(mockGet).toHaveBeenCalled();
  });

  test('should get all a user successfully', async () => {
    
    
    const response = await request(app).get('/getAllUsers');

    expect(response.status).toBe(200);
    
  
  
  });

  test('should return 500 if database returns an error on get all user', async () => {

    const mockGets = jest.fn((sql, params, callback) => {
      callback(new Error('Database error')); // Simule une erreur
    });
    db.getDb.mockReturnValue({ all: mockGets });


    const response = await request(app)
      .get('/getAllUsers')

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Error getting users' });

    expect(mockGets).toHaveBeenCalled();
  });

});

