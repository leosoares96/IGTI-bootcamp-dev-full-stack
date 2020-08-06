import fs from 'fs';
import { promises } from 'fs';

const diretorio = 'src/files';
writeReadJson(promises);
//teste1(fs);
//teste2(fs);
//teste3(promises);
//teste4(promises);

// UTILIZANDO CALLBACKS
function teste1(fs) {
  fs.writeFile(diretorio + '/teste.txt', 'teste 1235', (err) => {
    if (err) {
      console.log(err);
    } else {
      fs.appendFile(diretorio + '/teste.txt', 'teste append file', (err) => {
        if (err) {
          console.log(err);
        } else {
          fs.readFile(diretorio + '/teste.txt', 'utf-8', (err, data) => {
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
    fs.writeFileSync(diretorio + '/teste.txt', 'teste 1235');
    fs.appendFileSync(diretorio + '/teste.txt', '\nteste append file');
    const data = fs.readFileSync(diretorio + '/teste.txt', 'utf-8');
    console.log(data);
  } catch (err) {
    console.log('erro:' + err);
  }
}
// UTILIZANDO AS PROMISES
function teste3(fs) {
  fs.writeFile(diretorio + '/teste.txt', 'bla bla')
    .then(() => {
      fs.appendFile(diretorio + '/teste.txt', 'teste append file')
        .then(() => {
          fs.readFile(diretorio + '/teste.txt', 'utf-8')
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
// UTILIZANDO PROMISES COM ASYNC/AWAIT
async function teste4(fs) {
  try {
    await fs.writeFile(diretorio + '/teste.txt', 'teste 1235');
    await fs.appendFile(diretorio + '/teste.txt', '\nteste append file');
    const data = await fs.readFile(diretorio + '/teste.txt', 'utf-8');
    console.log(data);
  } catch (err) {
    console.log('erro:' + err);
  }
}
// UTILIZANDO JSON
async function writeReadJson(fs) {
  try {
    const cars = ['gol', 'palio', 'uno'];
    await fs.writeFile(diretorio + '/teste.json', JSON.stringify({ cars }));
    const data = await fs.readFile(diretorio + '/teste.json', 'utf-8');
    console.log(JSON.parse(data));
  } catch (err) {
    console.log(err);
  }
}
