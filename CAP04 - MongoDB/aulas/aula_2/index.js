const MongoClient = require('mongodb').MongoClient;
const uri =
  'mongodb+srv://leosoares96:07091996@cluster0.xxkeq.mongodb.net/<dbname>?retryWrites=true&w=majority';
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect(async (err) => {
  const collection = client.db('grades').collection('student');

  const documents = await collection.find().toArray();

  const dataBaseList = await client.db().admin().listDatabases();
  console.log('DataBases');
  console.log(dataBaseList);

  console.log(documents);

  client.close();
});
