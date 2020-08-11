var city = document.querySelector('.city')
city.textContent = 'Itaquaquecetuba';

var nodeList = document.querySelectorAll('li');
var arrayList = Array.from(nodeList);

for(var i = 0; i< arrayList.length; i ++){
  arrayList[i].style.color = 'blue';
}