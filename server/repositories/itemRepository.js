const pool = require('../database/db');

const createItem = async (name, price, store_id, image_url, stock) => {
    const result = await pool.query(
        'INSERT INTO items (name, price, store_id, image_url, stock) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [name, price, store_id, image_url, stock]
    );
    return result.rows[0];
};

const getAllItems = async () => {
    const result = await pool.query('SELECT * FROM items');
    return result.rows;
};

const getItemById = async (id) => {
    const result = await pool.query(
        'SELECT * FROM items WHERE id = $1',
        [id]
    );
    return result.rows[0] || null;
};

const getItemsByStoreId = async (store_id) => {
    const result = await pool.query(
        'SELECT * FROM items WHERE store_id = $1',
        [store_id]
    );
    return result.rows;
};

const updateItem = async (id, name, price, store_id, image_url, stock) => {
    const result = await pool.query(
        'UPDATE items SET name = $1, price = $2, store_id = $3, image_url = $4, stock = $5 WHERE id = $6 RETURNING *',
        [name, price, store_id, image_url, stock, id]
    );
    return result.rows[0] || null;
};

const deleteItem = async (id) => {
    const result = await pool.query(
        'DELETE FROM items WHERE id = $1 RETURNING *',
        [id]
    );
    return result.rows[0] || null;
};

module.exports = { createItem, getAllItems, getItemById, getItemsByStoreId, updateItem, deleteItem };
