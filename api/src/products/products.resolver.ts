import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import {ProductService} from './products.service'
import { inputProduct } from './products.input'
import { CreateProductDto } from './products.dto'
import { ProductEntity } from './products.entity'
@Resolver((of) => ProductEntity)
export class ProductResolver {
	constructor (private readonly ProductService: ProductService) {}

	@Query(() => [ CreateProductDto ])
	async products () {
		return this.ProductService.getProducts()
	}



	@Mutation(() => CreateProductDto)
	async createProduct_cars (@Args('data') data: inputProduct) {
		return this.ProductService.createProduct(data)
	}

	@Mutation(() => CreateProductDto)
	async createProduct_phones (@Args('data') data: inputProduct) {
		return this.ProductService.createProduct(data)
	}
}