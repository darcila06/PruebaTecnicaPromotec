import { useState } from "react"


/**
 * Creacion del hook useForm para el manejo de las validaciones de los inputs
 * en los formularios de creacion y edicion.
 */
const useForm = (initialForm, validateForm) => {
    const [form, setForm] = useState(initialForm);
    const [errors, setErrors] = useState({});
    const handleChage = (e) =>{
        const {name, value} = e.target;
        setForm({
            ...form,
            [name]: value
        })
    }

    const handleBlur = (e) =>{
        handleChage(e)
        setErrors(validateForm(form))
    }

    return { form, errors, handleChage, handleBlur 
    }
}

export default useForm;