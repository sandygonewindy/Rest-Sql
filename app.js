import "dotenv/config";
import express from "express";
import { createSql } from "./generateSql.js";
import { pool } from "./db.js";
import cors from "cors";
import documentRouter from "./routes/documents.js";

// INSERT INTO PROMETHEUS_METADATA_MAPPING(
//     id, unique_name, type, prefix, tenant_id, is_root_type, is_folder, folder_name, device_mapping_enabled, device_mapping_precedence, p_entity_metric_names, p_entity_metric_labels, p_entity_display_name_metric_labels, p_parent_entity_metric_labels, p_entity_agent_id_labels, p_device_metric_names, p_device_metric_labels, agent_type, graph_by_default, kpi, supported_metrics, version, revision,release, parent_id)
//     VALUES ('node_node','node_node', 'Node', 'node', '${tenantId}',true, true, 'Node', true, 0, 'node_uname_info', null, null, null, 'instance', 'node_uname_info', 'nodename','Exporter', null, null, 'node_uname_info', '20.08', '20.08.00', '00', null);
const app = express();
// var cors = require('cors')

app.use(cors());
app.use(express.json());
const TABLE = "PROMETHEUS_METADATA_MAPPING";
let COLUMNS;

(async () => {
  try {
    const query = createSql(TABLE);
    await pool.query(query);
    const fields = await pool.query(`SELECT * FROM ${TABLE};`);
    COLUMNS = fields["fields"].map((ele) => ele.name);
    app.listen(5000, () => {
      console.log("Server listening on port 5000");
    });
  } catch (error) {
    console.log(error);
  }
})();

app.use("/api/documents", documentRouter);

// app.get("/", async (req, res) => {
//     try {
//         const query = `SELECT * FROM ${TABLE};`
//         const result = await pool.query(query);
//         res.status(200).send(result["rows"]);
//     } catch (error) {
//         res.status(404).send(error);
//         console.log(error);
//     }
// });

// app.get("/:id", async (req, res) => {
//     try {
//         const query = `SELECT * FROM PROMETHEUS_METADATA_MAPPING WHERE id=$1`
//         const values = [req.params.id]
//     } catch (error) {
//         res.status(404).send(error);
//         console.log(error);
//     }
// })

// app.post("/insert", async (req, res) => {
//     console.log(req.body);
//     try {
//         if(req.body.is_folder && (req.body.folder_name === null || req.body.folder_name === "" || req.body.folder_name === undefined)){
//             res.status(404).send(`Cannot Insert, folder name is empty`);
//             return;
//         }
//         const query = insertSql(req.body, TABLE);
//         const result = await pool.query(query);
//         console.log(result);
//         res.status(200).send(`Inserted ${result.rowCount} row(s) successfully`);
//     } catch (error) {
//         console.log(error);
//         res.status(404).send(`Cannot Insert, ${error.column} is empty`);
//     }
// });

// app.delete("/delete", async (req, res) => {
//     try {
//         const query = deleteSql(req.body.id, TABLE);
//         console.log(query);
//         const result = await pool.query(query);
//         if(result.rowCount === 0){
//             res.status(404).send("Could not delete, No Matching field found");
//             return
//         }
//         res.status(200).send(`Deleted ${result.rowCount} row(s) successfully`);
//         console.log(result.rowCount);
//     } catch (error) {
//         console.log(error);
//         res.status(404).send(error.message);
//     }
// });

// const table_name = "\'" + TABLE + "\'";
// const query = `SELECT column_name FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name = ${table_name};`;
