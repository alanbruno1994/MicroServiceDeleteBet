import { buildSchema } from "graphql";
import { Express } from "express";
import bcrypt, { genSalt } from "bcrypt";
import { graphqlHTTP } from "express-graphql";
import { v4 } from "uuid";
import middlewareUser from "../middleware/authMiddlware";
import { Bets } from "../database/models/bets";
import { User } from "../database/models/user";
// const db = require("../database/models/index");

require("dotenv").config();

const schema = buildSchema(` 
  scalar Date
  type Bet {
    id: ID
    number_choose: String   
    price_game: Float
    user_id: Int
    game_id: Int,
    secured_id: String,
    createdAt: Date,
    updatedAt: Date    
  }
  type User {
    id: ID
    name: String   
    email: String
    password: String   
    createdAt: Date,
    updatedAt: Date
  }
  type Query {
    bet(id: Int!): Bet
    bets: [Bet]
  },
  type Mutation{  
    createUser(name:String, password: String, email: String) : User
  }
`);

const root = {
  bets: async () => {
    return Bets.findAll();
  },
  bet: async (value: { id: number }) => {
    // Aqui vem como objeto
    return Bets.findOne({ where: { id: value.id } });
  },
  createUser: async (data: {
    email: string;
    password: string;
    name: string;
  }) => {
    const salt = await genSalt(6);
    const insert = {
      ...data,
      password: await bcrypt.hash(data.password, salt),
      secured_id: v4(),
    };
    console.log(insert);
    return User.create(insert);
  },
};

function setupGraphQl(app: Express) {
  app.use(middlewareUser.unless({ path: ["/login"] }));
  app.use(
    "/graphql",
    graphqlHTTP({
      schema: schema,
      rootValue: root,
      graphiql: true,
    })
  );
}

export default setupGraphQl;
