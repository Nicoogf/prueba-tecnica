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
  const [ usuarios , setUsuarios ] = useState<Array<User>>([])




/**
 *  Estado de Colores:
 *  showColors    ---  Colores
 *  setShowColors ---  SetColores 
*/
  const [ colores , setColores ] = useState( false )



  /**
   *  Estado de Paises:
   *  sortByCountry  --- ordenarPaises
   *  setByCountry   --- SetOrdenarPaises
   */

  const [ ordenarPaises , SetOrdenarPaises ] = useState( false )

 


  
/**
 * La siguiente Variable es la que va a guardar el array de usuarios
 * ordenados alfabeticamente
 * sortedUsers ---- UsuariosOrdenados
 */

    const UsuariosOrdenados = ordenarPaises
    ?  usuarios.toSorted( ( a , b) => {
      return a.location.country.localeCompare( b.location.country)
    })
    :usuarios



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
      setUsuarios( respuesta.results )
    })
    .catch( err => {
      console.error( err )
    })
    .finally()
  } , [] )


  /* ToggleColors es la funcion del boton para cambiar colores */
  const  ToggleColors = () =>{
    setColores(!colores)
  }



  /* toggleOrdenarPaises es la funcion que se encarga de ordenar los paises
  *
  */

  const toggleOrdenarPaises = () =>{
    SetOrdenarPaises (estadoPrevio => !estadoPrevio)
  }

  /**
   * Eliminacion de usuarios por Botton
   *  handleDelete --- EliminarUsuarios
   *  filteredUsers --- filtrarUsuarios
   */

  const eliminarUsuarios = ( email:string ) =>{
    const usuariosFiltrados = usuarios.filter(( user ) => user.email !== email )
        setUsuarios( usuariosFiltrados )
    }
  





  return(
    <div>

      <h1>Listado de Usuarios</h1>
      <header>
        <button onClick={ ToggleColors }> Cambiar color</button>
        <button onClick={ toggleOrdenarPaises }> 
        { ordenarPaises ? 'No ordenar por Paises' : 'Ordenar por Paises'}</button>
      </header>


      { /*Se pasa por Props a UserList ({ usuarios  , colores } : Props */}
      <UserList usuarios={ UsuariosOrdenados } colores={ colores } eliminarUsuario= { eliminarUsuarios }/>

    </div>
  ) ;
} ;
 
export default App ;
