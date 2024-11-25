import React, { useState } from "react";

const FormCargo = ({ roles, empleados, onSubFunc, product = {} }) => {
    const { empleado = '', area = '', cargo = '', rol = '', jefe = '', id: idCargo = '' } = product;

    const [formValues, setFormValues] = useState({
        empleado,
        area,
        cargo,
        rol,
        jefe
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [id]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubFunc(formValues, idCargo);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="m-2">
                <label className="form-label">Empleados</label>
                <select
                    className="form-control"
                    id="empleado"
                    value={formValues.empleado}
                    onChange={handleChange}
                    required
                >
                    <option value="">Seleccione el empleado</option>
                    {empleados.map(({ id, nombres, Apellidos }) => (
                        <option key={id} value={id}>
                            {nombres} {Apellidos}
                        </option>
                    ))}
                </select>
            </div>
            <div className="m-2">
                <label className="form-label">Area</label>
                <input
                    className="form-control"
                    type="text"
                    id="area"
                    value={formValues.area}
                    onChange={handleChange}
                    maxLength="40"
                    placeholder="Área"
                    required
                />
            </div>
            <div className="m-2">
                <label className="form-label">Cargo</label>
                <input
                    className="form-control"
                    type="text"
                    id="cargo"
                    value={formValues.cargo}
                    onChange={handleChange}
                    maxLength="50"
                    placeholder="Cargo"
                    required
                />
            </div>
            <div className="m-2">
                <label className="form-label">Roles</label>
                <select
                    className="form-control"
                    id="rol"
                    value={formValues.rol}
                    onChange={handleChange}
                    required
                >
                    <option value="">Seleccione el rol</option>
                    {roles.map(({ id, rol }) => (
                        <option key={id} value={id}>
                            {rol}
                        </option>
                    ))}
                </select>
            </div>
            <div className="m-2">
                <label className="form-label">Jefe</label>
                <input
                    className="form-control"
                    type="text"
                    id="jefe"
                    value={formValues.jefe}
                    onChange={handleChange}
                    maxLength="80"
                    placeholder="Jefe"
                    required
                />
            </div>
            <div className="text-center m-2">
                <button type="submit" className="btn btn-primary">Aceptar</button>
            </div>
        </form>
    );
};

export default FormCargo;