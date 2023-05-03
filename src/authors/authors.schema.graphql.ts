export const authorSchema = `
  type Author {
    id: ID!
    name: String!
    email: String!
    posts: [Post]
  }

  input AuthorInput {
    name: String!
    email: String!
  }

  type Query {
    author(id: ID!): Author
  }

  type Mutation {
    createAuthor(input: AuthorInput!): Author
    updateAuthor(id: ID!, input: AuthorInput!): Author
    deleteAuthor(id: ID!): Author
  }
`
