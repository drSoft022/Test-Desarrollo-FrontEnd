import React, { useState } from "react";

const FormComp = ({roles, empleados, onSubFunc, product}) => {
    const [formValues, setFormValues] = useState({
        empleado : product ? product.empleado : '',
        area : product ? product.area : '',
        cargo : product ? product.cargo : '',
        rol : product ? product.rol : '',
        jefe : product ? product.jefe : '',
    })

    let idCargo = product ? product.id : ''

    const handleChange = (e) => {
        const { id, value } = e.target
        setFormValues({
            ...formValues,
            [id] : value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubFunc(formValues, idCargo)
    }

    return(
        <>
            <form onSubmit={handleSubmit}>
            <div className="m-2">
                    <label className="form-label">Empleados</label>
                    <select 
                        className="form-control"
                        type="text"
                        name="empleado" 
                        id="empleado"
                        value={formValues.empleado}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Seleccione el empleado</option>
                        {
                            empleados.map((item)=>(
                                <option key={item.id} value={item.id}>{item.nombres} {item.Apellidos}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="m-2">
                    <label className="form-label">Area</label>
                    <input
                        className="form-control"
                        type="text"
                        id="area"
                        name="area"
                        value={formValues.area}
                        onChange={handleChange}
                        maxLength="40"
                        placeholder="area"
                        required
                    />
                </div>
                <div className="m-2">
                    <label className="form-label">Cargo</label>
                    <input
                        className="form-control"
                        type="text"
                        id="cargo"
                        name="cargo"
                        value={formValues.cargo}
                        onChange={handleChange}
                        maxLength="50"
                        placeholder="cargo"
                        required
                    />
                </div>
                <div className="m-2">
                    <label className="form-label">Roles</label>
                    <select
                        className="form-control" 
                        type="text"
                        name="rol" 
                        id="rol"
                        value={formValues.rol}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Seleccione el rol</option>
                        {
                            roles.map((item)=>(
                                <option key={item.id} value={item.id}>{item.rol}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="m-2">
                    <label className="form-label">Jefe</label>
                    <input
                        className="form-control"
                        type="text"
                        id="jefe"
                        name="jefe"
                        value={formValues.jefe}
                        onChange={handleChange}
                        maxLength="80"
                        placeholder="jefe"
                        required
                    />
                </div>
                <div className="text-center m-2">
                    <button type="submit" className="btn btn-primary">Aceptar</button>
                </div>
            </form>
        </>
    )
}

export default FormComp