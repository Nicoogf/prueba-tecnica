import { type User } from "../types.d" ; 

interface Props{
    users: User[]
}


export function UserList ({ users }: Props) {
    return(
        <table width='100%'>
            <thead>
                <th>Foto</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Pais</th>
                <th>Accion</th>
            </thead>


            <tbody>
                {
                    users.map( (user)=>{
                        return (
                        <tr key={user.id.value}> 
                            <td>
                                <img src ={ user.picture.thumbnail }></img>
                            </td>

                            <td> { user.name.first } </td>
                            <td> { user.name.last } </td>
                            <td> { user.location.country } </td>
                            <td> <button> Eliminar </button> </td>
                        </tr>
                        )
                    } )
                }
            </tbody>
        </table>
    )
}