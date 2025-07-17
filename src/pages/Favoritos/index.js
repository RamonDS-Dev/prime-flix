import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './favoritos.css';
import { toast } from 'react-toastify';

function Favoritos() {
    const [filmes, setFilmes] = useState([]);

    useEffect(()=> {
        const minhaLista = localStorage.getItem("@primeflix");
        setFilmes(JSON.parse(minhaLista) || []);

    }, []);


    function excluirFilme(id) {
        // tirar o item da useState e tirar do localstorage e salvar dnv com esse item a menos
        // passar o id do item que eu to clicando, e pelo map eu tenho o id por isso chamamos a arrow function 
        let filtroFilmes = filmes.filter( (item)=> {
            return (item.id !== id);
            // no filme que eu clicar ele mantém os outros com esse filter
        })

        setFilmes(filtroFilmes);
        localStorage.setItem("@primeflix", JSON.stringify(filtroFilmes));

        toast.success('Filme removido com sucesso.');
    }


    return(

        <div className="meus-filmes">
            <h1>Meus Filmes</h1>
            
            {/* condicao que diz que se for igual a 0 ele mostra o span o && ajuda nisso */}
            {filmes.length === 0 && <span>Você não possui nenhum filme salvo :( </span> }

            <ul>
                {filmes.map((item)=> {
                    return(
                        <li key={item.id}>
                            <span>{item.title}</span>
                            <div>
                                <Link to={`/filme/${item.id}`}>Ver Detalhes</Link>
                                <button onClick={()=> excluirFilme(item.id)}>Excluir</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Favoritos;