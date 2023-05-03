import { describe, it, expect } from 'vitest'
import { ApolloServer } from '@apollo/server';
import { schema } from '../composeSchema';
import { connectToDatabase } from '../utils/database';
import { validateAuthorInput } from './authors.validation';

const queryNonExisting = `
query { 
  author(id: "645182ce09ae1a5bf5720000") { 
      id, 
      name, 
      email, 
      posts { 
          id,
          title,
          content 
      } 
  } 
}`

const createAuthorMutation = `
mutation { 
  createAuthor(input: { 
    name: "Test Name",
    email: "test@email.com"
  }) { 
    id,
    name,
    email
  } 
}`

describe('Authors data validation', () => {
  it ('should return an error if name is not provided', () => {
    const authorInput = {
      email: 'hello@gmail.com',
    };
    const errors = validateAuthorInput(authorInput);
    expect(errors).toContain('Name is required');
  })
});

describe('Authors', () => {

  // todo 
  // beforeEach and beforeAll, setup database and appolloserver instead of in each test

  it('should not return a non existing value', async  () => {
    await connectToDatabase(); // todo setup test database, and delete all data on teardown
    const server = new ApolloServer(schema);
    const res = await server.executeOperation({query: queryNonExisting});

    // there must be a better, typesafe way to test responses from apollo server, running out of time for the exercice
    expect((res.body as any).singleResult.data.author).toBeNull();
    expect((res.body as any).singleResult.errors).toBeUndefined();
  });

  it('should be created without errors', async  () => {
    await connectToDatabase(); // todo setup test database, and delete all data on teardown
    const server = new ApolloServer(schema);

    const randomnumber = Math.floor(Math.random() * 1000000);
    const res = await server.executeOperation({query: `
      mutation { 
        createAuthor(input: { 
          name: "Test Name",
          email: "${randomnumber}@email.com"
        }) { 
          id,
          name,
          email
        } 
      }`});
    expect((res.body as any).singleResult.errors).toBeUndefined();
  });

  it('should return a valid value', async  () => {
    await connectToDatabase(); // todo setup test database, and delete all data on teardown
    const server = new ApolloServer(schema);

    const randomnumber = Math.floor(Math.random() * 1000000);
    const testName = "Super test name!!";
    const testEmail =`${randomnumber}@email.com`;
    const res = await server.executeOperation({query: `
      mutation { 
        createAuthor(input: { 
          name: "${testName}",
          email: "${testEmail}"
        }) { 
          id,
          name,
          email
        }
      }`});
    const authorId = (res.body as any).singleResult.data.createAuthor.id;

    const resQuery = await server.executeOperation({query: `
    query { 
      author(id: "${authorId}") { 
          id, 
          name, 
          email, 
          posts { 
              id,
              title,
              content 
          } 
      } 
    }`});
    console.log((resQuery.body as any).singleResult.data);
    expect((resQuery.body as any).singleResult.data.author.id).toEqual(authorId);
    expect((resQuery.body as any).singleResult.data.author.name).toEqual(testName);
    expect((resQuery.body as any).singleResult.data.author.email).toEqual(testEmail);
    expect((resQuery.body as any).singleResult.errors).toBeUndefined();
  });
});
