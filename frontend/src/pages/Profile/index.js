import React, { useState, useEffect } from 'react'; // useEffect serve para disparar alguma função em algum determinado momento do componente
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Profile() {

    const history = useHistory();

    const [incidents, setIncidents] = useState([]);

    // Para utilizar os valores armazenados no localStorage
    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');

    // Função que faz o preenchimento dos registros da tela
    // Primeiro parâmetro: funções que serão executadas; Segundo parâmetro: quando elas serão executadas
    useEffect(() => {

        // Acessando a API, para pegar todas as informações referentes a uma ONG por meio do ID
        api.get('profile', {
            headers: {
                Authorization: ongId
            }
        }).then(response => {

            setIncidents(response.data);
        })

    }, [ongId]);

    // Função para deletar um registro
    async function handleDeleteIncident(id) {

        try {

            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId
                }
            });

            // Faz um filtro nos incidentes para mostrá-los novamente, desde que sejam diferentes do ID que foi excluído
            setIncidents(incidents.filter(incident => incident.id !== id));

        } catch (err) {

            alert('Erro ao deletar caso, tente novamente.');
        }
    }

    // Função para fazer o logout
    function handleLogout() {

        localStorage.clear();

        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be the hero" />
                <span>Bem vinda, {ongName}</span>

                <Link to="/incidents/new" className="button">Cadastrar novo caso</Link>

                <button type="button" onClick={handleLogout}>
                    <FiPower size={18} color="#e02041" />
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
                {incidents.map(incident => ( // 
                    <li key={incident.id}>
                        <strong>CASO</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIÇÃO</strong>
                        <p>{incident.description}</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

                        <button type="button" onClick={() => handleDeleteIncident(incident.id)}>
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}