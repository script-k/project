import axios from "axios";

// Importando los componentes de bootstrap react
import { Button, Form, Container, Row, Col } from 'react-bootstrap'

// Importando los componentes hijos
import DataQuery from "./DataQuery";

// Importando los estados
import React, { useEffect, useState } from 'react';



function App() {
  // Declarando las variables del estado
  const [categorias, setCategoria] = useState([]);
  const [productos, setProducto] = useState([]);

    // Estado para almacenar el valor seleccionado
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');

  // Manejar cambio de selección
  const handleChange = (e) => {
    setCategoriaSeleccionada(e.target.value);
  };

  // Función para manejar el clic en el botón "Filtrar"
  const handleFiltrar = async () => {
    if (categoriaSeleccionada) {
      const apiUrl = `http://localhost:3000/productos?categoria_id=${categoriaSeleccionada}`;

      axios.get(apiUrl)
        .then(response => {
          setProducto(response.data.data);
        })
        .catch(error => {
          alert("Error al obtener los datos")
        });
    } else {
      alert("No se ha seleccionado ninguna categoría");
    }
  };
  // Cargando los datos junto con los componentes para el select
  useEffect(() => {
    const apiUrl = 'http://localhost:3000/categorias';

    axios.get(apiUrl)
      .then(response => {
        setCategoria(response.data.data);
      })
      .catch(error => {
        alert("Error al obtener los datos")
      });
  }, []);

  
  return (
    <div>
      <header>
      <Container>
      <Row className="justify-content-md-center pt-5 mt-5">
        <Col md="8" lg="8">
        <Form.Select aria-label="Buscar por categoria"
        onChange={handleChange}
        value={categoriaSeleccionada}
        >
          <option value="">Selecciona una categoría</option>
          {categorias.map((categoria) => (
            <option key={categoria.categoria_id} value={categoria.categoria_id}>
              {categoria.nombre}
            </option>
          ))}
        </Form.Select>
        </Col>
        <Col md="2" lg="2">
          <div className="d-grid gap-2">
            <Button variant="dark" onClick={handleFiltrar}>Filtrar</Button>
          </div>
        </Col>
      </Row>
      <Row className="justify-content-md-center pt-5 mt-5">
        <Col md="12" lg="12">
          <DataQuery data={productos}></DataQuery>
        </Col>
      </Row>
    </Container>
      </header>
    </div>
  );
}

export default App;
