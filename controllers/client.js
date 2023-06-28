const sdk = require('node-appwrite');

module.exports = {
    getUsers: async (req, res) => {
        try {
            // Initialize SDK
            const client = new sdk.Client();

            client
                .setEndpoint(process.env.ENDPOINT) // Your API Endpoint
                .setProject(process.env.PROJECT) // Your project ID
                .setKey(process.env.API_KEY) // Your Appwrite API key
            ;

            const users = new sdk.Users(client);
            const response = await users.list();
            res.json(response);
            
        } catch (err) {
            console.error(err);
            res.status(500).send(err);
        }
    }
}
