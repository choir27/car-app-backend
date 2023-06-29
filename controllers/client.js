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
    }
}
