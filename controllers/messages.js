const Message = require("../models/message.js");

const create = async (req, res) => {
  let m = new Message();
  m.user = req.body.user;
  m.text = req.body.text;

  // save  to database
  m.save().then((result) => {
    res.json({
      status: "success",
      data: {
        message: m,
      },
    });
  });
};

const get = async (req, res) => {
    const m = await Message.find({});
    res.json({
        status: "success",
        messages: m,
    });
    
  };

module.exports = {
  create,
  get
};
