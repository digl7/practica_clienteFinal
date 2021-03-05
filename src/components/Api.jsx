import React, {useState, useEffect} from 'react'
import {withRouter} from 'react-router-dom'
import {auth} from '../firebase'



const Api = (props) => {
    const [user, setUser] = React.useState(null)
    const [tituloPelicula, setTituloPelicula] = useState("") //s
    const [peliculas, setPeliculas] = useState([])
    const [error, setError] = useState(null)
    // http://www.omdbapi.com/?apikey=ea1489f1&s=%22Pirates%20of%20the%20Caribbean%22

    const componentDidMount =  async ()=> {
        if (tituloPelicula.length < 3 ){
            setError("Más de tres caracteres")
        }else{
            const url = "http://www.omdbapi.com/?apikey=ea1489f1&s="+tituloPelicula;
            const response = await fetch(url);
            const data = await response.json()
            setPeliculas(data.Search) //Array de peliculas
            setError("")
            
        }

    }

    useEffect(()=>{
        if (auth.currentUser) {
            setUser(auth.currentUser)

        } else {
            props.history.push('/login')
        }
    }, [props.history])

    //para renderizar los títulos de las películas.
    const peliculasBuscadas = peliculas.map((pelicula, index) => {
        return (
        <p>{index+1+". "+ pelicula.Title}</p>
        );
      });

    return (
        <div>
            {
                user && (
                    <p>¡Hola! {user.email}</p>
                )
            }
            {
                error && ( 
                    <div className="alert alert-danger">{error}</div>
                )
            }
            <input  
                type="text"
                placeholder="Título a buscar"                
                required
                onChange={(e)=>setTituloPelicula(e.target.value)}
                value={tituloPelicula}
            /> 
            <br/> <br/>
            <button  
                className="btn btn-success"
                onClick={()=>componentDidMount()}
            >Buscar</button>

            <div>
                {peliculasBuscadas}
            </div>


            
        </div>
    )
}

export default withRouter(Api)
