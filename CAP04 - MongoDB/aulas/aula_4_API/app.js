import express from 'express';
import mongoose from 'mongoose';
import studentRouter from './routes/studentRouter.js';

mongoose
  .connect(
    'mongodb+srv://leosoares96:07091996@cluster0.xxkeq.mongodb.net/grades?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log('Conectado ao MongoDB Atlas');
  })
  .catch((err) => {
    console.log('Erro ao conectar ao MongoDB: ' + err);
  });

const app = express();
app.use(express.json());
app.use(studentRouter);

app.listen(3000, () => {
  console.log('API Started!');
});
