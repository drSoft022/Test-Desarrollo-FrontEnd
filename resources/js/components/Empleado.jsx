import React, { useState } from "react";
import TableComp from "./TableComp";
import FormComp from "./FormComp";
import ModalComp from "./ModalComp"; 

const empleado = (empleados) => {

    const [create, setCreate] = useState(false)

    const isCreating = () => {
        setCreate(!create)
    }

    const titlesParam = [
        "Nombre", "Apellidos", "Identificacion", "Teléfono", "Ciudad", "Departamento"
    ]
    return (
        <div>
            <h2>Empleados</h2>
            <button onClick={isCreating}>Agregar</button>
            <TableComp titles={titlesParam} arr={empleados.data}></TableComp>
            {
                create && (
                    <ModalComp closeModal={isCreating}>
                        <FormComp></FormComp>
                    </ModalComp>
                )
            }
        </div>
    )
}

export default empleado