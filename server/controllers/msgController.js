const msgModel = require("../model/msgModel");

// Add Messages
module.exports.addMessage = async (req, res, next) => {
  // Add Message in db
  try {
    const { from, to, message } = req.body;
    const data = await msgModel.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });

    // if msg is not added
    if (!data)
      return res.json({ msg: "Failed to add message to the database." });
    return res.json({ msg: "Message added successfully." });
  } catch (ex) {
    console.log(ex);
    next(ex);
  }
};

// Get All Messages
module.exports.getAllMessages = async (req, res, next) => {
  try {
    const { from, to } = req.body;
    const messages = await msgModel
      .find({
        users: {
          $all: [from, to],
        },
      })
      .sort({ updatedAt: 1 });

    // return all messages
    const allMessages = messages?.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });

    res.json(allMessages);
  } catch (ex) {
    console.log(ex);
    next(ex);
  }
};
