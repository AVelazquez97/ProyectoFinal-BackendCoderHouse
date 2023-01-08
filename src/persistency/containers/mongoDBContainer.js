import MongoDBConnection from '../../config/databases/connectionMongoDB.js';

class MongoDBContainer {
  constructor() {
    this.connectDB();
  }

  connectDB = () => {
    try {
      const db = MongoDBConnection.getMongoDBInstance();
      db.connect();
    } catch (error) {
      throw error;
    }
  };
}

export default MongoDBContainer;
