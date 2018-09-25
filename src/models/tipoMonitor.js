const mongoose = require("mongoose");
const { Schema } = mongoose;

const TipoMonitor = new Schema(
  {
    tipo: { type: String, unique: true, uppercase: true }
  },
  { versionKey: false }
)

module.exports = mongoose.model("TipoMonitor", TipoMonitor);
