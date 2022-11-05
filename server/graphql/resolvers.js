const { User } = require ("../models/User")
const { signToken } = require ("../utils/auth")
const { AuthenticationError } = require ("apollo-server-express")
const resolvers = { 

    Query: {
        me: async (parent, args, context) => {
            console.log(context)
            if (context.user){
                const userData = await User.findOne({_id: context.user._id}).select ('-__v -password')
                return userData
            
            }
            throw new AuthenticationError('please log in')
        }
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args)
            const token = signToken(user)
            return {user, token}
        },
        login: async (parent, {email, password, username}) => {
            const user = await User.findOne({email})
            console.log(user)
            if (!user){
                throw new AuthenticationError('wrong username or password')

            }
        }

    }

 }
  module.exports = resolvers