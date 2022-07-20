import  { Fragment, useEffect, useState } from 'react';
// npm install rxjs
import {from, BehaviorSubject} from 'rxjs';
import { debounceTime, delay, distinctUntilChanged, filter, map, mergeMap } from "rxjs/operators";



const getPokemonByName  =  async (name: any) => {
  
    const {results: allPokemons} = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=1000')
    .then(res => res.json())
return allPokemons.filter((pokemon: any) => pokemon.name.includes(name));
} 

let searchSubject = new BehaviorSubject('');
let searchResultObservable = searchSubject.pipe(
    filter(val => val.length > 1),
    debounceTime(750),
    distinctUntilChanged(),
    mergeMap(val => from(getPokemonByName(val)) )
)



const UseObservable = (observable: any, setter: any) => {
  useEffect(() => {
    let subscription = observable.subscribe((result: any) => {
      setter(result);
    });

    return () => subscription.unsubscribe();
  }, [observable, setter]);

}


const SecondComponent = () => {
  // añadido sucesivamente
  let valorInput = "";
  let valorInput2 = "";
  const [first, setfirst] = useState(valorInput);
  // ^añadido sucesivamente

  const [search, setSearch] = useState(valorInput2);
  const [results, setResults] = useState<any[]>([]);

  UseObservable(searchResultObservable, setResults);

  // useEffect(() => {
  //   let subscription = squaredNumbers.subscribe((result) => {
  //     setCurrentNumber(result);
  //   });

  //   return () => subscription.unsubscribe();
  // }, []);

  
  const handleSearchChange = (evento: any) => {
    setfirst(evento.target.value);
    valorInput2 = evento.target.value;
    valorInput = valorInput2; 
    searchSubject.next(valorInput2);
  };

  // añadido sucesivamente
  const handleClick = () => {
    console.log(first);
    valorInput2 = first;
    return setSearch(valorInput2);
  };
  // ^añadido sucesivamente

  return (
    <Fragment>
      <div>minimum two letters for searching..</div>
      <br />
      <div>
        Pokémon -&gt; {search} {" "}
      </div>
      <input type="text" placeholder="Search.." onChange={handleSearchChange} />{" "}
      <button onClick={() => handleClick()}>pasando valor</button>
      {results.map((pokemon) => (
        <div key={pokemon.name}>{pokemon.name}</div>
      ))}
    </Fragment>
  );
} 

export default SecondComponent





















