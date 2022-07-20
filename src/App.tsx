import React from "react";
//import PrimerFile from "./components/PrimerFile";
import "./App.css";
import CopyNewComponent from "./components/CopyNewComponent";
import SecondComponent from './components/SecondComponent'
import ThirdComponent from "./components/ThirdComponent";

function App() {
  return (
    <div className="App">
      <CopyNewComponent />
      <br /> <hr />
      <SecondComponent />
      <br /> <hr />
      <ThirdComponent />
      
    </div>
  );
}

export default App;
