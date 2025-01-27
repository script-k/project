import dotenv from "dotenv";
import  express from "express";
import connection from "./db.js";
import sql from "mssql";
import cors from "cors";

dotenv.config();
const appPort = process.env.APP_PORT;

const app = express();
// Permitimos todas las peticiones http si ningun punto de origen
app.use(cors());

app.get('/categorias', async (req, res) => {
    try{
        // Generamos la consulta
        const request = new sql.Request();
        const resultado = await request.query('SELECT categoria_id, nombre FROM categorias');
    
        // Enviar respuesta con resultados
        res.status(200).json({
          data: resultado.recordset
        });
    }catch(error) {
        res.status(500).json({ "error": "Error en el servidor"});
    }
});

app.get('/productos', async (req, res) => {
    try{
        // Generamos la consulta
        let categoria_id = req.query.categoria_id;
        if(!categoria_id) {
            return res.status(404).json({"message": "Seleccione una categoria"});
        }

        const request = new sql.Request();
        const resultado = await request.query(
            `SELECT TOP(5) p.nombre, SUM(v.cantidad) AS unidades_vendidas 
            FROM ventas v
            JOIN productos p ON p.producto_id = v.producto_id
            JOIN categorias c ON c.categoria_id = p.categoria_id 
            WHERE c.categoria_id = ${categoria_id}
            GROUP BY p.nombre 
            ORDER BY unidades_vendidas DESC;`
        );
    
        // Enviar respuesta con resultados
        res.status(200).json({
          data: resultado.recordset
        });
    }catch(error) {
        res.status(500).json({ "error": "Error en el servidor"});
    }
});

app.listen(appPort, () => {
    console.log(`Server On: http://localhost:${appPort}`);
});