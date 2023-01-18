import React from "react";
import { useState } from "react";
import Swal from "sweetalert2";
import "./Form.css";
import withReactContent from "sweetalert2-react-content";
import appFirebase from "../Firebase/Firebase";
import { getFirestore, addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
const db = getFirestore(appFirebase);

const MySwal = withReactContent(Swal);

const jsonForm = {
  items: [
    {
      type: "text",
      label: "Nombre completo",
      name: "full_name",
      required: true,
    },
    {
      type: "email",
      label: "Correo electrónico",
      name: "email",
      required: true,
    },
    {
      type: "date",
      label: "Fecha de nacimiento",
      name: "birth_date",
      required: true,
    },
    {
      type: "select",
      label: "¿Cuál es tu país de origen?",
      name: "country_of_origin",
      options: [
        {
          label: "Argentina",
          value: "argentina",
        },
        {
          label: "Brasil",
          value: "brasil",
        },
        {
          label: "Chile",
          value: "chile",
        },
        {
          label: "Colombia",
          value: "colombia",
        },
        {
          label: "México",
          value: "mexico",
        },
        {
          label: "Perú",
          value: "peru",
        },
        {
          label: "Uruguay",
          value: "uruguay",
        },
        {
          label: "Venezuela",
          value: "venezuela",
        },
      ],
      required: true,
    },
    {
      type: "checkbox",
      label: "¿Acepta los términos y condiciones?",
      name: "terms_and_conditions",
      required: true,
    },
    {
      type: "submit",
      label: "Enviar",
    },
  ],
};

export default function Form() {
  const initialValue = {
    full_name: "",
    email: "",
    birth_date: "",
    country_of_origin: "",
    terms_and_conditions: "",
  };

  const navigate = useNavigate();

  const [form, setForm] = useState(initialValue);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  // funcion para mostrar el cartel despues de apretar "enviar"

  const showMessage = (id) => {
    MySwal.fire({
      title: "Gracias por completar el formulario",
      text: "Desea ver sus respuestas ?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
    }).then((result) => {
      if (result.isConfirmed) {
        MySwal(navigate(`/dataform/${id}`));
      }
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      // esta funcion agrega un documento a firebase
      const getId = await addDoc(collection(db, "datos-form"), {
        ...form,
      });
      showMessage(getId.id);
    } catch (error) {
      console.log(error);
    }
    setForm({ ...initialValue }); // cargamos en setForm todos los datos que tiene initialValue
    e.target.reset(); // resetear los valores del formulario
  }

  return (
    <div className="form-container">
      <div className="main">
        <section className="section">
          <form onSubmit={(e) => handleSubmit(e)} className="form">
            <div>
              {jsonForm.items.map((json) => {
                if (json.type === "select") {
                  return (
                    <div className="subtitle">
                      <label className="label">{json.label}</label>
                      <select
                        className="option-select"
                        name={json.name}
                        onChange={(e) => handleChange(e)}
                      >
                        {json.options.map((option) => (
                          <option value={option.value}>{option.label}</option>
                        ))}
                      </select>
                    </div>
                  );
                } else if (json.type === "submit") {
                  return (
                    <div className="buttonForm">
                      <button className="buttonFormStyle">Enviar</button>
                    </div>
                  );
                } else if (json.type === "checkbox") {
                  return (
                    <div className="subtitle">
                      <label className="label">{json.label}</label>
                      <input
                        className="checkbox-text"
                        type={json.type}
                        name={json.name}
                        required={json.required}
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
                  );
                } else {
                  return (
                    <div className="subtitle">
                      <label className="label">{json.label}</label>
                      <input
                        className="
                        input-form"
                        name={json.name}
                        type={json.type}
                        required={json.required}
                        onChange={(e) => handleChange(e)}
                      ></input>
                    </div>
                  );
                }
                {
                }
              })}
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
