import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import sayHello from "/src/component/functions.js";

import AlertBox from '/src/component/AlertBox.jsx'
import QuestionForm from '/src/component/QuestionForm.jsx'



const FNumber = ({number}) => 
{ const [currentNumber,setCurrentNumber]=useState(number);
  return ( 
    <div> <button onClick={()=> setCurrentNumber(currentNumber+1)}>increase number</button>
    <button onClick={()=> setCurrentNumber(currentNumber-1)}>decrease number</button>
  <p>{currentNumber}</p>
  {(currentNumber>5) && <span> superieur à 5🔥</span>}


  </div>)
}




function handleSubmit(e) {
    e.preventDefault()
    alert(e.target['my_input'].value)
}

const Function = () => 
{ //const [currentNumber,setCurrentNumber]=useState(number);
  QuestionForm();
  return ( 
    <div> <button onClick={()=> sayHello()}>click function</button>
        <form onSubmit={handleSubmit}>
            <input type='text' name='my_input' defaultValue='Tapez votre texte' />
            <button type='submit'>Entrer</button>
        </form>
  </div>
  
)
}

const Liste = ({liste}) => 
{ const internListe=[5,4,3,5,4]
  return ( 
        <ul>
            {internListe.map((liste,index) => (
                <li key={`${liste}-${index}`}>{ liste }</li>
            ))}
        </ul>  )
}

const Card = ({title,img}) => 
{ 
  return ( 
        <div>
        <img src= {img} ></img>
        <h1>{title}</h1>
        </div>  )

}

const CardList = () =>
{   const img="https://images.unsplash.com/photo-1526779259212-939e64788e3c?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aW1hZ2VzJTIwZ3JhdHVpdGVzfGVufDB8fDB8fHww";
    const cards = [
    {id: 1001,title : "titre1", img: img},
    {id: 1002,title : "titre1", img: img},
    {id: 1003,title : "titre1", img: img},
  ];
  
  return cards.map((card) => (
    <Card  key={card.id}  title={card.title}  img={card.img}/>
            ))

}

export default function App(){

  return (
    
      <div>
        <h1>welcome</h1>
        <p>app function</p>
      <FNumber number={4}/>
      <AlertBox message="ceci est le message" />
      <CardList />
          <Function />
          <QuestionForm />

      <p>toto</p>
         </div>

  );
}