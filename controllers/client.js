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
            const promise = users.delete(req.params.id);
            console.log(promise)
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
                to: "richardchoi3@gmail.com",
                subject: "You know what?",
                text: "I think I do.",
                html: "<h1>I do.</h1>"
            }
            
            const result = await transport.sendMail(mailOptions)

            res.status(500).send("Message sent: " + result);

        }catch(err){
            console.error(err);
            res.status(500).send(err);
        }
    }
}
