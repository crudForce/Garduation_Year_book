// testscript.cjs
import {GetData} from './GoogleDataFetcher';

async function test() {
  const data = await GetData();
  console.log(JSON.stringify(data,null,2 ));
}

test();

