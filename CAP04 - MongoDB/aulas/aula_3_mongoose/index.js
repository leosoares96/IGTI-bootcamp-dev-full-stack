import mongoose from 'mongoose';

mongoose
  .connect(
    'mongodb+srv://leosoares96:07091996@cluster0.xxkeq.mongodb.net/grades?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(console.log('Conectado ao MongoDB Atlas'))
  .catch((err) => {
    console.log('Erro ao conectar ao MongoDB: ' + err);
  });

const studentSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  subject: {
    type: String,
    require: true,
  },
  type: {
    type: String,
    require: true,
  },
  value: {
    type: Number,
    require: true,
  },
  lastModifield: {
    type: Date,
    default: Date.Now,
  },
});

// Definindo o modelo da coleção
mongoose.model('student', studentSchema, 'student');

const student = mongoose.model('student');

new student({
  name: 'Teste 1',
  subject: 'Matematica',
  type: 'Trabalho Pratico',
  value: 22,
})
  .save()
  .then(() => {
    console.log('Documento Inserido');
  })
  .catch((err) => {
    console.log('Falha ao inserir documento: ' + err);
  });
