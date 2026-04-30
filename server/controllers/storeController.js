const storeRepo = require('../repositories/storeRepository');
const { sendSuccess, sendError } = require('../utils/response');
const redis = require('../database/redis');

const getAll = async (req, res) => {
    try {
        const cached = await redis.get('stores');
        if (cached) {
            return sendSuccess(res, 200, "Stores found", JSON.parse(cached));
        }

        const stores = await storeRepo.getAllStores();
        await redis.set('stores', JSON.stringify(stores), 'EX', 60);
        sendSuccess(res, 200, "Stores found", stores);
    } catch (err) {
        sendError(res, 500, err.message);
    }
};

const create = async (req, res) => {
    try {
        const { name, address } = req.body;

        if (!name || !address) {
            return sendError(res, 400, "Missing store name or address");
        }

        const store = await storeRepo.createStore(name, address);
        sendSuccess(res, 201, "Store created", store);
    } catch (err) {
        sendError(res, 500, err.message);
    }
};

const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const store = await storeRepo.getStoreById(id);

        if (!store) {
            return sendError(res, 404, "Store not found");
        }

        sendSuccess(res, 200, "Store found", store);
    } catch (err) {
        sendError(res, 500, err.message);
    }
};

const update = async (req, res) => {
    try {
        const { id, name, address } = req.body;
        const store = await storeRepo.updateStore(id, name, address);

        if (!store) {
            return sendError(res, 404, "Store not found");
        }

        sendSuccess(res, 200, "Store updated", store);
    } catch (err) {
        sendError(res, 500, err.message);
    }
};

const remove = async (req, res) => {
    try {
        const { id } = req.params;
        const store = await storeRepo.deleteStore(id);

        if (!store) {
            return sendError(res, 404, "Store not found");
        }

        sendSuccess(res, 200, "Store deleted", store);
    } catch (err) {
        sendError(res, 500, err.message);
    }
};

module.exports = { getAll, create, getById, update, remove };
