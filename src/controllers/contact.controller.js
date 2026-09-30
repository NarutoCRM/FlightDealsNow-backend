import { sendContactEmail } from "../services/email.service.js";

export const createContact = async (req, res) => {
    try {
        const {
            name,
            email,
            phone,
            message,
        } = req.body;

        if (!name || !email || !phone || !message) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required details.",
            });
        }

        await sendContactEmail({
            name: name.trim(),
            email: email.trim(),
            phone: phone.trim(),
            message: message.trim(),
        });

        return res.status(200).json({
            success: true,
            message: "Your message has been sent successfully.",
        });
    } catch (error) {
        console.error("CONTACT EMAIL ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to send your message right now.",
        });
    }
};