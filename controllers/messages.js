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
        message: "GETTING messages",
        data: { messages: m },
    });
    
  };

const getById = async (req, res) => {
    const id = req.params.id;
    if (Message.exists({ _id: id })) {
        const m = await Message.find({ _id : id });
        res.json({
            status: "success",
            message: "GETTING message " + id,
            data: { message: m },
        });
    }
};


module.exports = {
  create,
  get,
  getById,
};
