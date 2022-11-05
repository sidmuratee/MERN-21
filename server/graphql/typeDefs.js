const { gql } = require("apollo-server-express")

exports.typeDefs = gql`
    type User {
        _id: ID!
        username: String!
        email: String
        bookCount: Int
        saveBooks: [Book]

     }

     type Book {
        _id: ID!
        bookId: Int
        authors: String
        title: String!
        link: String
        description: String

     }


     input BookInput {
        authors: String
        title: String!
        link: String
        description: String
     }

     type Query {
        me: User
     }

     type Mutation {
        saveBook(book: BookInput): User
     }
`