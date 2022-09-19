import knex from "knex";
import knexFile from "../../knexfile.js";

const connection = knex(knexFile.development);

export default connection;
