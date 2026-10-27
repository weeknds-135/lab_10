import React, { Component } from 'react';

class App extends Component {
  // Pasos 7 y 11: estado inicial del componente
  constructor(props) {
    super(props);
    this.state = {
      productos: [],
      recuperado: false   // false = todavía no llegan los datos del servicio web
    };
  }

  // Pasos 8 y 12: consumir el servicio web de Django con fetch.
  // La guía usa componentWillMount, que está obsoleto en React 18;
  // componentDidMount es el método recomendado para pedir datos.
  componentDidMount() {
    fetch('http://localhost:8000/api/producto/')
      .then((response) => {
        return response.json();
      })
      .then((prod) => {
        this.setState({
          productos: prod,
          recuperado: true
        });
      })
      .catch((error) => {
        console.error('No se pudo recuperar los productos:', error);
      });
  }

  // Paso 13: método que devuelve la tabla HTML con los datos cargados
  mostrarTabla() {
    return (
      <div>
        <table border="1">
          <thead>
            <tr>
              <th>Código</th>
              <th>Descripción</th>
              <th>Precio</th>
            </tr>
          </thead>
          <tbody>
            {this.state.productos.map((producto) => {
              return (
                <tr key={producto.codigo}>
                  <td>{producto.codigo}</td>
                  <td>{producto.descripcion}</td>
                  <td>{producto.precio}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }

  // Paso 14: según el estado "recuperado" se muestra la tabla o un mensaje
  render() {
    if (this.state.recuperado) return this.mostrarTabla();
    else return <div>recuperando datos...</div>;
  }
}

export default App;
