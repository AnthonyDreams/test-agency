import { Field, ObjectType} from 'type-graphql'

@ObjectType()
export class CreateProductDto {
	@Field() readonly id?: string
	@Field() readonly name: string
	@Field() readonly description: string
	@Field() readonly price: number
}