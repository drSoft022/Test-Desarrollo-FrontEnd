import React, { useState } from "react";
import FormComp from "./FormComp";
import ModalComp from "./ModalComp"; 
import { Inertia } from "@inertiajs/inertia";

const TableComp = ({elemento, type, titles, editFunc, arr}) => {
    const [isEditing, setIsEditing] = useState(false)
    const [toEdit, setToEdit] = useState([])
    const [deleteI, setDeleteI] = useState(false)
    const [toDelete, setToDelete] = useState()

    const editForm = (itemParam) => {
        setIsEditing(!isEditing)
        if(itemParam){
            setToEdit(itemParam)
        }
    }

    const dropFunc = (id) => {
        setDeleteI(!deleteI)
        setToDelete(id)
    }

    const deleteItem = (id) => {
        Inertia.delete('/destroy/'+id, {
            onFinish: () =>{
                alert('Operacion exitosa!')
                Inertia.visit('/empleado')
            },
            onError: (errors) => {
                console.log("upsi",errors);
            }
        })
    }

    return(
        <div className="table-responsive">
            <table className="table">
                <thead className="table-light">
                    <tr>
                        <th scope="col">#</th>
                        {
                            titles.map((title)=>(
                                <th key={title} scope="col">{title}</th>
                            ))
                        }
                        <th scope="col">Editar</th>
                        <th scope="col">Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        arr.map((item)=>(
                            <tr key={item.id}>
                                <th scope="row">{item.id}</th>
                                <td>{item.nombres}</td>
                                <td>{item.Apellidos}</td>
                                <td>{item.identificacion}</td>
                                <td>{item.telefono}</td>
                                <td>{item.ciudad}</td>
                                <td>{item.departamento}</td>
                                <td><button className="buttonMod" onClick={()=>{editForm(item)}}><i className="fa-solid fa-pencil fa-xl color"></i></button></td>
                                <td><button className="buttonMod" onClick={()=>{dropFunc(item.id)}}><i className="fa-solid fa-trash-can fa-xl color"></i></button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            {
                isEditing && (
                    <ModalComp closeModal={editForm} title={"Editar Empleado"}>
                        {
                            type === "empleado" && (
                                <FormComp ciudades={elemento[0]} departamentos={elemento[1]} onSubFunc={editFunc} product={toEdit}></FormComp>
                            )
                        }
                    </ModalComp>
                 )
            }
            {
                deleteI && (
                    <ModalComp closeModal={dropFunc} title={"Eliminacion"}>
                        <div className="text-center">
                            Esta seguro de borrar el registro?
                            <br></br>
                            <button className="btn btn-danger" onClick={()=>{deleteItem(toDelete)}}>Aceptar</button>
                        </div>
                    </ModalComp>
                )
            }
        </div>
    )
}

export default TableComp