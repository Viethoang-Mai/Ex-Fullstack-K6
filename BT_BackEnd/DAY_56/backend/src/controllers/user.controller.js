const { User } = require("../models/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

module.exports = {
    register: async (req, res) => {
        const { email, password, name } = req.body;
        try {
            const existUser = await User.findOne({
                where: {
                    [Op.or]: [{ email: email }, { name: name }],
                },
            });
            if (existUser) {
                return res.status(400).json({
                    error: "Username hoặc email đã tồn tại",
                });
            }
            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = await User.create({
                name,
                email,
                password: hashedPassword,
                status: 0,
            });
            console.log(newUser);

            res.status(201).json({
                message: "Đăng ký thành công",
            });
        } catch (error) {
            console.log(error);

            res.status(500).json({ error: "Đã xảy ra lỗi" });
        }
    },
    login: async (req, res) => {
        const { email, password } = req.body;

        try {
            const user = await User.findOne({ where: { email } });
            if (!user) {
                return res.status(401).json({
                    error: "Email hoặc mật khẩu không đúng",
                });
            }

            if (user.status !== 1) {
                return res.status(403).json({
                    error: "Tài khoản chưa được kích hoạt",
                });
            }

            // So sánh mật khẩu đã mã hóa
            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                return res.status(401).json({
                    error: "Email hoặc mật khẩu không đúng",
                });
            }

            // Tạo JWT token
            const token = jwt.sign({ userId: user.id }, "abcd1234", {
                expiresIn: "1h",
            });

            // Set cookie
            res.cookie("token", token, {
                maxAge: 1000 * 60 * 60 * 24,
                httpOnly: true,
                sameSite: "strict",
            });

            res.json({ message: "Đăng nhập thành công", ok: true });
        } catch (error) {
            res.status(500).json({ message: "Đã xảy ra lỗi" });
        }
    },

    logout: async (req, res) => {
        res.clearCookie("token", {
            httpOnly: true,
            sameSite: "strict",
        });

        res.json({
            message: "Đăng xuất thành công",
            ok: true,
        });
    },
};
