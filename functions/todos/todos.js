require("dotenv").config()
const { ApolloServer, gql } = require("apollo-server-lambda")
const faunadb = require("faunadb")

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET,
})

const typeDefs = gql`
  type Query {
    todos: [Todo!]
  }

  type Todo {
    id: ID!
    title: String!
    done: Boolean!
  }

  type Mutation {
    addTodo(title: String!): Todo
    updateTodo(id: ID!, done: Boolean!): Todo
  }
`

const resolvers = {
  Query: {
    todos: async (root, args, context) => {
      try {
        let result = await client.query(
          q.Map(
            q.Paginate(q.Match(q.Index("all_todos"))),
            q.Lambda(x => q.Get(x))
          )
        )
        // console.log("Result: " + result.data)
        return result.data.map(d => {
          return {
            id: d.ref.id,
            title: d.data.title,
            done: d.data.done,
          }
        })
      } catch (err) {
        console.log("TodoQuery error: ", err)
      }
    },
  },
  Mutation: {
    addTodo: async (_, { title }) => {
      try {
        let result = await client.query(
          q.Create(q.Collection("todos"), {
            data: {
              title,
              done: false,
            },
          })
        )
        console.log("Document created in faunadb: " + result.ref.id)
        return result.ref.data
      } catch (error) {
        console.log("Error: ", error)
      }
    },
    updateTodo: async (_, { id, done }) => {
      try {
        let result = await client.query(
          q.Update(q.Ref(q.Collection("todos"), id), {
            data: {
              done,
            },
          })
        )
        console.log("Document updated in faunadb: " + result.ref.id)
        return result.ref.data
      } catch (error) {
        console.log("Error: ", error)
      }
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  introspection: true,
})

const handler = server.createHandler()

module.exports = { handler }
