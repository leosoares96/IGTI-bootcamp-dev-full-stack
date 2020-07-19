let inputSearch = null;
let totalUsers = null;
let users = [];
let usersFilted = [];
let statistics = {
  totalGenderFemale: 0,
  totalGenderMale: 0,
  totalAge: 0,
  avgAge: 0,
};

window.addEventListener('load', async () => {
  users = await getUser();
  usersFilted = users;

  inputSearch = document.querySelector('#search-input');
  inputSearch.addEventListener('keyup', filterUsers);

  listUsers(usersFilted);
  listStatistics(usersFilted);
});

const filterUsers = async (event) => {
  const filter = event.target.value.toLowerCase();

  usersFilted = await users.filter((user) => {
    return user.name.toLowerCase().includes(filter);
  });

  if (event.key === 'Enter') {
    listUsers(usersFilted);
    listStatistics(usersFilted);
  }
};

const getUser = async () => {
  let users = await fetch(
    'https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo'
  );
  let usersJson = await users.json();
  let usersMap = await usersJson.results.map((user) => {
    const { name, picture, dob, gender } = user;
    return {
      name: name.first + ' ' + name.last,
      picture,
      age: dob.age,
      gender,
    };
  });
  return usersMap;
};

const listUsers = (users) => {
  let userList = document.querySelector('#listUsers');
  userList.innerHTML = '';
  totalUsers = document.querySelector('#totalUsers');
  totalUsers.innerHTML = '';
  totalUsers.textContent = `${users.length} usuário encontrado`;
  totalUsers.classList.add('subTitle');

  users
    .sort((a, b) => {
      return a.name.localeCompare(b.name);
    })
    .forEach((user) => {
      let li = document.createElement('li');
      let p = document.createElement('p');
      let img = document.createElement('img');
      p.textContent = `${user.name}, ${user.age}`;
      img.src = user.picture.medium;

      li.appendChild(img);
      li.appendChild(p);
      userList.appendChild(li);
    });
};

const listStatistics = async (users) => {
  let listStatistics = document.querySelector('#listStatistics');
  listStatistics.innerHTML = '';
  statistics.totalAge = await users.reduce((acc, cur) => {
    return acc + cur.age;
  }, 0);
  statistics.avgAge = statistics.totalAge / users.length;
  statistics.totalGenderMale = 0;
  statistics.totalGenderFemale = 0;
  await users.forEach((user) => {
    statistics.totalGenderMale =
      user.gender === 'male'
        ? ++statistics.totalGenderMale
        : statistics.totalGenderMale;
    statistics.totalGenderFemale =
      user.gender === 'female'
        ? ++statistics.totalGenderFemale
        : statistics.totalGenderFemale;
  });

  let totalGenderFemale = document.createElement('li');
  let totalGenderMale = document.createElement('li');
  let totalAge = document.createElement('li');
  let avgAge = document.createElement('li');

  totalGenderMale.textContent = `Sexo Masculino: ${statistics.totalGenderMale}`;
  totalGenderFemale.textContent = `Sexo Feminino: ${statistics.totalGenderFemale}`;
  totalAge.textContent = `Soma das idades: ${statistics.totalAge}`;
  avgAge.textContent = `Média de idades: ${statistics.avgAge.toFixed(2)}`;

  listStatistics.appendChild(totalGenderFemale);
  listStatistics.appendChild(totalGenderMale);
  listStatistics.appendChild(totalAge);
  listStatistics.appendChild(avgAge);
};
