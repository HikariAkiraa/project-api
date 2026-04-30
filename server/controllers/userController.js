const userRepo = require('../repositories/userRepository');
const { sendSuccess, sendError } = require('../utils/response');

const register = async (req, res) => {
    try {
        const { email, password, name } = req.query;

        if (!email || !password || !name) {
            return sendError(res, 400, "Missing email, password, or name");
        }

        const existing = await userRepo.findUserByEmail(email);
        if (existing) {
            return sendError(res, 400, "Email already used");
        }

        const user = await userRepo.createUser(name, email, password);
        sendSuccess(res, 201, "User created", user);
    } catch (err) {
        sendError(res, 500, err.message);
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.query;

        const user = await userRepo.findUserByEmailAndPassword(email, password);

        if (!user) {
            return sendError(res, 401, "Invalid email or password");
        }

        sendSuccess(res, 200, "Login success", user);
    } catch (err) {
        sendError(res, 500, err.message);
    }
};

const getByEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const user = await userRepo.findUserByEmail(email);

        if (!user) {
            return sendError(res, 404, "User not found");
        }

        sendSuccess(res, 200, "User found", user);
    } catch (err) {
        sendError(res, 500, err.message);
    }
};

const update = async (req, res) => {
    try {
        const { id, email, password, name } = req.body;
        const user = await userRepo.updateUser(id, name, email, password);

        if (!user) {
            return sendError(res, 404, "User not found");
        }

        sendSuccess(res, 200, "User updated", user);
    } catch (err) {
        sendError(res, 500, err.message);
    }
};

const remove = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userRepo.deleteUser(id);

        if (!user) {
            return sendError(res, 404, "User not found");
        }

        sendSuccess(res, 200, "User deleted", user);
    } catch (err) {
        sendError(res, 500, err.message);
    }
};

module.exports = { register, login, getByEmail, update, remove };
