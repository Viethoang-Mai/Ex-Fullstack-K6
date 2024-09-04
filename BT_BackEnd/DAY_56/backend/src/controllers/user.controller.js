const { Sequelize, where } = require("sequelize");
const { User } = require("../models/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
    login: async (req, res) => {
        const { email, password } = req.body;

        try {
            // Kiểm tra email tồn tại
            const user = await User.findOne({ where: { email } });
            if (!user) {
                return res.status(401).json({
                    error: "Email hoặc mật khẩu không đúng",
                    ok: false,
                });
            }

            // So sánh mật khẩu đã mã hóa
            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                return res.status(401).json({
                    error: "Email hoặc mật khẩu không đúng",
                    ok: false,
                });
            }

            // Tạo JWT token
            const token = jwt.sign({ userId: user._id }, "abcd1234", {
                expiresIn: "1h",
            });

            res.json({ token, message: "Đăng nhập thành công", ok: true });
        } catch (error) {
            res.status(500).json({ message: "Đã xảy ra lỗi" });
        }
    },
    logout: async (req, res) => {
        return res.json({
            message: "Đăng xuất thành công",
        });
    },
};
