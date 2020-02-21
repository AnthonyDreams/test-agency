import { Field, InputType } from 'type-graphql'

@InputType()
export class inputProduct {
	@Field() readonly name: string
	@Field() readonly description: string
	@Field() readonly price: number
}