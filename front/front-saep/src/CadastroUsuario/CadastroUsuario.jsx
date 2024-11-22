import { useState } from "react";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CadastroUsuario() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");

    const register = () => toast.success("Usuário cadastrado com sucesso!");
    const valuesNull = () => toast.warning("Todos os campos são obrigatórios!");
    const invalidEmail = () => toast.warning("Formato de e-mail inválido!");
    const errorMessage = () => toast.error("Erro ao cadastrar usuário!");

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const registerUsuarios = async () => {
        if (!nome || !email) {
            valuesNull();
            return;
        }

        if (!validateEmail(email)) {
            invalidEmail();
            return;
        }

        try {
            await axios.post("http://localhost:8080/kanban/usuarios",
                {
                    nome: nome,
                    email: email,
                }
            );
            register();
            setNome("");
            setEmail("");
        } catch (error) {
            errorMessage();
        }
    };

    return (
        <>
            <Navbar />

            <ToastContainer/>

            <div className="flex justify-center xl:mt-[12%] lg:mt-[10%]">
                <div className="bg-gray-100 p-4 block gap-2 xl:w-[25%] lg:w-[30%] drop-shadow-lg text-center rounded-lg">
                    <h1 className="p-4 font-semibold text-lg">Cadastre um usuário aqui: </h1>
                    <input type="text" name="" id="" placeholder="Insira o nome do usuário" className="rounded-lg mt-4 mb-4 pl-[15px] py-[10px] w-[90%]"
                        onChange={(e) => setNome(e.target.value)}
                        value={nome} />
                    <input type="email" name="" id="" placeholder="Insira o email do usuário" className="rounded-lg mb-4 pl-[15px] py-[10px] w-[90%]"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                    <button type="submit" className="my-4 bg-[#fca311] text-white font-semibold px-[30px] py-[10px] hover:drop-shadow-md hover:bg-[#fca31198]" onClick={registerUsuarios}>Criar Usuário</button>
                </div>
            </div>
        </>
    )
}

export default CadastroUsuario;