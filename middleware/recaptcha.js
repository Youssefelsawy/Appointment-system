const axios = require("axios");

const verifyRecaptcha = async (req, res, next) => {
  const token = req.body.token;
  if (!token)
    return res.status(400).json({ message: "No reCAPTCHA token provided" });

  try {
    const secret = process.env.RECAPTCHA_SECRET_KEY;
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify`,
      null,
      {
        params: { secret, response: token },
      }
    );

    if (!response.data.success) {
      return res.status(400).json({ message: "Failed reCAPTCHA verification" });
    }

    next();
  } catch (err) {
    return res
      .status(500)
      .json({ message: "reCAPTCHA verification error", error: err.message });
  }
};

module.exports = verifyRecaptcha;
