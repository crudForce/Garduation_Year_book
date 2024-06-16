// testscript.cjs
const { GetData } = require('./GoogleDataFetcher.cjs');

async function test() {
  const data = await GetData();
  console.log(JSON.stringify(data,null,2 ));
}

test();

