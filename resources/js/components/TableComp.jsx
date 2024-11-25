import React from "react";

const TableComp = ({titles, arr}) => {
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
                                <td>||</td>
                                <td>||</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default TableComp