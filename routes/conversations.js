const router = require("express").Router();
const { castObject } = require("../models/Conversation");
const Conversation = require("../models/Conversation");

//New Convo
router.post("/", async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get convo of a user
router.get("/:userId", async (req, res) => {
  try {
    const conversations = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(conversations);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get convo

router.get("/find/:first/:second", async (req, res)=>{
  try{
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.first, req.params.second]}
    })
    res.status(200).json(conversation)
  }catch(err){
    res.status(500).json(err);
  }
})

module.exports = router;
