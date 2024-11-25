import React, { useState } from "react";
import TableComp from "./TableComp";
import FormComp from "./FormComp";
import ModalComp from "./ModalComp"; 
import { Inertia } from "@inertiajs/inertia";

const decodeHTML = (html) => {
    const parser = new DOMParser();
    return parser.parseFromString(html, 'text/html').body.textContent || '';
};

const empleado = ( empleados ) => {
    const { error, data, links } = empleados[0];
    const ciudades = empleados[1];
    const departamentos = empleados[2];

    if (error) {
        return <h1>Ocurrió un error al obtener los datos</h1>;
    }

    const [create, setCreate] = useState(false);

    const toggleCreate = () => setCreate(prev => !prev);

    const titlesParam = ["Nombre", "Apellidos", "Identificación", "Teléfono", "Ciudad", "Departamento"];

    const handleRequest = (url, data, method) => {
        Inertia[method](url, data, {
            onSuccess: () => {
                alert('Operación exitosa!');
                Inertia.visit('/empleado');
            },
            onError: (errors) => {
                console.log("error", errors);
            }
        });
    };

    const createFunc = (data) => handleRequest('/empleado', data, 'post');
    const editFunc = (data, id) => handleRequest(`/empleado/${id}`, data, 'put');
    const pagination = (url) => url && Inertia.visit(url);

    return (
        <>
            <h2>Empleados</h2>
            <button className="buttonMod create m-3" onClick={toggleCreate}>
                <i className="fa-solid fa-user-plus fa-xl"></i> Agregar
            </button>
            <a className="buttonMod create m-3" href="/empleado/download">
                <i className="fa-solid fa-file-arrow-down fa-xl"></i> Descargar
            </a>
            <TableComp 
                elemento={[ciudades, departamentos]} 
                type="empleado" 
                titles={titlesParam} 
                editFunc={editFunc} 
                arr={data} 
            />
            {create && (
                <ModalComp closeModal={toggleCreate} title="Nuevo Empleado">
                    <FormComp ciudades={ciudades} departamentos={departamentos} onSubFunc={createFunc} />
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