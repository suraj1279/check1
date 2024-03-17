// Server-side code (app.js)
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

// Middleware to parse JSON data
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./index.html"));
});

app.post("/bfhl", (req, res) => {
  try {
    const data = req.body;
    // No need to destructure here
    console.log(data);
    // Validate input
    if (!Array.isArray(data)) {
      throw new Error("Input must be an array");
    }

    const user_id = "john_doe_17091999";
    const email = "john@xyz.com";
    const roll_number = "ABCD123";
    const even_numbers = [];
    const odd_numbers = [];
    const alphabets = [];

    // Process array elements
    for (let i = 0; i < data.length; i++) {
      if (data[i] >= "0" && data[i] <= "9") {
        let c = parseInt(data[i]);
        if (c % 2 == 0) {
          even_numbers.push(data[i]);
        } else {
          odd_numbers.push(data[i]);
        }
      } else if (typeof data[i] === "string") {
        const uppercase = data[i].toUpperCase();
        alphabets.push(uppercase);
      }
    }

    // Prepare response
    const response = {
      is_success: true,
      user_id: user_id,
      email: email,
      roll_number: roll_number,
      even_numbers: even_numbers,
      odd_numbers: odd_numbers,
      alphabets: alphabets,
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 3000; // Use process.env.PORT if available
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
