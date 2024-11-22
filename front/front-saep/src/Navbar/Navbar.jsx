import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    return (
        <>
            <div className="bg-white flex xl:gap-[52%] lg:gap-[30%] py-4 font-bold text-lg drop-shadow-md">
                <div className="ml-16">
                    <h1 onClick={() => navigate("/")} className="cursor-pointer">Kanban - Gerenciamento de Tarefas</h1>
                </div>

                <div className="pr-16">
                    <ul className="flex gap-16">
                        <li onClick={() => navigate("/cadastrousuario")} className="cursor-pointer">Cadastro de Usuários</li>
                        <li onClick={() => navigate("/cadastrotarefa")} className="cursor-pointer">Cadastro de Tarefas</li>
                    </ul>
                </div>
            </div>
        </>
    )

}

export default Navbar;