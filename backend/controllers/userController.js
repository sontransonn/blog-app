import bcrypt from "bcrypt"

import USER from "../models/userModel.js";

import { uploadPicture } from "../configs/multerConfig.js"

import { generateToken } from "../utils/tokenUtils.js";
import { deleteFile } from "../utils/fileUtils.js";

export const registerUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            throw new Error("Vui lòng điền đẩy đủ thông tin!");
        }

        const user = await USER.findOne({ email });

        if (user) {
            throw new Error("Email đã tồn tại!");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new USER({
            name,
            email,
            password: hashedPassword
        })

        await newUser.save()

        const token = generateToken(newUser)

        return res.status(201).json({
            _id: newUser._id,
            avatar: newUser.avatar,
            name: newUser.name,
            email: newUser.email,
            verified: newUser.verified,
            admin: newUser.admin,
            token
        });
    } catch (error) {
        next(error);
    }
}

export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            throw new Error("Vui lòng điền đẩy đủ thông tin!");
        }

        const user = await USER.findOne({ email });

        if (!user) {
            throw new Error("Email không tồn tại!");
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            throw new Error("Email hoặc mật khẩu không hợp lệ!");
        }

        const token = generateToken(user)

        res.status(201).json({
            _id: user._id,
            avatar: user.avatar,
            name: user.name,
            email: user.email,
            verified: user.verified,
            admin: user.admin,
            token
        })
    } catch (error) {
        next(error);
    }
}

export const userProfile = async (req, res, next) => {
    try {
        const user = await USER.findById(req.user._id);

        if (user) {
            return res.status(201).json({
                _id: user._id,
                avatar: user.avatar,
                name: user.name,
                email: user.email,
                verified: user.verified,
                admin: user.admin,
            });
        } else {
            let error = new Error("User not found");
            error.statusCode = 404;
            next(error);
        }
    } catch (error) {
        next(error);
    }
}

export const updateProfile = async (req, res, next) => {
    try {
        const userIdToUpdate = req.params.userId;

        const userId = req.user.id;

        if (!req.user.admin && userId !== userIdToUpdate) {
            let error = new Error("Forbidden resource");
            error.statusCode = 403;
            throw error;
        }

        let user = await USER.findById(userIdToUpdate);

        if (!user) {
            throw new Error("User not found");
        }

        if (typeof req.body.admin !== "undefined" && req.user.admin) {
            user.admin = req.body.admin;
        }

        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if (req.body.password && req.body.password.length < 6) {
            throw new Error("Password length must be at least 6 character");
        } else if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);

            user.password = hashedPassword;
        }

        const updatedUserProfile = await user.save();

        const token = generateToken(updatedUserProfile)

        res.status(200).json({
            _id: updatedUserProfile._id,
            avatar: updatedUserProfile.avatar,
            name: updatedUserProfile.name,
            email: updatedUserProfile.email,
            verified: updatedUserProfile.verified,
            admin: updatedUserProfile.admin,
            token
        });
    } catch (error) {
        next(error);
    }
}

export const updateProfilePicture = async (req, res, next) => {
    try {
        const upload = uploadPicture.single("profilePicture")

        upload(req, res, async function (err) {
            if (err) {
                const error = new Error(
                    "An unknown error occured when uploading " + err.message
                );
                next(error);
            } else {
                if (req.file) {
                    let filename;
                    let updatedUser = await USER.findById(req.user._id);

                    filename = updatedUser.avatar;
                    if (filename) {
                        deleteFile(filename);
                    }

                    updatedUser.avatar = req.file.filename;
                    await updatedUser.save();

                    const token = generateToken(updatedUser)

                    res.json({
                        _id: updatedUser._id,
                        avatar: updatedUser.avatar,
                        name: updatedUser.name,
                        email: updatedUser.email,
                        verified: updatedUser.verified,
                        admin: updatedUser.admin,
                        token
                    });
                } else {
                    let filename;
                    let updatedUser = await USER.findById(req.user._id);

                    filename = updatedUser.avatar;
                    updatedUser.avatar = "";

                    await updatedUser.save();

                    deleteFile(filename)

                    const token = generateToken(updatedUser)

                    res.json({
                        _id: updatedUser._id,
                        avatar: updatedUser.avatar,
                        name: updatedUser.name,
                        email: updatedUser.email,
                        verified: updatedUser.verified,
                        admin: updatedUser.admin,
                        token
                    });
                }
            }
        })
    } catch (error) {
        next(error);
    }
}