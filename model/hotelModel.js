const mongoose = require("mongoose");
const hotelSchema = mongoose.Schema(
  {
    fullname: {
      type: String,
      required: [true, "Please add a name"],
    },

    phone: {
      type: String,
      required: [true, "Please add an phone number"],
      unique: true,
    },
    totalAdults: {
      type: String,
      required: [true, "Please select"],
    },

    totalKids: {
      type: String,
      required: [true, "Please add a select"],
    },
    formattedCheckIn: {
      type: String,
      required: [true, "Please add a select"],
    },
    formattedCheckOut: {
      type: String,
      required: [true, "Please add a select"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Hoteldb", hotelSchema);
