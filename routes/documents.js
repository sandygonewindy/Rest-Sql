import express from "express";
import { insertSql, createSql, deleteSql } from "../generateSql.js";
import { pool } from "../db.js";

const router = express.Router();

const TABLE = "PROMETHEUS_METADATA_MAPPING";

// @route   GET api/documents
// @desc    Get all documents

router.get('/', async (req, res) => {
    try {
        const query = `SELECT * FROM ${TABLE};`
        const result = await pool.query(query);
        res.status(200).send(result["rows"]);
    } catch (error) {
        res.status(404).send(error);
        console.log(error);
    }
});


// @route   POST /api/documents/insert
// @desc    Insert a document

router.post('/insert', async (req, res) => {
    console.log(req.body);
    try {
        if(req.body.is_folder && (req.body.folder_name === null || req.body.folder_name === "" || req.body.folder_name === undefined)){
            res.status(404).send(`Cannot Insert, folder name is empty`);
            return;
        }
        const query = insertSql(req.body, TABLE);
        const result = await pool.query(query);
        console.log("Result is as follows");
        console.log(result);
        // res.status(200).send(`Inserted ${result.rowCount} row(s) successfully`);
        res.json(req.body);
    } catch (error) {
        console.log(error);
        res.status(404).send(`Cannot Insert, ${error.column} is empty`);
    }
});



// @route   POST /api/documents/delete
// @desc    Delete a document

router.delete('/delete/:id', async (req, res) => {
    try {
        const query = deleteSql(req.params.id, TABLE);
        console.log(query);
        const result = await pool.query(query);
        if(result.rowCount === 0){
            res.status(404).send("Could not delete, No Matching field found");
            return
        }
        res.status(200).send(`Deleted ${result.rowCount} row(s) successfully`);
        console.log(result.rowCount);
    } catch (error) {
        console.log(error);
        res.status(404).send(error.message);
    }
});

export default router;