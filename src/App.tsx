import { useEffect , useState} from "react" ;
import './App.css' ;

import { type User } from "./types.d"; 
import { UserList } from "./Components/UserList";

function App() {

/**
 * Estado de usuarios : 
 *  users = usuarios
 *  setUsers = setUsuarios
 *  El estado inicial va a ser un Array Vacio de tipo User
 */
  const [ usuario , setusuario ] = useState<Array<User[]>>([])




  /**
   *  Se usa UseEffect para hacer el fetch a la api
   *  res = respuesta 
   *  respuesta.result = Accede al resultado del llamado a la Api a la propiedad Results
   *  (Que contiene el listado de usuarios)
   *  
  */

  useEffect( () => {
   fetch( 'https://randomuser.me/api/?page=3&results=100' )
    .then( respuesta => respuesta.json())
    .then( respuesta => {
      setusuario( respuesta.results )
    })
    .catch( err => {
      console.error( err )
    })
    .finally()
  } , [] )




  return(
    <div>

      <h1>Listado de Usuarios</h1>

       <UserList />

    </div>
  ) ;
} ;
 
export default App ;
