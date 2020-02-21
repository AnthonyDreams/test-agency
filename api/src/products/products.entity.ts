import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('products')
export class ProductEntity {
	@PrimaryGeneratedColumn('uuid') id: string

	@Column('varchar', { length: 100, unique: true })
	name: string

	@Column('varchar', { length: 20, unique: false, nullable:true })
	product_type: string

	@Column('text')
	description: string

	@Column('numeric') price: number
}