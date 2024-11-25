import React, { useState, useEffect, useCallback } from "react";

const FormComp = ({ ciudades, departamentos, onSubFunc, product }) => {
  const { id, nombres = '', Apellidos = '', identificacion = '', telefono = '', id_ciudad = '', id_departamento = '' } = product || {};
  
  const [formValues, setFormValues] = useState({
    nombres,
    Apellidos,
    identificacion,
    telefono,
    id_ciudad,
    id_departamento,
  });

  useEffect(() => {
    setFormValues({
      nombres,
      Apellidos,
      identificacion,
      telefono,
      id_ciudad,
      id_departamento,
    });
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    onSubFunc(formValues, id || '');
  }, [formValues, id, onSubFunc]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="m-2">
        <label className="form-label">Nombre</label>
        <input
          className="form-control"
          type="text"
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
          name="Apellidos"
          value={formValues.Apellidos}
          onChange={handleChange}
          minLength="3"
          placeholder="Apellidos empleado"
          required
        />
      </div>

      <div className="m-2">
        <label className="form-label">Identificación</label>
        <input
          className="form-control"
          type="text"
          name="identificacion"
          value={formValues.identificacion}
          onChange={handleChange}
          minLength="10"
          maxLength="10"
          placeholder="Número de máximo 10 caracteres"
          required
        />
      </div>

      <div className="m-2">
        <label className="form-label">Teléfono</label>
        <input
          className="form-control"
          type="text"
          name="telefono"
          value={formValues.telefono}
          onChange={handleChange}
          minLength="10"
          maxLength="10"
          placeholder="Número de máximo 10 caracteres"
          required
        />
      </div>

      <div className="m-2">
        <label className="form-label">Ciudades</label>
        <select
          className="form-control"
          name="id_ciudad"
          value={formValues.id_ciudad}
          onChange={handleChange}
          required
        >
          <option value="">Seleccione la ciudad</option>
          {ciudades.map((item) => (
            <option key={item.id} value={item.id}>
              {item.ciudad}
            </option>
          ))}
        </select>
      </div>

      <div className="m-2">
        <label className="form-label">Departamentos</label>
        <select
          className="form-control"
          name="id_departamento"
          value={formValues.id_departamento}
          onChange={handleChange}
          required
        >
          <option value="">Seleccione el departamento</option>
          {departamentos.map((item) => (
            <option key={item.id} value={item.id}>
              {item.departamento}
            </option>
          ))}
        </select>
      </div>

      <div className="text-center m-2">
        <button type="submit" className="btn btn-primary">
          Aceptar
        </button>
      </div>
    </form>
  );
};

export default FormComp;