const {google} = require("googleapis");
const nodemailer = require("nodemailer");

const sdk = require('node-appwrite');
 // Initialize SDK
 const client = new sdk.Client();

 client
     .setEndpoint(process.env.ENDPOINT) // Your API Endpoint
     .setProject(process.env.PROJECT) // Your project ID
     .setKey(process.env.API_KEY) // Your Appwrite API key
 ;

 const users = new sdk.Users(client);

module.exports = {
    getUsers: async (req, res) => {
        try {
            const response = await users.list();
            res.json(response);
            
        } catch (err) {
            console.error(err);
            res.status(500).send(err);
        }
    },
    deleteUser: async (req, res) =>{
        try{
            const promise = await users.delete(req.params.id);

            if(promise){
                res.status(200).send({message: "User was deleted successfully", promise});
            }else{
                res.status(400).send({message: "User was not found."});
            }
        }catch(err){
            console.error(err);
            res.status(500).send(err);
        }
    },
    sendEmail: async (req, res) =>{
        try{

            
            const oAuth2Client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URI)
            oAuth2Client.setCredentials({refresh_token: process.env.REFRESH_TOKEN});

            const accessToken = await oAuth2Client.getAccessToken();

            const transport = nodemailer.createTransport({
                service: "gmail",
                auth:{
                    type: "OAuth2",
                    user: "richardchoi54@gmail.com",
                    clientId: process.env.CLIENT_ID,
                    clientSecret: process.env.CLIENT_SECRET,
                    refreshToken: process.env.REFRESH_TOKEN,
                    accessToken: accessToken
                }
            })

            const mailOptions = {
                from: "Richard Choi <richardchoi54@gmail.com>",
                to: req.body.email,
                subject: `${req.body.service} on your ${req.body.carYear} ${req.body.carMake} ${req.body.carModel} is ready for pick up!`,
                text:  `${req.body.service} on your ${req.body.carYear} ${req.body.carMake} ${req.body.carModel} is ready for pick up!`,
                html: `<h1>${req.body.service} on your ${req.body.carYear} ${req.body.carMake} ${req.body.carModel} is ready for pick up!</h1>`
            }
            
            const result = await transport.sendMail(mailOptions)

            res.status(500).send("Message sent: " + result);

        }catch(err){
            console.error(err);
            res.status(500).send(err);
        }
    },
    sendEstimateEmail: async (req, res) =>{
        try{

            
            const oAuth2Client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URI)
            oAuth2Client.setCredentials({refresh_token: process.env.REFRESH_TOKEN});

            const accessToken = await oAuth2Client.getAccessToken();

            const transport = nodemailer.createTransport({
                service: "gmail",
                auth:{
                    type: "OAuth2",
                    user: "richardchoi54@gmail.com",
                    clientId: process.env.CLIENT_ID,
                    clientSecret: process.env.CLIENT_SECRET,
                    refreshToken: process.env.REFRESH_TOKEN,
                    accessToken: accessToken
                }
            })

            const mailOptions = {
                from: "Richard Choi <richardchoi54@gmail.com>",
                to: req.body.email,
                subject: `Your estimate is ready, ${req.body.firstName} ${req.body.lastName}!`,
                text:  `Your estimate is ready, ${req.body.firstName} ${req.body.lastName}!`,
                html: `<h1>Your estimate is ready, ${req.body.firstName} ${req.body.lastName}!</h1><br><p>Completing a ${req.body.service} on your ${req.body.carYear} ${req.body.carMake} ${req.body.carModel} costs a total of ${req.body.price}.  If you have any additional questions, comments or concerns, feel free to contact us at fake-number-9999, or at our email at fake_email_@fakeEmail.com</p><br><br><h3>-AutoAligners</h3>`
            }
            
            const result = await transport.sendMail(mailOptions)

            res.status(500).send("Message sent: " + result);

        }catch(err){
            console.error(err);
            res.status(500).send(err);
        }
    }
}
