const mongoose = require("mongoose");

const emailSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true, // normalizes the email
      trim: true,
      validate: {
        validator: function (v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    subscribedOn: {
      type: Date,
      default: Date.now,
      immutable: true, // ensures this date can’t be modified later
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt fields automatically
  }
);

const Email = mongoose.model("Email", emailSchema);

module.exports = Email;
