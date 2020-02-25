import * as admin from 'firebase-admin';

const serviceAccount = require('../service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

import { ApolloServer, ApolloError, ValidationError, gql } from 'apollo-server';

interface User {
    id: string;
    email: string;
}
  
interface Tweet {
id: string;
likes: number;
text: string;
userId: string;
}
  
