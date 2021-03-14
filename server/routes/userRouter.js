const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const User = require("../models/userModel");
const stripe = require("stripe")("sk_test_51INgaAISGLv8KvGgScijLosEsQr6zMb93u8DqmnPFXi8hISI94LDtyptw3aJm9F9ZhlauDtbnwDfAnjzfhAp2uVh00sR9QK6VK");
const nodemailer = require('nodemailer')
const sendgridTransport = require('nodemailer-sendgrid-transport')
const crypto = require('crypto')
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey("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")


const transporter = nodemailer.createTransport(sendgridTransport({
  auth:{
      api_key:'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'
  }
}))

router.post("/register", async (req, res) => {
  try {
    let { email, password, passwordCheck } = req.body;

    // validate

    if (!email || !password || !passwordCheck)
      return res.status(400).json({ msg: "Not all fields have been entered." });
    if (password.length < 5)
      return res
        .status(400)
        .json({ msg: "The password needs to be at least 5 characters long." });
    if (password !== passwordCheck)
      return res
        .status(400)
        .json({ msg: "Enter the same password twice for verification." });

    const existingUser = await User.findOne({ email: email });
    if (existingUser)
      return res
        .status(400)
        .json({ msg: "An account with this email already exists." });

    

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: passwordHash,
      subscribed: false,
      subId: '',
      resetToken: '',
      expireToken: null

      
    });
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // validate
    if (!email || !password)
      return res.status(400).json({ msg: "Not all fields have been entered." });

    const user = await User.findOne({ email: email });
    if (!user)
      return res
        .status(400)
        .json({ msg: "No account with this email has been registered." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({
      token,
      user: {
        id: user._id,
        subscribed: user.subscribed
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/delete", auth, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.user);
    res.json(deletedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



router.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("auth-token");
    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.json(false);

    const user = await User.findById(verified.id);
    if (!user) return res.json(false);

    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user);
  res.json({
    id: user._id,
  });
});

router.put("/changeStatus", async (req, res) => {
  const id = req.body.id;
  const status = req.body.subscribed;
  const subId = req.body.subId
  try {
    await User.findById(id, (err, updatedStatus)=> {
      updatedStatus.subscribed = status;
      updatedStatus.subId = subId;
      updatedStatus.save()
      res.send(updatedStatus)
    })
  } catch(err){
    res.status(500).json({error: err.message})
  }
});

router.post("/reset-password",(req,res)=>{
  crypto.randomBytes(32,(err,buffer)=>{
      if(err){
          console.log(err)
      }
      const token = buffer.toString("hex")
      User.findOne({email:req.body.email})
      .then(user=>{
          if(!user){
              return res.status(422).json({error:"User dont exists with that email"})
          }
          user.resetToken = token
          user.expireToken = Date.now() + 3600000
          user.save()
          .then((result)=>{
              const msg = {
                  to:user.email,
                  from:"khaled@nodogoro.com",
                  subject:"password reset",
                  html:`
                  <p>You requested for password reset</p>
                  <a href="http://localhost:3000/reset/${token}"> Click this link </a>
                  `
              }
              sgMail.send(msg)
          })

      })
  })
})


router.post("/new-password",(req,res)=>{
 const newPassword = req.body.password
 const sentToken = req.body.token
 User.findOne({resetToken:sentToken,expireToken:{$gt:Date.now()}})
 .then(user=>{
     if(!user){
         return res.status(422).json({error:"Try again session expired"})
     }
     bcrypt.hash(newPassword,12).then(hashedpassword=>{
        user.password = hashedpassword
        user.resetToken = undefined
        user.expireToken = undefined
        user.save().then((saveduser)=>{
            res.json({message:"password updated success"})
        })
     })
 }).catch(err=>{
     console.log(err)
 })
})




router.post('/sub', async (req, res) => {
  const {email, paymentMethodId} = req.body;

  
  const customer = await stripe.customers.create({
    email,
  });

  let paymentMethod;
  try {
    paymentMethod = await stripe.paymentMethods.attach(
      paymentMethodId, {
        customer: customer.id,
      }
    );
  } catch (error) {
    return res.status(400).send({ error: { message: error.message } });
  }

  
  const priceId = "price_1IOIb9ISGLv8KvGgKeWPHTvF";

  const subscription = await stripe.subscriptions.create({
    default_payment_method: paymentMethod.id,
    customer:customer.id,
    items: [{
      price: priceId,
    }],
    collection_method: 'send_invoice',
    days_until_due: 30,
    expand: ['latest_invoice.payment_intent'],
  });

  res.send({ subscription });

 
})



router.post('/unsubscribe', async (req, res) => {
  // Cancel the subscription
  
  try {
    await User.findById(req.body.id, (err, updatedStatus)=> {
      const deletedSubscription =  stripe.subscriptions.del(
        updatedStatus.subId
      );
    
      res.send({ subscription: deletedSubscription });
    })
  } catch(err){
    res.status(500).json({error: err.message})
  }
  
});


module.exports = router;
