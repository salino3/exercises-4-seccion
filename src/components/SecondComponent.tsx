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
    const [search, setSearch] = useState(''); ;
  const [results, setResults] = useState<any[]>([]);


 UseObservable(searchResultObservable, setResults);

// useEffect(() => {
//   let subscription = squaredNumbers.subscribe((result) => {
//     setCurrentNumber(result);
//   });

//   return () => subscription.unsubscribe();
// }, []);

const handleSearchChange = (evento: any) => {
    const newValue = evento.target.value;
    setSearch(newValue)
    searchSubject.next(newValue)
}


    return (
      <Fragment>
        <div>minimum two letters</div>
        <input
          type="text"
          placeholder="Search.."
          value={search}
          onChange={handleSearchChange}
        />
        {results.map((pokemon) => (
          <div key={pokemon.name}>{pokemon.name}</div>
        ))}
      </Fragment>
    );
} 

export default SecondComponent



