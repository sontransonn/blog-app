import USER from "../models/userModel.js"
import jwt from "jsonwebtoken";

export const authGuard = async (req, res, next) => {
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            const token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

            req.user = await USER.findById(decoded.id).select("-password");
            next();
        } catch (error) {
            let err = new Error("Not authorized, Token failed");
            err.statusCode = 401;
            next(err);
        }
    } else {
        let error = new Error("Not authorized, No token");
        error.statusCode = 401;
        next(error);
    }
}