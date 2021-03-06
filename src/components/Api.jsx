import React, {useState, useEffect} from 'react'
import {withRouter} from 'react-router-dom'
import {auth} from '../firebase'



const Api = (props) => {
    //login
    const [user, setUser] = React.useState(null)
    const [tituloPelicula, setTituloPelicula] = useState("") //s -> API busca por título
    //para controlar errores
    const [error, setError] = useState(null)
    //lista de peliculas
    const [peliculas, setPeliculas] = useState([])

    //paginacion
    const [pagina, setPagina] = useState(1)
    const [totalPaginas, setTotalPaginas] = useState("")
    // http://www.omdbapi.com/?apikey=ea1489f1&s=%22Pirates%20of%20the%20Caribbean%22

    const getData = async() => {
        if (tituloPelicula.length < 3 ){
            setError("Más de tres caracteres")
        }
        else{
            setError("")
            const data = await fetch("http://www.omdbapi.com/?apikey=ea1489f1&s="+tituloPelicula+'&page='+pagina);
            const pelis = await data.json()
            console.log(pelis.Response)
            //Ejemplos que si funcionan --> Pirates | Star | Star wars
            if(pelis.Response === "True"){
                console.log("hee")
                setTotalPaginas(pelis.totalResults)
                setPeliculas(pelis.Search)
            }
            //este error salta si buscas "the", por que hay demasiados resultados
            else if(pelis.Error ==="Too many results."){
                setPeliculas([])
                setTotalPaginas(0)
                setError("Demasiados resultados, acote la búsqueda.")
            }
            else if(pelis.Error ==="Movie not found!"){
                setPeliculas([])
                setTotalPaginas(0)
                setError("No he encotrado esa pelicula :(")
            }

        }
    }
    const next = () => {
        //Funciona, pero a partir del segundo click (no se por qué)
        setPagina(pagina+1)
        getData()
    }

    const prev = () => {
        setPagina(pagina-1)
        getData()
    }

    useEffect(()=>{
        if (auth.currentUser) {
            setUser(auth.currentUser)

        } else {
            props.history.push('/login')
        }
    }, [props.history])

    return (
        <div>
            {
                user && (
                    <p>¡Hola! {user.email}</p>
                    
                )
            }
            <p>Bienvenido a la movie database, busque cualquier pelicula:</p> 
            <input
                className="mb-3 text-center"
                type="text"
                placeholder="Título"                
                onChange={(e)=>setTituloPelicula(e.target.value)}
                value={tituloPelicula}
            /> 
            {
                error && ( 
                    <div className="alert alert-danger">{error}</div>
                )
            }
            <p>
            <button  
                className="btn btn-success"
                onClick={ 
                    ()=>{
                        setPagina(1) 
                        getData()
                    }
                }
                >Buscar
            </button>
            </p>

            <div>
                {
                    peliculas.map(pelicula => 
                    <div key={pelicula.imdbID}>
                        <p>{pelicula.Title}</p>
                    </div>
                )}
            </div>
            <div className="botones d-flex mt-3">
                <button 
                    className="btn me-3 btn-info btn-izquierda"
                    onClick={() => prev()}
                    >prev
                    </button>

                    <button class="btn text-dark me-3">
                        <span 
                            class="badge text-dark badge-light">
                            {pagina}
                            / 
                            {parseInt(totalPaginas/10)}
                        </span>
                    </button>

                <button 
                    className="btn btn-info btn-izquierda"
                    onClick={() => next()}
                    >next
                </button>
                

            </div>
        </div>
    )
}

export default withRouter(Api)
