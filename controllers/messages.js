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
        message: m
      },
    });
  });
};

const get = async (req, res) => {
    const m = await Message.find({});
    console.log(m);
    res.json({
        status: "success",
        message: "GETTING messages",
        data: { messages: m },
    });
    
  };

const getById = async (req, res) => {
    const id = req.params.id;
    try {
        const m = await Message.find({ _id : id });
        res.json({
        status: "success",
        message: "GETTING message with ID " + id,
        data: { message: m }
    }); 
    } catch (error) {
        res.json({
            status: "error",
            message: "there is no message with ID " + id,
        }); 
    }
    // if ( await Message.exists({ _id: req.params.id })) {
    //     //     const m = await Message.find({ _id : id });
    //     res.json({
    //     status: "success",
    //     message: "there is a message",
    // }); 
    // } else {
        // res.json({
        //     status: "error",
        //     message: "there is no message with ID " + id,
        //     data : m
        // }); 
    // }
};

const edit = async (req, res) => {
    const id = req.params.id;

    if (Message.exists({ _id: id })) {
        let m = await Message.findById(req.params.id);
        Object.keys(req.body).forEach(key => {
            m[key] = req.body[key];
        });
        
        m.save().then((result) => {
            res.json({
            status: "success",
            message: "UPDATING message '" + m._id + "'",
            data: { message: m },
            });
        });
    }
};

module.exports = {
  create,
  get,
  getById,
  edit
};
