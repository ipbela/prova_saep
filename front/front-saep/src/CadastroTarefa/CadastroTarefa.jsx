import { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CadastroTarefa() {
    const navigate = useNavigate();
    const location = useLocation();
    const tarefa = location.state || {};

    const [descricao, setDescricao] = useState(tarefa.descricao || "");
    const [setor, setSetor] = useState(tarefa.nomeSetor || "");
    const [prioridade, setPrioridade] = useState(tarefa.prioridade || "");
    const [status, setStatus] = useState(tarefa.status || "");
    const [selectUsuarioId, setSelectUsuarioId] = useState(tarefa.usuarioModel?.idUsuario || "");
    const [usuarios, setUsuarios] = useState([]);

    const date = tarefa.dataCadastro || new Date().toISOString().split("T")[0];

    const register = () => toast.success("Tarefa cadastrada com sucesso!");
    const edit = () => toast.success("Tarefa editada com sucesso!");
    const valuesNull = () => toast.warning("Todos os campos são obrigatórios!");
    const errorMessage = () => toast.error("Erro ao cadastrar tarefa!");

    const getUsuarios = async () => {
        try {
            const response = await axios.get("http://localhost:8080/kanban/usuarios");
            setUsuarios(response.data);
        } catch (error) {
            console.error("Erro ao buscar usuarios: ", error)
        }
    };

    const registerTarefa = async () => {
        if (!descricao || !setor || !prioridade || !selectUsuarioId) {
            valuesNull();
            return;
        }

        const payload = {
            descricao,
            nomeSetor: setor,
            prioridade,
            dataCadastro: date,
            status,
            idUsuario: selectUsuarioId
        };

        try {
            if (tarefa.idTarefa) {
                await axios.put(`http://localhost:8080/kanban/tarefas/${tarefa.idTarefa}`, payload);
                navigate("/")
                edit();
            } else {
                await axios.post("http://localhost:8080/kanban/tarefas",
                    {
                        descricao: descricao,
                        nomeSetor: setor,
                        prioridade: prioridade,
                        dataCadastro: date,
                        status: status,
                        idUsuario: selectUsuarioId,
                    }
                );
                register();
                setDescricao("");
                setSetor("");
                setPrioridade("");
                setStatus("");
                setSelectUsuarioId("");
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getUsuarios();
    }, []);

    return (
        <>
            <Navbar />

            <ToastContainer/>

            <div className="flex justify-center xl:mt-[10%] lg:mt-[7%]">
                <div className="bg-gray-100 p-4 block gap-2 w-[30%] drop-shadow-lg text-center rounded-lg">
                    <h1 className="p-4 font-semibold text-lg">{tarefa.idTarefa ? "Altere as informações da tarefa aqui: " : "Cadastre a tarefa aqui: "}</h1>
                    <input type="text" name="" id="" placeholder="Insira a descrição da tarefa" className="rounded-lg mt-4 mb-4 pl-[15px] py-[10px] w-[90%]"
                        onChange={(e) => setDescricao(e.target.value)}
                        value={descricao} />
                    <input type="text" name="" id="" placeholder="Insira o setor da tarefa" className="rounded-lg mb-4 pl-[15px] py-[10px] w-[90%]"
                        onChange={(e) => setSetor(e.target.value)}
                        value={setor}
                    />
                    <select name="" id="" className="rounded-lg mb-4 pl-[15px] py-[10px] w-[90%]"
                        onChange={(e) => setPrioridade(e.target.value)}
                        value={prioridade}
                    >
                        <option value="">Escolha uma prioridade: </option>
                        <option value="BAIXA">Baixa</option>
                        <option value="MEDIA">Media</option>
                        <option value="ALTA">Alta</option>
                    </select>
                    <select name="" id="" className="rounded-lg mb-4 pl-[15px] py-[10px] w-[90%]"
                        onChange={(e) => setStatus(e.target.value)}
                        value={status}
                    >
                        <option value="">Escolha um status: </option>
                        <option value="A Fazer">A Fazer</option>
                        <option value="Fazendo">Fazendo</option>
                        <option value="Pronto">Pronto</option>
                    </select>
                    <select name="" id="" className="rounded-lg mb-4 pl-[15px] py-[10px] w-[90%]" value={selectUsuarioId} onChange={(e) => setSelectUsuarioId(e.target.value)}>
                        <option value="">Escolha um usuário: </option>
                        {usuarios.map((usuario, index) => (
                            <option key={index} value={usuario.idUsuario}>
                                {usuario.nome}
                            </option>
                        ))};
                    </select>
                    <button type="submit" className="my-4 bg-[#fca311] text-white font-semibold px-[30px] py-[10px] hover:drop-shadow-md hover:bg-[#fca31198]" onClick={registerTarefa}>
                        {tarefa.idTarefa ? "Salvar Alterações" : "Criar Tarefa"}
                    </button>
                </div>
            </div>
        </>
    )
}

export default CadastroTarefa;