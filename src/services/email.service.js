import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),

  secure: process.env.SMTP_SECURE === "true",

  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

// ==========================================
// SEND QUOTE EMAIL
// ==========================================

export const sendQuoteEmail = async (data) => {
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
  } = data;

  const mailOptions = {
    from: process.env.MAIL_FROM,

    to: process.env.QUOTE_TO,

    cc: process.env.QUOTE_CC || undefined,

    replyTo: email,

    subject: `New Flight Quote Request - ${from} to ${to}`,

    text: `
New Flight Quote Request

CUSTOMER DETAILS
----------------
Name: ${name}
Email: ${email}
Phone: ${phone}

FLIGHT DETAILS
--------------
Trip Type: ${tripType}
From: ${from}
To: ${to}
Departure: ${departure}
Return: ${returnDate || "Not applicable"}
Travelers: ${travelers}
Cabin: ${cabin}

This request was submitted through FlightsDealNow.
`,

    html: `
      <div style="
        font-family: Arial, sans-serif;
        max-width: 650px;
        margin: 30px auto;
        background: #ffffff;
        border: 1px solid #e5e7eb;
        border-radius: 14px;
        overflow: hidden;
      ">

        <div style="
          background: #071a33;
          padding: 25px;
          text-align: center;
        ">

          <h1 style="
            margin: 0;
            color: #67e8f9;
          ">
            FlightsDealNow
          </h1>

          <p style="
            margin: 8px 0 0;
            color: #ffffff;
          ">
            New Flight Quote Request
          </p>

        </div>

        <div style="padding: 25px;">

          <h2 style="color: #071a33;">
            Customer Details
          </h2>

          <p>
            <strong>Name:</strong>
            ${name}
          </p>

          <p>
            <strong>Email:</strong>
            ${email}
          </p>

          <p>
            <strong>Phone:</strong>
            ${phone}
          </p>

          <hr />

          <h2 style="color: #071a33;">
            Flight Details
          </h2>

          <p>
            <strong>Trip Type:</strong>
            ${tripType}
          </p>

          <p>
            <strong>From:</strong>
            ${from}
          </p>

          <p>
            <strong>To:</strong>
            ${to}
          </p>

          <p>
            <strong>Departure:</strong>
            ${departure}
          </p>

          <p>
            <strong>Return:</strong>
            ${returnDate || "Not applicable"}
          </p>

          <p>
            <strong>Travelers:</strong>
            ${travelers}
          </p>

          <p>
            <strong>Cabin:</strong>
            ${cabin}
          </p>

          <hr />

          <p>
            This request was submitted through
            <strong>FlightsDealNow</strong>.
          </p>

        </div>

      </div>
    `,
  };

  return transporter.sendMail(mailOptions);
};

// ==========================================
// VERIFY SMTP
// ==========================================

export const verifyEmailConnection = async () => {
  return transporter.verify();
};