import { Module } from '@nestjs/common';
import {ProductController} from './products.controller';
import {ProductService} from './products.service'
import { ProductResolver} from './products.resolver'
import { ProductEntity } from './products.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
@Module({
    imports: [TypeOrmModule.forFeature([ ProductEntity ])],
    providers:[ProductResolver, ProductService],
})

export class ProductModule {}