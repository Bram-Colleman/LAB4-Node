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
  if(await Message.exists({ _id : 911 }) == false){
      m._id = 911;
  }

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
    let m;

    if(req.query.user){
        m = await Message.find({ user : req.query.user});
    } else {
        m = await Message.find({});
    }
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

    if (await Message.exists({ _id: id })) {
        await Message.deleteOne({ _id : id });
        res.json({
            status: "success",
            message: "DELETING message with ID " + id ,
        });
    } else {
        res.json({
            status: "error",
            message: "No message found with ID " + id ,
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
