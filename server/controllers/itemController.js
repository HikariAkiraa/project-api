const itemRepo = require('../repositories/itemRepository');
const storeRepo = require('../repositories/storeRepository');
const { sendSuccess, sendError } = require('../utils/response');
const { uploadToCloudinary } = require('../utils/cloudinary');
const redis = require('../database/redis');

const createItem = async (req, res) => {
    try {
        const { name, price, store_id, stock } = req.body;

        // Validasi store exists
        const store = await storeRepo.getStoreById(store_id);
        if (!store) {
            return sendError(res, 404, "Store doesnt exist");
        }

        // Upload image ke Cloudinary (jika ada)
        let image_url = null;
        if (req.file) {
            image_url = await uploadToCloudinary(req.file.buffer);
        }

        const item = await itemRepo.createItem(name, parseInt(price), store_id, image_url, parseInt(stock));
        sendSuccess(res, 201, "Item created", item);
    } catch (err) {
        sendError(res, 500, err.message);
    }
};

const getAllItems = async (req, res) => {
    try {
        const items = await itemRepo.getAllItems();
        sendSuccess(res, 200, "Items found", items);
    } catch (err) {
        sendError(res, 500, err.message);
    }
};

const getItemById = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await itemRepo.getItemById(id);

        if (!item) {
            return sendError(res, 404, "Item not found");
        }

        sendSuccess(res, 200, "Item found", item);
    } catch (err) {
        sendError(res, 500, err.message);
    }
};

const getItemsByStoreId = async (req, res) => {
    try {
        const { store_id } = req.params;

        const store = await storeRepo.getStoreById(store_id);
        if (!store) {
            return sendError(res, 404, "Store doesnt exist");
        }

        const cacheKey = `items:store:${store_id}`;
        const cached = await redis.get(cacheKey);
        if (cached) {
            return sendSuccess(res, 200, "Items found", JSON.parse(cached));
        }

        const items = await itemRepo.getItemsByStoreId(store_id);
        await redis.set(cacheKey, JSON.stringify(items), 'EX', 60);
        sendSuccess(res, 200, "Items found", items);
    } catch (err) {
        sendError(res, 500, err.message);
    }
};

const updateItem = async (req, res) => {
    try {
        const { id, name, price, store_id, stock } = req.body;

        // Validasi store exists
        const store = await storeRepo.getStoreById(store_id);
        if (!store) {
            return sendError(res, 404, "Store doesnt exist found");
        }

        // Upload image baru ke Cloudinary (jika ada)
        let image_url = null;
        if (req.file) {
            image_url = await uploadToCloudinary(req.file.buffer);
        }

        const item = await itemRepo.updateItem(id, name, parseInt(price), store_id, image_url, parseInt(stock));

        if (!item) {
            return sendError(res, 404, "Item not found");
        }

        sendSuccess(res, 200, "Item updated", item);
    } catch (err) {
        sendError(res, 500, err.message);
    }
};

const deleteItem = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await itemRepo.deleteItem(id);

        if (!item) {
            return sendError(res, 404, "Item not found");
        }

        sendSuccess(res, 200, "Item deleted", item);
    } catch (err) {
        sendError(res, 500, err.message);
    }
};

module.exports = { createItem, getAllItems, getItemById, getItemsByStoreId, updateItem, deleteItem };
