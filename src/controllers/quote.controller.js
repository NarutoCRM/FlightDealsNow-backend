import { sendQuoteEmail } from "../services/email.service.js";

export const createQuote = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      tripType,
      from,
      to,
      departure,
      returnDate,
      travelers,
      cabin,
    } = req.body;

    if (
      !name ||
      !email ||
      !phone ||
      !tripType ||
      !from ||
      !to ||
      !departure ||
      !travelers ||
      !cabin
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required details.",
      });
    }

    if (from === to) {
      return res.status(400).json({
        success: false,
        message:
          "Departure and destination cannot be the same.",
      });
    }

    await sendQuoteEmail({
      name,
      email,
      phone,
      tripType,
      from,
      to,
      departure,
      returnDate,
      travelers,
      cabin,
    });

    return res.status(200).json({
      success: true,
      message:
        "Your quote request has been submitted successfully.",
    });
  } catch (error) {
    console.error("QUOTE EMAIL ERROR:", error);

    return res.status(500).json({
      success: false,
      message:
        "Unable to submit your quote request right now.",
    });
  }
};