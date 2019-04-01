const express = require("express");
const nodemailer = require('nodemailer');
const router = express.Router();

router.get("/", function(req, res){
    res.render("home/index");
});

router.get("/about", function(req, res){
    res.render("home/about");
});

router.get("/tickets", function(req, res){
    res.render("tickets/tickets");
});

router.get("/about/more", function(req, res){
    res.render("home/more");
});

router.get("/participate", function(req, res){
    res.render("home/participate");
});

router.get("/tickets/sugar", function(req, res){
    res.render("tickets/sugar");
});

router.get("/tickets/diamond", function(req, res){
    res.render("tickets/diamond");
});

router.get("/tickets/sugar/checkout", function(req, res){
    res.render("checkout/sugar");
});

router.get("/tickets/diamond/checkout", function(req, res){
    res.render("checkout/diamond");
});

// sends email from process.env.EMAIL (website email, can be changed)
//  to whatever address is set in mailOptions.to (admin email, can be the same as website email)
router.post("/participate", function(req, res){
    async function main(){

        // need to authenticate EMAIL and get clientID, Secret, and Refresh token when adding a new email
        //  using OAuth specifications found on Google's developer platform
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            auth: {
                type: "OAuth2",
                user: process.env.EMAIL,
                clientId:"\n" + process.env.CLIENTID + "\n" ,
                clientSecret: "\n" + process.env.CLIENTSECRET + "\n" ,
                refreshToken: process.env.REFRESHTOKEN
            }
        });

        // setup email data
        let mailOptions = {
            from: "Museum of Candy",
            to: "codemode.io@gmail.com",
            subject: "Museum Volunteer Inquiry", // Subject line
            text: req.body.message + "\n\nTo reply to this inquiry, please send an application to the user's email:\n" +
            req.body.email // plain text body

        };

        // send mail with defined transport object
        let info = await transporter.sendMail(mailOptions);

        console.log("Message sent: %s", info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        console.log(req.body);
    }

    main().catch(console.error);
    req.flash("success", "Message sent successfully! Thank you for your interest. " +
        "\nKeep an eye out in the email you provided for a response from us!");
    res.redirect("/participate");
});

module.exports = router;