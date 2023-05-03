export const postSchema = `
type Post {
  id: ID!
  title: String!
  content: String!
  author: Author
}

input PostInput {
  title: String!
  content: String!
  authorId: ID
}

input PostUpdateInput {
  title: String!
  content: String!
}

type Query {
  post(id: ID!): Post
}

type Mutation {
  createPost(input: PostInput!): Post
  updatePost(id: ID!, input: PostInput!): Post
  deletePost(id: ID!): Post
}
`