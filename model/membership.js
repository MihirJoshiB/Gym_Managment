const mongoose = require('mongoose');

const membership_MasterSchema = new mongoose.Schema({
  PackageId: {
    type: mongoose.Schema.Object_Id,
    ref: 'package',
    required: true,
  },
  Member_Start_Date: {
    type: Date,
    required: true,
  },
  Member_End_Date: {
    type: Date,
    required: true,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('MemberShip_Master', membership_MasterSchema);
