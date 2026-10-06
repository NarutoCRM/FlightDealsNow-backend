import sgMail from "@sendgrid/mail";

if (!process.env.SENDGRID_API_KEY) {
  console.error("SENDGRID_API_KEY is missing in environment variables.");
} else {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

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

This request was submitted through FlightDealsNow.
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
            FlightDealsNow
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
            <strong>FlightDealsNow</strong>.
          </p>

        </div>

      </div>
    `,
  };

  const [response] = await sgMail.send(mailOptions);

  console.log(
    `Quote email sent successfully. Status: ${response.statusCode}`
  );

  return response;
};

// ==========================================
// VERIFY SENDGRID CONNECTION
// ==========================================

export const verifyEmailConnection = async () => {
  if (!process.env.SENDGRID_API_KEY) {
    throw new Error("SENDGRID_API_KEY is missing.");
  }

  if (!process.env.MAIL_FROM) {
    throw new Error("MAIL_FROM is missing.");
  }

  if (!process.env.QUOTE_TO) {
    throw new Error("QUOTE_TO is missing.");
  }

  console.log("SendGrid Web API configuration verified.");

  return true;
};

// ==========================================
// SEND CONTACT EMAIL
// ==========================================

export const sendContactEmail = async ({
  name,
  email,
  phone,
  message,
}) => {
  const mailOptions = {
    from: process.env.MAIL_FROM,
    to: process.env.QUOTE_TO,
    cc: process.env.QUOTE_CC || undefined,
    replyTo: email,

    subject: `New Contact Request - ${name}`,

    text: `
New Contact Request

CUSTOMER DETAILS
----------------
Name: ${name}
Email: ${email}
Phone: ${phone}

MESSAGE
-------
${message}

This message was submitted through FlightDealsNow.com.
`,

    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>New Contact Request</title>
</head>

<body style="margin:0;padding:0;background:#f5f7fb;font-family:Arial,sans-serif;">

  <div style="max-width:680px;margin:40px auto;background:#ffffff;border-radius:18px;overflow:hidden;box-shadow:0 10px 35px rgba(0,0,0,.08);">

    <div style="background:#071a33;padding:28px 32px;color:#ffffff;">
      <h1 style="margin:0;font-size:24px;">
        New Contact Request
      </h1>

      <p style="margin:8px 0 0;color:#aeefff;font-size:14px;">
        FlightDealsNow.com
      </p>
    </div>

    <div style="padding:32px;">

      <h2 style="margin:0 0 18px;color:#071a33;font-size:18px;">
        Customer Details
      </h2>

      <table style="width:100%;border-collapse:collapse;">

        <tr>
          <td style="padding:10px 0;color:#64748b;font-weight:bold;width:120px;">
            Name
          </td>

          <td style="padding:10px 0;color:#111827;">
            ${name}
          </td>
        </tr>

        <tr>
          <td style="padding:10px 0;color:#64748b;font-weight:bold;">
            Email
          </td>

          <td style="padding:10px 0;color:#111827;">
            ${email}
          </td>
        </tr>

        <tr>
          <td style="padding:10px 0;color:#64748b;font-weight:bold;">
            Phone
          </td>

          <td style="padding:10px 0;color:#111827;">
            ${phone}
          </td>
        </tr>

      </table>

      <div style="margin-top:28px;padding:20px;background:#f8fafc;border-radius:14px;">

        <p style="
          margin:0 0 8px;
          color:#64748b;
          font-size:12px;
          font-weight:bold;
          text-transform:uppercase;
        ">
          Message
        </p>

        <p style="
          margin:0;
          color:#1e293b;
          font-size:15px;
          line-height:1.7;
          white-space:pre-line;
        ">
          ${message}
        </p>

      </div>

      <p style="margin:28px 0 0;color:#94a3b8;font-size:12px;">
        This contact request was submitted through FlightDealsNow.com.
      </p>

    </div>

  </div>

</body>
</html>
`,
  };

  const [response] = await sgMail.send(mailOptions);

  console.log(
    `Contact email sent successfully. Status: ${response.statusCode}`
  );

  return response;
};