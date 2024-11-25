import React, { useState } from "react";

const FormComp = ({ciudades, departamentos, onSubFunc, product}) => {
    const [formValues, setFormValues] = useState({
        nombres : product ? product.nombres : '',
        Apellidos : product ? product.Apellidos : '',
        identificacion : product ? product.identificacion : '',
        telefono : product ? product.telefono : '',
        id_ciudad : product ? product.id_ciudad : '',
        id_departamento : product ? product.id_departamento : '',
    })

    let idEmpleado = product ? product.id : ''

    const handleChange = (e) => {
        const { id, value } = e.target
        setFormValues({
            ...formValues,
            [id] : value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubFunc(formValues, idEmpleado)
    }

    return(
        <>
            <form onSubmit={handleSubmit}>
                <div className="m-2">
                    <label className="form-label">Nombre</label>
                    <input
                        className="form-control"
                        type="text"
                        id="nombres"
                        name="nombres"
                        value={formValues.nombres}
                        onChange={handleChange}
                        minLength="3"
                        placeholder="Nombre empleado"
                        required
                    />
                </div>
                <div className="m-2">
                    <label className="form-label">Apellidos</label>
                    <input
                        className="form-control"
                        type="text"
                        id="Apellidos"
                        name="Apellidos"
                        value={formValues.Apellidos}
                        onChange={handleChange}
                        minLength="3"
                        placeholder="Apellidos empleado"
                        required
                    />
                </div>
                <div className="m-2">
                    <label className="form-label">Identificacion</label>
                    <input
                        className="form-control"
                        type="text"
                        id="identificacion"
                        name="identificacion"
                        value={formValues.identificacion}
                        onChange={handleChange}
                        minLength="10"
                        maxLength="10"
                        placeholder="Numero de maximo 10 caracteres"
                        required
                    />
                </div>
                <div className="m-2">
                    <label className="form-label">Teléfono</label>
                    <input
                        className="form-control"
                        type="text"
                        id="telefono"
                        name="telefono"
                        value={formValues.telefono}
                        onChange={handleChange}
                        minLength="10"
                        maxLength="10"
                        placeholder="Numero de maximo 10 caracteres"
                        required
                    />
                </div>
                <div className="m-2">
                    <label className="form-label">Ciudades</label>
                    <select
                        className="form-control" 
                        type="text"
                        name="id_ciudad" 
                        id="id_ciudad"
                        value={formValues.id_ciudad}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Seleccione la ciudad</option>
                        {
                            ciudades.map((item)=>(
                                <option key={item.id} value={item.id}>{item.ciudad}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="m-2">
                    <label className="form-label">Departamentos</label>
                    <select 
                        className="form-control"
                        type="text"
                        name="id_departamento" 
                        id="id_departamento"
                        value={formValues.id_departamento}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Seleccione la departamento</option>
                        {
                            departamentos.map((item)=>(
                                <option key={item.id} value={item.id}>{item.departamento}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="text-center m-2">
                    <button type="submit" className="btn btn-primary">Aceptar</button>
                </div>
            </form>
        </>
    )
}

export default FormComp