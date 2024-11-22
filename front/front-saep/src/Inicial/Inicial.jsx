import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import edit from '../assets/edit.png'
import trash from '../assets/trash.png'
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Inicial() {
    const [tarefas, setTarefas] = useState([]);
    const navigate = useNavigate();

    const deletada = () => toast.success("Tarefa deletada com sucesso!");
    const errorMessage = () => toast.error("Erro ao deletar tarefa!");

    const formatarData = (data) => {
        const dataFormatada = new Date(data);
        return dataFormatada.toLocaleDateString("pt-BR");
    };    

    const getTarefas = async () => {
        try {
            const response = await axios.get("http://localhost:8080/kanban/tarefas");
            setTarefas(response.data);
        } catch (error) {
            console.error("Erro ao buscar tarefas: ", error);
        }
    };

    const deleteTarefa = async (tarefa) => {
        try {
            await axios.delete(`http://localhost:8080/kanban/tarefas/${tarefa.idTarefa}`);
            deletada();
        } catch (error) {
            errorMessage();
        }
    };

    useEffect(() => {
        getTarefas();
    }, [tarefas]);

    const renderTarefasPorStatus = (status) => {
        const tarefasFiltradas = tarefas.filter((tarefa) => tarefa.status === status);

        if (tarefasFiltradas.length === 0) {
            return <p className="p-4 text-center font-semibold">Sem tarefas para esse card</p>;
        }

        return tarefasFiltradas.map((tarefa) => (
            <div key={tarefa.idTarefa} className="mt-4 lg:p-4 m-[5%] bg-white drop-shadow-lg">
                <p>Descrição: {tarefa.descricao}</p>
                <p>Setor: {tarefa.nomeSetor}</p>
                <p>Prioridade: {tarefa.prioridade}</p>
                <p>Usuário: {tarefa.usuarioModel.nome}</p>
                <p>Data de Cadastro: {formatarData(tarefa.dataCadastro)}</p>
                <div className="flex gap-4 py-4">
                    <img src={edit} alt="" width={25} className="cursor-pointer" onClick={() => navigate("/cadastrotarefa", { state: tarefa })} />
                    <img src={trash} alt="" width={25} className="cursor-pointer" onClick={() => deleteTarefa(tarefa)} />
                </div>
            </div>
        ));
    };

    return (
        <>
            <Navbar />

            <ToastContainer/>

            <div className="flex gap-[3%] justify-center mt-16">
                <div className="bg-gray-100 w-[30%] rounded-lg">
                    <div className="bg-gradient-to-r from-red-900 via-red-600 to-red-400 lg:p-1 rounded-t-lg"></div>
                    <h1 className="p-4 text-left text-lg font-semibold ml-[1%]">A FAZER</h1>
                    {renderTarefasPorStatus("A Fazer")}
                </div>

                <div className="bg-gray-100 w-[30%] rounded-lg">
                    <div className="bg-gradient-to-r from-amber-900 via-amber-600 to-amber-400 lg:p-1 rounded-t-lg"></div>
                    <h1 className="p-4 text-left text-lg font-semibold ml-[1%]">FAZENDO</h1>
                    {renderTarefasPorStatus("Fazendo")}
                </div>

                <div className="bg-gray-100 w-[30%] rounded-lg">
                    <div className="bg-gradient-to-r from-green-900 via-green-600 to-green-400 lg:p-1 rounded-t-lg"></div>
                    <h1 className="p-4 text-left text-lg font-semibold ml-[1%]">PRONTO</h1>
                    {renderTarefasPorStatus("Pronto")}
                </div>
            </div>
        </>
    );
}

export default Inicial;
