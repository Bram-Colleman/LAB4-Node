const Message = require("../models/message.js");


const create = async (req, res) => {
  let m = new Message();
  m.user = req.body.message.user;
  m.text = req.body.message.text;
  if(await Message.exists({ _id : await Message.countDocuments()+1})) {
    let id = 1;
    while(await Message.exists({ _id : id })) {
        id++;
    }
    m._id = id;
  } else {
      m._id = await Message.countDocuments() + 1;
  }
//   m._id = 911;

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
    res.json({
        status: "success",
        message: "GETTING messages",
        data: { messages: m },
    });
    
  };

const getById = async (req, res) => {
    const id = req.params.id;

    if(await Message.exists({ _id : id })){
        const m = await Message.find({ _id : id });
        res.json({
            status: "success",
            message: "GETTING message with ID " + id,
            data: { message: m },
        });  
    } else {
        res.json({
            status: "error",
            message: "There is no message with ID " + id,
        }); 
    }
};

const edit = async (req, res) => {
    const id = req.params.id;

    if (Message.exists({ _id: id })) {
        let m = await Message.findById(id);
        Object.keys(req.body).forEach(key => {
            m[key] = req.body[key];
        });
        
        m.save().then((result) => {
            res.json({
                status: "success",
                message: "UPDATING message with ID " + m._id,
                data: { message: m },
            });
        });
    }
};

const remove = async (req, res) => {
    const id = req.params.id;

    if (Message.exists({ _id: id })) {
        let m = await Message.deleteOne({ _id : id });
        res.json({
            status: "success",
            message: "DELETING message with ID " + m._id ,
        });
    } else {
        res.json({
            status: "error",
            message: "No message found with ID " + m._id ,
        }); 
    }
};

module.exports = {
  create,
  get,
  getById,
  edit,
  remove
};
