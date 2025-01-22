import { Router } from "express";
import { body, param } from 'express-validator'
import { createProduct, deleteProduct, getProductById, getProducts, updateAvailability, updateProduct } from "./handlers/product";
import { handleInputErrors } from "./middleware";

const router = Router()
/**
 * @swagger
 * components:
 *  schemas:
 *      Product:
 *           type: object
 *           properties:
 *              id:
 *                  type: integer
 *                  description: The Product ID
 *                  example: 1
 *              name:
 *                  type: string
 *                  description: The Product name
 *                  example: Monitor Curvo de 49 Pulgadas
 *              price:
 *                  type: number
 *                  description: The Product price
 *                  example: 300
 *              availability:
 *                  type: boolean
 *                  description: The Product availability
 *                  example: true
 */

/**
 * @swagger
 * /api/products:
 *      get:
 *          summary: Get a list of products
 *          tags: 
 *              - Products
 *          description: Return a list of products
 *          responses:
 *              200:
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Product'
 */

router.get('/', getProducts)
/**
 * @swagger
 * /api/products/{id}:
 *  get:
 *      summary: Get a product by ID
 *      tags:
 *          - Products
 *      description: Return a product based on its unique ID
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to retrieve
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Successful Response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Not Found
 *          404:
 *              description: Bad Request - Invalid ID
 * 
 * 
 *              
 */

router.get('/:id', 
    param('id').isInt().withMessage('ID no Válido'),
    handleInputErrors,
    getProductById
)

/**
 * @swagger
 * /api/products:
 *  post:
 *      summary: Creates a new product
 *      tags:
 *          - Products
 *      description: Returns a new record in the database
 *      requestBody: 
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: "Monitor Curvo 49 Pulgadas"
 *                          price:
 *                              type: number
 *                              example: 399
 *      responses:
 *          201:
 *              description: Product created Successfully
 *          400:
 *              description: Bad Request - invalid Input data
 */

router.post('/',
    // Validation
    body('name').notEmpty().withMessage('El nombre del Producto no puede ir vacio'),

    body('price')
        .isNumeric().withMessage('Valor no válido')
        .custom(value => value > 0).withMessage('Precio no válido')
        .notEmpty().withMessage('El precio del Producto no puede ir vacio'),
    handleInputErrors,
    createProduct
)

/**
 * @swagger
 * /api/products/{id}:
 *  put:
 *      summary: Updates a product by ID
 *      tags:
 *          - Products
 *      description: Updates an existing product in the database based on its unique ID
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to update
 *          required: true
 *          schema:
 *            type: integer
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: "Updated Monitor Name"
 *                          price:
 *                              type: number
 *                              example: 499
 *                          availability:
 *                              type: boolean
 *                              example: true
 *      responses:
 *          200:
 *              description: Product updated successfully
 *          400:
 *              description: Bad Request - Invalid Input Data
 *          404:
 *              description: Product Not Found
 */

router.put('/:id',
    // Validation
    param('id').isInt().withMessage('ID no Válido'),
    body('name').notEmpty().withMessage('El nombre del Producto no puede ir vacio'),

    body('price')
        .isNumeric().withMessage('Valor no válido')
        .custom(value => value > 0).withMessage('Precio no válido')
        .notEmpty().withMessage('El precio del Producto no puede ir vacio'),
    body('availability')
        .isBoolean().withMessage('Valor para disponibilidad no válido'),
    handleInputErrors,
    updateProduct
)

/**
 * @swagger
 * /api/products/{id}:
 *  patch:
 *      summary: Update Product availability
 *      tags:
 *          - Products
 *      description: Updates the availability status of a product by its unique ID
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to update
 *          required: true
 *          schema:
 *            type: integer
 *      responses:
 *          200:
 *              description: Product availability updated successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad Request - Invalid ID
 *          404:
 *              description: Product Not Found
 */

router.patch('/:id', 
    param('id').isInt().withMessage('ID no Válido'),
    handleInputErrors,
    updateAvailability
)

/**
 * @swagger
 * /api/products/{id}:
 *  delete:
 *      summary: Deletes a product by a given ID
 *      tags:
 *          - Products
 *      description: Returns a confirmation message
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to delete
 *          required: true
 *          schema:
 *            type: integer
 *      responses:
 *          200:
 *              description: Product availability updated successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 *                          value: 'Producto Eliminado'
 *          400:
 *              description: Bad Request - Invalid ID
 *          404:
 *              description: Product Not Found
 */

router.delete('/:id', 
    param('id').isInt().withMessage('ID no Válido'),
    handleInputErrors,
    deleteProduct
)

export default router