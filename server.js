// Load Environment Variables from the .env file
require('dotenv').config();

// Application Dependencies
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const client = require('./lib/client');

// Initiate database connection


// Auth
const ensureAuth = require('./lib/auth/ensure-auth');
const createAuthRoutes = require('./lib/auth/create-auth-routes');
const authRoutes = createAuthRoutes({
    async selectUser(email) {
        const result = await client.query(`
            SELECT id, email, hash, display_name as "displayName"
            FROM users
            WHERE email = $1
        `, [email]
        ); 
        return result.rows[0];
    },
    async insertUser(user, hash) {

        const result = await client.query(`
            INSERT into users (email, hash, display_name)
            VALUES ($1, $2, $3)
            RETURNING id, email, display_name as "displayName";
        `,
        [user.email, hash, user.displayName]);
        return result.rows[0];
    }
});


// Application Setup
const app = express();
const PORT = process.env.PORT;
app.use(morgan('dev')); // http logging
app.use(cors()); // enable CORS request
app.use(express.static('public')); // server files from /public folder
app.use(express.json()); // enable reading incoming json data

app.use('/api/auth', authRoutes);
app.use('/api', ensureAuth);

// API Routes



// Start the server
app.listen(PORT, () => {
    console.log('server running on PORT', PORT);
});