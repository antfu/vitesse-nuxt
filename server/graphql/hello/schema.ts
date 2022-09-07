import { Field, InputType, ObjectType } from 'type-graphql'

@InputType()
export class PersonInput {
  @Field(() => String)
  name!: string
}

@ObjectType()
export class Person {
  @Field(() => String)
  name?: string

  @Field(() => [String], { nullable: 'itemsAndList' })
  tags?: string[]
}
