import { useEffect , useState } from 'react';
import './App.css' ;
import { type User } from './types.d';
import { UserList } from './Components/UserList';

function App() {
  
  const [ users , setUsers ] = useState([]) ;


useEffect( ()=>{
  fetch( "https://randomuser.me/api?results=100" )
  .then( res => res.json() )
  .then( res => {
    setUsers( res.results )
  })
  .catch( err => console.log(err))
  }, [])

  return (
    <div className='App'>
      <h1>Prueba Tecnica.</h1>

     <UserList users={ users } />
    </div>
  )
}

export default App
