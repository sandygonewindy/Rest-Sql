import 'dotenv/config'
import express from "express";
import { insertSql, createSql, deleteSql } from "./generateSql.js";
import { pool } from "./db.js";
import cors from "cors";
 
// INSERT INTO PROMETHEUS_METADATA_MAPPING(
//     id, unique_name, type, prefix, tenant_id, is_root_type, is_folder, folder_name, device_mapping_enabled, device_mapping_precedence, p_entity_metric_names, p_entity_metric_labels, p_entity_display_name_metric_labels, p_parent_entity_metric_labels, p_entity_agent_id_labels, p_device_metric_names, p_device_metric_labels, agent_type, graph_by_default, kpi, supported_metrics, version, revision,release, parent_id)
//     VALUES ('node_node','node_node', 'Node', 'node', '${tenantId}',true, true, 'Node', true, 0, 'node_uname_info', null, null, null, 'instance', 'node_uname_info', 'nodename','Exporter', null, null, 'node_uname_info', '20.08', '20.08.00', '00', null);
const app = express();
// var cors = require('cors')

app.use(cors());
app.use(express.json());


( async () => {
    try {
        const query = createSql("PROMETHEUS_METADATA_MAPPING");
        await pool.query(query);

        app.listen(3000, () => {
            console.log("Server listening on port 3000");
        });
    } catch (error) {
        console.log(error);
    }
}) ()



app.get("/", async (req, res) => {
    try {
        const query = `SELECT * FROM PROMETHEUS_METADATA_MAPPING;`
        const result = await pool.query(query);
        res.status(200).send(result["rows"]);
    } catch (error) {
        res.status(404).send(error);
        console.log(error);
    }
});

app.post("/insert", async (req, res) => {
    console.log("Insert api called");
    console.log(req.body);
    try {
        console.log("Entered try");
        const query = insertSql(req.body, "PROMETHEUS_METADATA_MAPPING");
        const result = await pool.query(query);
        console.log(result);
        res.status(200).send(`Inserted ${result.rowCount} row(s) successfully`);
    } catch (error) {
        console.log("Entered catch");
        console.log(error);
        res.status(404).send(error);
    }
});


app.delete("/delete", async (req, res) => {
    try {
        const query = deleteSql(req.body.id, "PROMETHEUS_METADATA_MAPPING");
        console.log(query);
        const result = await pool.query(query);
        res.status(200).send(`Deleted ${result.rowCount} row(s) successfully`);
        console.log(result.rowCount);
    } catch (error) {
        console.log(error);
        res.status(404).send(error);
    }
});