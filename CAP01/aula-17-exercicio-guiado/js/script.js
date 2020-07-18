let tabCountries = 0;
let tabSelected = 0;

let totalPopulationCountries = 0;
let totalPopulationSelected = 0;

let arrayCountries = [];
let arraySelected = [];

window.addEventListener('load', () => {
  tabCountries = document.querySelector('#countries');
  tabSelected = document.querySelector('#selectedCountries');

  fetchCountries().then((data) => {
    arrayCountries = data;
    listCountry();
  });
});

function listCountry() {
  countCountries(tabCountries, arrayCountries);
  countCountries(tabSelected, arraySelected);

  sumPopulation(tabCountries, arrayCountries);
  sumPopulation(tabSelected, arraySelected);

  listCountries(tabCountries, arrayCountries);
  listCountries(tabSelected, arraySelected);
}
const fetchCountries = async () => {
  let countrysAPI = await fetch('https://restcountries.eu/rest/v2/all');
  let arrayCountries = await countrysAPI.json();

  arrayCountries = await arrayCountries.map((data) => {
    const { id, name, population, flag } = data;
    return { id, name, population, flag };
  });

  return arrayCountries;
};
const countCountries = (tab, list) => {
  const countCountries = list.length;
  let title = document.createElement('h2');
  title.textContent = `Países (${countCountries})`;
  tab.appendChild(title);
};
const sumPopulation = (tab, list) => {
  const totalPopulation = list.reduce((acc, cur) => {
    return acc + cur.population;
  }, 0);

  let p = document.createElement('p');
  p.textContent = `População total: ${totalPopulation}`;
  tab.appendChild(p);
};
const listCountries = (tab, list) => {
  let ul = document.createElement('ul');
  ul.classList.add('listCountries');

  list.forEach((data) => {
    let li = document.createElement('li');
    let button = document.createElement('button');
    let img = document.createElement('img');
    let div = document.createElement('div');
    let country = document.createElement('h4');
    let population = document.createElement('p');

    img.src = data.flag;
    country.textContent = data.name;
    population.textContent = data.population;

    div.classList.add('dataCountry');
    div.appendChild(country);
    div.appendChild(population);

    li.appendChild(button);
    li.appendChild(img);
    li.appendChild(div);
    ul.appendChild(li);
  });

  tab.appendChild(ul);
};
