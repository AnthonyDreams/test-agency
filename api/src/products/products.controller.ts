import {Controller, Get, Post, Body} from '@nestjs/common';
import {ProductService} from './products.service'
import { inputProduct } from './products.input'
import { CreateProductDto } from './products.dto'
import { ProductEntity } from './products.entity'
@Controller('products')
export class ProductController {
    constructor (private readonly productSevice: ProductService ){}

    // @Post()
    // AddProduct(
    //     @Body('name') prodName: string,
    //     @Body('desc') prodDesc: string,
    //     @Body('Price') prodPrice: number,
    // ){
    //     const save = this.productSevice.createProduct(prodName, prodDesc, prodPrice);
    //     return {msg: 'ok'}
    // }
    
    @Get()
    GetAllProducts() : string {
        return "hola" ;
    
    }
    
}