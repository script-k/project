import Table from 'react-bootstrap/Table';

const DataQuery = ({data}) => {

  return (
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>#</th>
          <th>Nombre</th>
          <th>Cantidad Vendida</th>
        </tr>
      </thead>
      <tbody>
      {data.map((producto, index) => (
        <tr key={index}>
          <td>#</td>
          <td>{producto.nombre}</td>          
          <td>{producto.unidades_vendidas}</td>
        </tr>
      ))}
      </tbody>
    </Table>
  );
}

export default DataQuery;