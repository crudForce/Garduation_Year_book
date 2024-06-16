export async function GetData() {
  let url = 'https://api.sheety.co/9f036ed8c999ba84e7d3029e5b6e07ce/gradProject/importThis';
  const response = await fetch(url);
  const json = await response.json();
  return json.importThis;
}

