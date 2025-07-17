import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './filme-info.css';
import api from '../../services/api';
import { toast } from 'react-toastify';


function Filme() {

    // pegando o id do filme baseado na rota que usamos ":id", por isso no const ta sendo definido com ele  
    const { id } = useParams();

    // navigate(tb um hook) para que quando cair no catch ele enviar o usuario de volta para a home
    const navigation = useNavigate();


    const [filme, setFilme] = useState({}); // vamos armazenar aqui a response da requisição
    const [loading, setLoading] = useState(true); // pra ter um texto enquanto carrega

    useEffect(() => {
        async function loadFilme() {
            const apiKey = process.env.REACT_APP_API_KEY;
            await api.get(`/movie/${id}`, {
                params: {
                    api_key: apiKey,
                    language: "pt-BR",
                }
            })
            // o get termina aqui, e quero que se o usuario colocar qualquer coisa diretamente na url ele seja redirecionado dnv pra Home
            // se for sucesso ele cai nesse then
            .then((response)=> {
                setFilme(response.data);
                setLoading(false);
            })
            .catch(()=>{
                // aqui é pra quando o filme nao for encontrado 
                navigation('/', { replace: true }); // replace redireciona
                return;
            })
        }

        loadFilme();

        // quando ele ta na tela do filme e volta para a tela principal o nosso Filme Detalhes é desmontado então podemos usar esta função de return com arrow func
        return() => {
            console.log('o componente foi desmontado');
        }

    // hooks incluidos no array de dependencias do useEffect
    }, [navigation, id])


    function salvarFilme() {
        const minhaLista = localStorage.getItem('@primeflix');

        let filmesSalvos = JSON.parse(minhaLista) || [];

        // metodo pra verificar se na lista tem pelo menos um item com a comparação que fizermos, retorna booleano
        const hasFilme = filmesSalvos.some((filmesSalvo) => filmesSalvo.id === filme.id)

        if(hasFilme) {
            toast.warn('Esse filme já está na sua lista.');
            return;
        }

        // filme é objeto que ta la no nosso objeto do useState
        filmesSalvos.push(filme);

        // salva o filme
        localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));

        // alert de sucesso com toast
        toast.success('Filme salvo com sucesso.')
    }


    if(loading) {
        return(
            <div className="filme-info">
                <h1>Carregando detalhes...</h1>
            </div>
        )
    }

    return (
        <div className="filme-info">
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />

            <h3>Sinopse</h3>
            <span>{filme.overview}</span>

            <strong>Avaliação: {Math.floor(filme.vote_average)} / 10</strong>

            <div className="area-buttons">
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a target="_blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>
                        Trailer
                    </a>
                </button>
            </div>

        </div>
    )
}

export default Filme;