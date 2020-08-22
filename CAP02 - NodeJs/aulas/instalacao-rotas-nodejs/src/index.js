import express from 'express';

const app = express();
app.use(express.json());

// all
app.all('/', (req, res) => {
  res.send(req.method);
});

// caracteres especiais
app.get('/teste', (req, res) => {
  res.send('Hello, world');
});
app.post('/teste', (req, res) => {
  console.log(req.body);
  res.send('Hello, world POST');
});
app.get('/teste?', (_, res) => {
  res.send('/Teste?');
});
app.get('/buzz+', (_, res) => {
  res.send('/buzz+');
});
app.get('/one*blue', (_, res) => {
  res.send('/one*blue');
});
app.get('/teste(ing)?', (req, res) => {
  res.send('/teste(ing)?');
});

// parametros da rota
app.get('/testParam/:id/:a?', (req, res) => {
  res.send(req.params.id + '' + req.params.a);
});
// parametros via query
app.get('/testQuery?', (req, res) => {
  res.send(req.query);
});
// next
app.get(
  '/testMultipleHandlers',
  (req, res, next) => {
    console.log('Callback 1');
    next();
  },
  (req, res) => {
    console.log('Callback 2');
    res.end();
  }
);

// next com array
const callback1 = (req, res, next) => {
  console.log('Callback1');
  next();
};
const callback2 = (req, res, next) => {
  console.log('Callback2');
  next();
};
const callback3 = (req, res) => {
  console.log('Callback3');
  res.end();
};
app.get('/testMultipleHandlersArray', callback1, callback2, callback3);

// route
app
  .route('/testRout')
  .get((req, res) => {
    res.send('/testRout GET');
  })
  .post((req, res) => {
    res.send('/testRout POST');
  });

app.listen(3000, () => {
  console.log('Servidor iniciado com sucesso!');
});
