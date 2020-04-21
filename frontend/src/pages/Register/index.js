import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'

import api from '../../services/api';
import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Register() {

    // Para manusear todos o valores dos campos por meio do estado deles
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    const history = useHistory(); // Serve para fazer a navegação do JS, quando não se pode usar o Link do react-router-dom

    async function handleRegister(e) {

        e.preventDefault();

        // Para armazenar os valores dos campos
        const data = {
            name,
            email,
            whatsapp,
            city,
            uf
        };

        try {

            // Chamando a api com o método POST para salvar uma ong (se passa primeiro a rota e depois o valor, por padrão o axios já manda tudo em JSON)
            const response = await api.post('ongs', data);
    
            alert(`Seu ID de acesso: ${response.data.id}`);

            history.push('/'); // Para enviar par a tela inicial
            
        } catch (err) {

            alert('Erro no cadastro');
        }
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="logo"></img>

                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na platagorma e ajude pessoas a encontrarem os casos da sua ONG.</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#e02041"/>
                        Voltar para a tela inicial
                    </Link>
                </section>

                <form onSubmit={ handleRegister }>
                    <input 
                        placeholder="Nome da ONG"
                        value={name}
                        onChange={e => setName(e.target.value)} // Representa o valor do input, que será armazenado dentro da variável 'name'
                    />

                    <input 
                        type="email" 
                        placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />

                    <input 
                        placeholder="WhatsApp"
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)}
                    />
                    
                    <div className="input-group">
                        <input 
                            placeholder="Cidade"
                            value={city}
                            onChange={e => setCity(e.target.value)}
                        />

                        <input 
                            placeholder="UF" 
                            style={{width: 80}}
                            value={uf}
                            onChange={e => setUf(e.target.value)}
                        />
                    </div>

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}