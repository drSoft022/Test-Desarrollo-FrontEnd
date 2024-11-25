import React, { useState } from "react";
import TableComp from "./TableComp";
import FormCargo from "./FormCargo";
import ModalComp from "./ModalComp"; 
import { Inertia } from "@inertiajs/inertia";

const decodeHTML = (html) => {
    const parser = new DOMParser();
    return parser.parseFromString(html, 'text/html').body.textContent || '';
};

const empleado = ( cargos ) => {
    const { error, data, links } = cargos[0];
    const empleados = cargos[1];
    const roles = cargos[2];

    if (error) {
        return <h1>Ocurrió un error al obtener los datos</h1>;
    }

    const [create, setCreate] = useState(false);

    const toggleCreate = () => setCreate(prev => !prev);

    const titlesParam = ["Empleado", "Area", "Cargo", "Rol", "Jefe"];

    const handleRequest = (url, data, method) => {
        Inertia[method](url, data, {
            onSuccess: () => {
                alert('Operación exitosa!');
                Inertia.visit('/cargo');
            },
            onError: (errors) => {
                console.log("error", errors);
            }
        });
    };

    const createFunc = (data) => handleRequest('/cargo', data, 'post');
    const editFunc = (data, id) => handleRequest(`/cargo/${id}`, data, 'put');
    const pagination = (url) => url && Inertia.visit(url);

    return (
        <>
            <h2>Cargos</h2>
            <button className="buttonMod create m-3" onClick={toggleCreate}>
                <i className="fa-solid fa-user-plus fa-xl"></i> Agregar
            </button>
            <a className="buttonMod create m-3" href="/cargo/download">
                <i className="fa-solid fa-file-arrow-down fa-xl"></i> Descargar
            </a>
            <TableComp 
                elemento={[roles, empleados]} 
                type="cargo" 
                titles={titlesParam} 
                editFunc={editFunc} 
                arr={data} 
            />
            {create && (
                <ModalComp closeModal={toggleCreate} title="Nuevo Empleado">
                    <FormCargo roles={roles} empleados={empleados} onSubFunc={createFunc} />
                </ModalComp>
            )}
            {links && links.map(link => (
                link.url && (
                    <button className="buttonMod pag" key={link.label} onClick={() => pagination(link.url)}>
                        <strong className="m-2">{decodeHTML(link.label)}</strong>
                    </button>
                )
            ))}
        </>
    );
};

export default empleado;