import { Injectable } from '@nestjs/common';
import { ProductModel  } from './products.model'
import { InjectRepository } from '@nestjs/typeorm'
import { ProductEntity } from './products.entity'
import { Repository } from 'typeorm'
import { CreateProductDto } from './products.dto'
@Injectable()
export class ProductService {
    constructor (@InjectRepository(ProductEntity) private readonly ProductRepository: Repository<ProductEntity>) {}
    private products : ProductModel[] = []
    
    addProduct(name: string, desc: string, price: number){
        const id = this.products.length > 0 ? this.products[this.products.length - 1].id +1 : 1;
        const newProduct = new ProductModel(id, name, desc, price);
        this.products.push(newProduct);

    }

    async createProduct (data: CreateProductDto): Promise<ProductEntity> {
		let product = new ProductEntity()
		product.name = data.name
		product.description = data.description
		product.price = data.price

		await this.ProductRepository.save(product)

		return product
	}

    async getProducts(){
         return await this.ProductRepository.find();
    }
}