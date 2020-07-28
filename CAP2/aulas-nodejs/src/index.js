import fs from 'fs';
import { promises } from 'fs';

//teste1(fs);
//teste2(fs);
teste3(promises);
teste4(promises);

// UTILIZANDO CALLBACKS
function teste1(fs) {
  fs.writeFile('teste.txt', 'teste 1235', (err) => {
    if (err) {
      console.log(err);
    } else {
      fs.appendFile('teste.txt', 'teste append file', (err) => {
        if (err) {
          console.log(err);
        } else {
          fs.readFile('teste.txt', 'utf-8', (err, data) => {
            console.log(err ? err : data);
          });
        }
      });
    }
  });
}
// UTILIZANDO DE FORMA SINCRONA
function teste2(fs) {
  try {
    fs.writeFileSync('teste.txt', 'teste 1235');
    fs.appendFileSync('teste.txt', '\nteste append file');
    const data = fs.readFileSync('teste.txt', 'utf-8');
    console.log(data);
  } catch (err) {
    console.log('erro:' + err);
  }
}
// UTILIZANDO AS PROMISES
function teste3(fs) {
  fs.writeFile('teste.txt', 'bla bla')
    .then(() => {
      fs.appendFile('teste.txt', 'teste append file')
        .then(() => {
          fs.readFile('teste.txt', 'utf-8')
            .then((data) => console.log(data))
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
}

// UTILIZANDO O ASYNC
async function teste4(fs) {
  try {
    await fs.writeFile('teste.txt', 'teste 1235');
    await fs.appendFile('teste.txt', '\nteste append file');
    const data = await fs.readFile('teste.txt', 'utf-8');
    console.log(data);
  } catch (err) {
    console.log('erro:' + err);
  }
}
