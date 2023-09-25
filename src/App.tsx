import { useEffect , useState } from 'react';
import './App.css' ;

function App() {
  
  const [ users , setUsers ] = useState( [] )

useEffect( () =>{
  fetch( "https://randomuser.me/api?results=100")
  .then( res => res.json())
  .then( res => 
    setUsers ( res.results )
  )
  .catch( err => {
    console.log(err)
  })  
})





  return (
    <div className='App'>
      <h1>Prueba Tecnica.</h1>
    </div>
  )
}

export default App
