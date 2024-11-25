import React from "react";

const FormComp = (product) => {
    return(
        <>
            <form action="">
                <div>
                    <label>Product Name</label>
                    <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={formValues.nombre}
                        onChange={handleChange}
                    />
                </div>
            </form>
        </>
    )
}

export default FormComp