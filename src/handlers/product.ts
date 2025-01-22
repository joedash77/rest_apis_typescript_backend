import { Request, Response } from 'express'
import Product from '../models/Product.model'

export const getProducts = async (req : Request, res : Response) => {
    const product = await Product.findAll({
        order: [
            ['price', 'ASC'] // Forma de mostrar el orden de datos(dato, forma)
        ],
        // attributes: {exclude: ['createddAt', 'updatedAt', 'availability']} ----> Excluir que se muestren ciertos datos
        // limit: 2 ---> Limitar cuantos datos se muestran
    })

    res.json({data: product})
}

export const getProductById = async (req : Request, res : Response) => {
    const { id } = req.params
        const product = await Product.findByPk(id)

        if(!product) {
            return res.status(404).json({
                error: 'Producto no encontrado'
            })
        }

        res.json({data: product})
}

export const createProduct = async (req : Request, res : Response) => {
    const product = await Product.create(req.body)
    res.status(201).json({data: product})
}

export const updateProduct = async (req: Request, res: Response) => {
    const { id } = req.params
    const product = await Product.findByPk(id)

    if (!product) {
        return res.status(404).json({
            error: 'Producto no encontrado'
        })
    }
    
    // Actualizar
    await product.update(req.body)
    await product.save()

    res.json({data: product})
}

export const updateAvailability = async (req: Request, res: Response) => {
    const { id } = req.params
    const product = await Product.findByPk(id)

    if (!product) {
        return res.status(404).json({
            error: 'Producto no encontrado'
        })
    }
    
    // Modificar
    product.availability = !product.dataValues.availability // No necesito especificar nada en body, cambia automaticamente
    await product.save()
    res.json({data: product})
}

export const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params
    const product = await Product.findByPk(id)

    if (!product) {
        return res.status(404).json({
            error: 'Producto no encontrado'
        })
    }

    await product.destroy()
    res.json({data: 'Producto eliminado'})
}