function GetData() {
let url = 'https://api.sheety.co/9f036ed8c999ba84e7d3029e5b6e07ce/gradProject/importThis';
fetch(url)
.then((response) => response.json())
.then(json => {
  // Do something with the data
  console.log(json.importThis);
});
}
module.exports = { GetData }
