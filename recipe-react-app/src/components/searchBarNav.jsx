 import '/src/App.css'
import { useState,useContext, useEffect } from 'react';


 
 export default function  SearchBarNav() {
  const [keySearch, setKeySearch] = useState("");
    const [showGlass, setShowGlass] = useState(false);

   function handleChange(e) {
     if (e.key === 'Enter') {
    e.preventDefault();    // évite le rechargement
    handleSubmit(e);       // lance ta recherche
  }
    setKeySearch(e.target.value);
  }

  function handleSubmit(e) {

        e.preventDefault();
  glass.classList.add('rotatec');
  //const searchWindow = document.getElementById('searchWindow'); 

    if(showGlass===true){ 
    console.log("Mot-clé avant redirection :", keySearch);

    let url = "/search?tag="+keySearch;
    window.location.href =url;
    }
    else 
      { 
            setTimeout(() => {    searchWindow.classList.add('slide-in-blurred-left')
    }, 1); 
    setShowGlass(true); 
  }

       }
  

 return( 
<div>
    <form className="d-flex mt-1" onSubmit={handleSubmit}>
 
 {showGlass&&<input type="text" className="form-control  w-100  " id='searchWindow'   value={keySearch} onChange={handleChange} />   }      
  <button type="submit" className="btn clickable bg-grey"   >
    <i className="fa-solid fa-magnifying-glass    " id='glass'></i>
  </button>     
  </form>
      
</div>
     
 )}