import React, { Fragment, useState } from "react";
  // npm install react-hook-form

  
const ThirdComponent = () => {
  let valorInput = "";
  let valorInput2 = "";
  const [first, setfirst] = useState(valorInput);
  const [second, setsecond] = useState(valorInput2);

  const handleClick = () => {
    console.log(first);
    valorInput2 = first;
    return setsecond(valorInput2);
  };

  return (
    <Fragment>
      <h4>ThirdComponent</h4>
      <div>
        <p className="parrafo">~{second}~</p>
      </div>
      <input
        placeholder="^al clicar envia el valor^"
        type="text"
        onChange={(evento) => {
          setfirst(evento.target.value);
        }}
        // defaultValue={second} --> no hace falta
      />
      <button onClick={() => handleClick()}>pass value</button>
      <br />
      <hr />
    </Fragment>
  );
}

export default ThirdComponent