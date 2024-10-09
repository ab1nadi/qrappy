const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();


const PocketBase = require('pocketbase/cjs');

const pb = new PocketBase('http://pocketbase:8080'); // Replace with your PocketBase URL
pb.admins.authWithPassword('abinadi.swapp@nsanpete.org', 'jbz5ZKJ5wah-cwp7fcx')


// Middleware to parse the request body (should be before routes)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Define routes using express.Router()
const router = express.Router();

// Example API route (adjust as needed)
router.post('/connected', (req, res) => {

    let uuid = req.body.uuid
    let location = req.body.location
    console.log(req.body.uuid, req.body.location)

    pb.collection('QR_Attempts').getFirstListItem(`UUID="${uuid}" && location="${location}"`, {
        expand: 'count',
    })
    .then((record)=>
    {
        const data = {
            "UUID": uuid,
            "count": record.count+1
        };
        
        pb.collection('QR_Attempts').update(record.id, data).then(rec=> console.log("Updated a record", record))
    })
    .catch(e => 
    {
        const data = {
            "UUID": uuid,
            "count": 1,
            "location": location
        };
        
        pb.collection('QR_Attempts').create(data).then(record=>console.log("Created a record", record))  
    })
});

// Use the API routes
app.use('/api', router);

// Serve the static files from the React app
app.use('/', express.static(path.join(__dirname, '/qrapp')));

// Handles any requests that don't match the ones above
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname + '/qrapp/index.html'));
});

const port = process.env.port || 3000;

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

// Example route for the root path
app.get('/', (req, res) => {
    if (req.session) {
        console.log(req.session);
    }
    console.log('Root route accessed');
    res.send('Root route');
});
