import {Fragment} from 'react';
// npm install rxjs
import { from } from "rxjs";

/* 
of = toma argumentos y genera una secuencias y observables;
from = crea observable desde array, promise, iterable, observable
*/

const observer = {
  next: (val: any) => console.log("next: ", val),
  complete: () => console.log("completed"),
};
const source1$ = from([1, 2, 3, 4, 5]);
// const source2$ = of([1, 2, 3, 4, 5]);
// const source3$ = of(...[1, 2, 3, 4, 5]);

// const source4$ = from("Denny");

source1$.subscribe(observer);

const source$ = from(fetch("https://api.github.com/users/klerith"));

source$.subscribe(async (resp: any) => {
  // opción de llamada 'async', 'await'
  console.log(resp.url);
  const dataResp = await resp.json();
  console.log(dataResp);
});

const miGenerador = function* () {
  yield 1;
  yield 2;
  yield 3;
  yield 7;
  yield 5;
};

const miIterable: any = miGenerador();

/// función syncrona
for (let id of miIterable) {
  console.log(id);
}

from(miIterable).subscribe(observer);

const PrimerFile = () => {


  return (
    <Fragment>
      <div>PrimerFile</div>
    </Fragment>
  );
};

export default PrimerFile;
