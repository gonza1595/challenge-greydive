import React, { useState } from "react";
import "./Data.css";
import appFirebase from "../Firebase/Firebase";
import { getFirestore, getDoc, doc } from "firebase/firestore";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
const db = getFirestore(appFirebase);

export default function DataForm() {
  const [data, setData] = useState([]);

  // useParams para capturar el id cuando creamos cada documento que adentro tiene los datos de la persona
  const params = useParams();

  // este useEffect nos va a mostrar el documento segun el id
  useEffect(() => {
    const answers = async () => {
      try {
        const getData = doc(db, "datos-form", params.id);
        const docs = await getDoc(getData);
        setData(docs.data());
      } catch (error) {
        console.log(error);
      }
    };
    answers();
  }, []);

  return (
    <div className="container-data">
      <section className="section">
        {data ? (
          <div className="subtitle-data ">
            <div className="components">
              <h3 className="dataName">Nombre Completo: </h3>{" "}
              <h3 className="data-form">{data.full_name}</h3>
            </div>
            <div className="components">
              <h3 className="dataName">Correo Electronico: </h3>{" "}
              <h3 className="data-form">{data.email}</h3>
            </div>
            <div className="components">
              <h3 className="dataName">Fecha de Nacimiento: </h3>{" "}
              <h3 className="data-form">{data.birth_date}</h3>
            </div>
            <div className="components">
              <h3 className="dataName">Pais de Origen: </h3>{" "}
              <h3 className="data-form">
                {data.country_of_origin?.charAt(0).toUpperCase() +
                  data.country_of_origin?.substring(1)}
              </h3>
            </div>
            <div className="button">
              <Link to={"/"}>
                <button className="buttonFormStyle">Volver</button>
              </Link>
            </div>
          </div>
        ) : (
          <h1>Cargando...</h1>
        )}
      </section>
    </div>
  );
}
