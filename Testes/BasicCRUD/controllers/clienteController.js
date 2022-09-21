const db = require("../db");
const cliente = require("../models/clienteModel")

async function selectClients() {
    const conn = await db();
    const [rows] = await conn.query('Select * From Cliente;');
    return rows
};

async function login(credential) {
    const conn = await db();
    const query = 'Select * From Cliente Where NM_Nome = ? And NR_CPF = ?'
    const values = [credential.nome, credential.cpf]
    await conn.query(query, values);
};

async function insertClient(client) {
    const conn = await db();
    
    const query = 'Insert Into Cliente (NM_Nome, NR_CPF) Values (?,?);';
    const values = [client.nome, client.cpf];
    await conn.query(query, values);
};

async function updateClient(id, client) {
    const conn = await db();
    const query = 'Update Cliente Set NM_Nome = ? Values (?,?);';
    const values = [client.nome, client.cpf];
    await conn.query(query, values);
};

module.exports = {selectClients, insertClient, login};