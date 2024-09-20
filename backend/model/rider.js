const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const riderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name!"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email address"],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minLength: [6, "Password should be greater than 6 characters"],
    select: false,
  },
  description: {
    type: String,
  },
  address: {
    type: String,
    
  },
  phoneNumber: {
    type: String,
    required: true,
  },

  carNumber: {
    type: String,
    
  },

  role: {
    type: String,
    default: "Delivery",
  },
  avatar: {
    public_id: {
      type: String,
      
    },
    url: {
      type: String,
     
    },
  },
  
  ghcardfront: {
    public_id: {
      type: String,
      
    },
    url: {
      type: String,
      
    },
  },

  ghcardback: {
    public_id: {
      type: String,
      
    },
    url: {
      type: String,
     
    },
  },

  licensefront: {
    public_id: {
      type: String,
      
    },
    url: {
      type: String,
     
    },
  },

  licenseback: {
    public_id: {
      type: String,
      
    },
    url: {
      type: String,
      
    },
  },

  withdrawMethod: {
    type: Object,
  },
  availableBalance: {
    type: Number,
    default: 0,
  },
  transections: [
    {
      amount: {
        type: Number,
        required: true,
      },
      status: {
        type: String,
        default: "Processing",
      },
      createdAt: {
        type: Date,
        default: Date.now(),
      },
      updatedAt: {
        type: Date,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  resetPasswordToken: String,
  resetPasswordTime: Date,
  isAvailable: {
    type: Boolean,
    default: false,
  },
});

// Hash password
riderSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// jwt token
riderSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

// comapre password
riderSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("Rider", riderSchema);