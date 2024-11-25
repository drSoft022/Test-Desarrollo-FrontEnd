import React, { useState } from "react";
import TableComp from "./TableComp";
import FormComp from "./FormComp";
import ModalComp from "./ModalComp"; 
import { Inertia } from "@inertiajs/inertia";

const empleado = (empleados) => {
    if(empleados[0].error || empleados.error){
        return (
            <h1>
                Ocurrio un error al obtener los datos
            </h1>
        )
    }

    const decodeHTML = (html) => {
        const parser = new DOMParser();
        const decodedString = parser.parseFromString(html, 'text/html').body.textContent;
        return decodedString;
    };
      

    const [create, setCreate] = useState(false)

    const isCreating = () => {
        setCreate(!create)
    }

    const titlesParam = [
        "Nombre", "Apellidos", "Identificacion", "Teléfono", "Ciudad", "Departamento"
    ]

    const createFunc = (data, id = null) => {
        Inertia.post('/empleado', data, {
            onSuccess: () => {
                alert('Operacion exitosa!');
                Inertia.visit('/empleado')
            },
            onError: (errors) => {
                console.log("error",errors);
            }
        });
    }

    const editFunc = (data, id) => {
        Inertia.put('/empleado/'+id, data, {
            onSuccess: () => {
                alert('Operacion exitosa!');
                Inertia.visit('/empleado')
            },
            onError: (errors) => {
                console.log("error",errors);
            }
        });
    }

    const pagination = (url) => {
        if(url !== null){
            Inertia.visit(url)
        }
    }

    const elementoParam = [
        empleados[1], empleados[2]
    ]

    return (
        <div>
            <h2>Empleados</h2>
            <button className="buttonMod create m-3" onClick={isCreating}><i className="fa-solid fa-user-plus fa-xl"></i> Agregar</button>
            <a className="buttonMod create m-3" href="/empleado/download"><i className="fa-solid fa-file-arrow-down fa-xl"></i> Descargar</a>
            <TableComp elemento={elementoParam} type={"empleado"} titles={titlesParam} editFunc={editFunc} arr={empleados[0].data}></TableComp>
            {
                create && (
                    <ModalComp closeModal={isCreating} title={"Nuevo Empleado"}>
                        <FormComp ciudades={empleados[1]} departamentos={empleados[2]} onSubFunc={createFunc}></FormComp>
                    </ModalComp>
                )
            }
            {
                empleados[0].links.map((link)=>(
                    <button className="buttonMod pag" key={link.label} onClick={()=>{ pagination(link.url) }}>
                        <strong className="m-2">{decodeHTML(link.label)}</strong>
                    </button>
                ))
            }
        </div>
    )
}

export default empleado