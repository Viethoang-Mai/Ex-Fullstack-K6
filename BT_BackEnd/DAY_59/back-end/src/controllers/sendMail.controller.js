const sendMail = require("../utils/mail");
const { EmailHistory } = require("../models/index");
module.exports = {
    sendMail: async (req, res) => {
        try {
            const { to, title, content } = req.body;

            const info = await sendMail(to, title, content);

            if (!info) {
                throw new Error("Send mail failed");
            }
            await EmailHistory.create({
                title,
                content,
                to,
                status: "Chưa xem",
                sent_at: new Date(),
            });
            res.status(200).json({
                message: "Email sent and saved to history.",
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getHistory: async (req, res) => {
        try {
            const history = await EmailHistory.findAll();
            res.status(200).json(history);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getHistoryById: async (req, res) => {
        try {
            const { id } = req.params;
            const email = await EmailHistory.findByPk(id);

            if (!email) {
                throw new Error("Not found");
            }
            email.status = "Đã xem";
            await email.save();

            res.status(200).json(email);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};
