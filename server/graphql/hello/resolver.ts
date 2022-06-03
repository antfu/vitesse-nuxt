import { Arg, Query, Resolver } from 'type-graphql'

import { Person, PersonInput } from './schema'

@Resolver()
export default class PersonResolver {
  @Query(
    () => Person,
    // { nullable: true }
  )
  person(
    @Arg('personInput', () => PersonInput) personInput: PersonInput,
  ): Person | undefined {
    const personData: Record<string, Person> = {
      'Phil Xu': {
        name: 'Phil Xu',
        tags: ['Developer', 'China'],
      },
    }
    return personData[personInput.name]
  }
}
