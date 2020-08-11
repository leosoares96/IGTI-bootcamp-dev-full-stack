import { promises as fs } from 'fs';

init();

async function init() {
  const cities = JSON.parse(await readFileCities());
  const states = JSON.parse(await readFileStates());

  // console.log('🚀 Criação dos arquivos JSON de cadas Estado:');
  // await createFilesStates(cities, states);
  // console.log('🚀 Retorno da quantidade de Cidades de um Estado:');
  // console.log(await readQtyCitiesInStates('SP'));
  //console.log('🚀 Retorna os 5 Estados com mais cidades:');
  //await totalCitiesInStates(states, 'max', 5);
  console.log('🚀 Retorna os 5 Estados com menos cidades:');
  await totalCitiesInStates(states, 'min', 5);
  //console.log('🚀 Retorna a cidade de maior nome de cada estado:');
  //await lengthNameCitiesBystates(states, 'max', 5);
  //console.log('🚀 Retorna a cidade de menor nome de cada estado:');
  //await lengthNameCitiesBystates(states, 'min', 5);
  // console.log('🚀 Retorna a cidade de menor nome:');
  // await lengthNameCity(cities, states, 'min');
  // console.log('🚀 Retorna a cidade de maior nome:');
  // await lengthNameCity(cities, states, 'max');
}

function readFileCities() {
  return fs.readFile('src/data/Cidades.json', 'utf-8');
}
function readFileStates() {
  return fs.readFile('src/data/Estados.json', 'utf-8');
}
function createFilesStates(cities, states) {
  try {
    states.forEach((state) => {
      const citiesFilter = cities.filter((city) => city.Estado === state.ID);
      const data = {
        ...state,
        Cidades: citiesFilter,
      };
      fs.writeFile(
        `src/files/estados/${data.Sigla}.json`,
        JSON.stringify(data)
      );
    });
    console.log('Arquivos criados com sucesso!');
  } catch (err) {
    console.log(err);
  }
}
async function readQtyCitiesInStates(uf) {
  try {
    const state = JSON.parse(await fs.readFile(`src/files/estados/${uf}.json`));
    const qtyCities = { UF: uf, qtdCidades: Object.keys(state.Cidades).length };
    return qtyCities;
  } catch (err) {
    return err;
  }
}
async function totalCitiesInStates(states, filter, qty) {
  const qtyCities = await Promise.all(
    states.map(async (state) => {
      const qtyCities = await readQtyCitiesInStates(state.Sigla);
      return qtyCities;
    })
  );
  qtyCities.sort((a, b) => {
    return filter === 'max'
      ? b.qtdCidades - a.qtdCidades
      : a.qtdCidades - b.qtdCidades;
  });
  console.log(qtyCities.slice(0, qty));
}
function lengthNameCitiesBystates(states, filter, qty) {
  states.map(async (state) => {
    const stateCity = JSON.parse(
      await fs.readFile(`src/files/estados/${state.Sigla}.json`)
    );

    stateCity.Cidades.sort((a, b) => {
      const dif =
        filter === 'max'
          ? b.Nome.length - a.Nome.length
          : a.Nome.length - b.Nome.length;

      return dif === 0 ? a.Nome.localeCompare(b.Nome) : dif;
    });
    stateCity.Cidades = stateCity.Cidades.slice(0, 1);
    const data = {
      Cidade: stateCity.Cidades[0].Nome,
      UF: stateCity.Sigla,
    };
    console.log(data);
  });
}

function lengthNameCity(cities, states, filter) {
  cities.sort((a, b) => {
    const dif =
      filter === 'max'
        ? b.Nome.length - a.Nome.length
        : a.Nome.length - b.Nome.length;

    return dif === 0 ? a.Nome.localeCompare(b.Nome) : dif;
  });
  const city = cities.slice(0, 1);
  const state = states.filter((state) => state.ID === city[0].Estado);

  const data = {
    Cidade: city[0].Nome,
    UF: state[0].Sigla,
  };

  console.log(data);
}
