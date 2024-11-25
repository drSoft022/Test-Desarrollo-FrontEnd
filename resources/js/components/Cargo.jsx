import React, { useState } from "react";
import TableComp from "./TableComp";
import FormCargo from "./FormCargo";
import ModalComp from "./ModalComp"; 
import { Inertia } from "@inertiajs/inertia";

const cargo = (cargos) => {
    if(cargos[0].error || cargos.error){
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
        "Empleado", "Area", "Cargo", "Rol", "Jefe"
    ]

    const createFunc = (data, id = null) => {
        Inertia.post('/cargo', data, {
            onSuccess: () => {
                alert('Operacion exitosa!');
                Inertia.visit('/cargo')
            },
            onError: (errors) => {
                console.log("error",errors);
            }
        });
    }

    const editFunc = (data, id) => {
        Inertia.put('/cargo/'+id, data, {
            onSuccess: () => {
                alert('Operacion exitosa!');
                Inertia.visit('/cargo')
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
        cargos[1], cargos[2]
    ]

    return (
        <div>
            <h2>Cargos</h2>
            <button className="buttonMod create m-3" onClick={isCreating}><i className="fa-solid fa-user-plus fa-xl"></i> Agregar</button>
            <a className="buttonMod create m-3" href="/cargo/download"><i className="fa-solid fa-file-arrow-down fa-xl"></i> Descargar</a>
            <TableComp elemento={elementoParam} type={"cargo"} titles={titlesParam} editFunc={editFunc} arr={cargos[0].data}></TableComp>
            {
                create && (
                    <ModalComp closeModal={isCreating} title={"Nuevo Cargo"}>
                        <FormCargo empleados={cargos[1]} roles={cargos[2]} onSubFunc={createFunc}></FormCargo>
                    </ModalComp>
                )
            }
            {
                cargos[0].links.map((link)=>(
                    <button className="buttonMod pag" key={link.label} onClick={()=>{ pagination(link.url) }}>
                        <strong className="m-2">{decodeHTML(link.label)}</strong>
                    </button>
                ))
            }
        </div>
    )
}

export default cargo