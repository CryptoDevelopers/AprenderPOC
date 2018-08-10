require('dotenv').config({ path: '../.env' });
const express = require('express');
const bodyParser = require('body-parser');
const pg = require('pg');
const password = ''; //REDACTED for GITHUB
const connectionString = 'postgresql://ost:' + password + '@ost-poc.cmsffmdasle7.us-east-1.rds.amazonaws.com:5432/ost';
const app = express();

const request = require('request');
const crypto = require('crypto');
const queryString = require('query-string');
const user24 = 'b0851935-b08d-4027-ae33-ed35fe6ac0dc'

OSTSDK = require('@ostdotcom/ost-sdk-js');
const apiEndpoint = 'https://sandboxapi.ost.com/v1.1/';
const api_key = process.env.KEY;
const api_secret = process.env.SECRET;
const ostObj = new OSTSDK({ apiKey: api_key, apiSecret: api_secret, apiEndpoint: apiEndpoint });
const userService = ostObj.services.users;
const airdropService = ostObj.services.airdrops;
const actionService = ostObj.services.actions;
const transactionService = ostObj.services.transactions;
const balanceService = ostObj.services.balances;
const ledgerService = ostObj.services.ledger;

app.use(bodyParser.json());
app.listen(8000, () => {
    console.log('\n********************* Server started! *********************');
});

// JOBS ----------------------------------------------------------------------
app.route('/api/jobs/all').get((req, res) => {
    console.log('\nGetting all jobs...');
    const results = [];
    // Get a Postgres client from the connection pool
    pg.connect(connectionString, (err, client, done) => {
        // Handle connection errors
        if (err) {
            done();
            console.log(err);
            return res.status(500).json({ success: false, data: err });
        }
        // SQL Query > Select Data
        const query = client.query('SELECT * FROM jobs ORDER BY date_posted DESC;');
        // Stream results back one row at a time
        query.on('row', (row) => {
            results.push(row);
        });
        // After all data is returned, close connection and return results
        query.on('end', () => {
            done();
            return res.json(results);
        });
    });
});

app.route('/api/jobs/:job_id').get((req, res) => {
    const requestedJob = req.params['job_id']
    console.log('\nGetting job ' + requestedJob + '...');
    const results = [];
    // Get a Postgres client from the connection pool
    pg.connect(connectionString, (err, client, done) => {
        // Handle connection errors
        if (err) {
            done();
            console.log(err);
            return res.status(500).json({ success: false, data: err });
        }
        // SQL Query > Select Data
        const query = client.query('SELECT * FROM jobs WHERE job_id = '.concat(requestedJob), function (err, result) {
            if (err) {
                return res.status(400).send(err.detail)
            }
        });
        // Stream results back one row at a time
        query.on('row', (row) => {
            results.push(row);
        });
        // After all data is returned, close connection and return results
        query.on('end', () => {
            done();
            if (results.length == 0) {
                return res.status(400).send("Job doesn't exist")
            }
            else {
                return res.json(results);
            }
        });
    });
});

app.route('/video').post((req, res) => {
    console.log('\nPosting new video...');
    // Grab data from http request
    const data = { title: req.body.title, description: req.body.description };

    // Transfer tokens from poster to company
    const action_id = '39302' // Upload vid action
    const company_id = '1c4dcbc4-6f17-4bbc-9891-0a0322aae65b'

    transactionService.execute({ from_user_id: user24, to_user_id: company_id, action_id: action_id }).then(function (res) {
        console.log("Upload vid transfer initiated: \n" + JSON.stringify(res));
        var transaction_id = res.data.transaction.id
        console.log("transaction_id:" + JSON.stringify(transaction_id));
    }).catch(function (err) {
        console.log(JSON.stringify(err));
    });
});

app.route('/api/jobs/delete/:job_id').delete((req, res) => {
    const requestedJob = req.params['job_id'];
    console.log('\nDeleting job ' + requestedJob + "...");
    const results = [];
    // Get a Postgres client from the connection pool
    pg.connect(connectionString, (err, client, done) => {
        // Handle connection errors
        if (err) {
            done();
            console.log(err);
            return res.status(500).json({ success: false, data: err });
        }
        // Check to see if job exists
        const query = client.query('SELECT * FROM jobs WHERE job_id = '.concat(requestedJob), function (err, result) {
            if (err) {
                return res.status(400).send(err.detail)
            }
        });

        // Stream results back one row at a time
        query.on('row', (row) => {
            results.push(row);
        });

        // Close connection
        query.on('end', () => {
            done();
            if (results.length == 0) {
                return res.status(400).send("Job " + requestedJob + " doesn't exist")
            }
            else {
                // SQL Query > Delete Data
                client.query('DELETE FROM jobs WHERE job_id = '.concat(requestedJob));
                console.log("Job deleted")
                return res.status(200).send("Job " + requestedJob + " deleted")
            }
        });
    });
});

// USERS ----------------------------------------------------------------------
app.route('/users/:username').get((req, res) => {
    const requestedUser = req.params['username'];
    console.log('\nGetting user ' + requestedUser + '...');
    const results = [];
    // Get a Postgres client from the connection pool
    pg.connect(connectionString, (err, client, done) => {
        // Handle connection errors
        if (err) {
            done();
            console.log(err);
            return res.status(500).json({ success: false, data: err });
        }
        // SQL Query > Select Data
        const query = client.query("SELECT * FROM users WHERE username = '" + requestedUser + "'", function (err, result) {
            if (err) {
                console.log(err);
                return res.status(400).send(err.detail)
            }
        });
        // Stream results back one row at a time
        query.on('row', (row) => {
            results.push(row);
        });
        // After all data is returned, close connection and return results
        query.on('end', () => {
            done();
            if (results.length == 0) {
                return res.status(400).send("User doesn't exist")
            }
            else {
                return res.json(results);
            }
        });
    });
});


app.route('/balances').get((req, res) => {
    balanceService.get({ id: user24 }).then(function (result) {
        const balance = result.data.balance.available_balance;
        // console.log(balance);
        return res.status(200).send(balance);
    }).catch(function (err) {
        console.log(err);
        return res.status(400).send();
    });
});

app.route('/ledger').get((req, res) => {
    ledgerService.get({ id: user24 }).then(function (result) {
        const ledger = result.data.transactions;
        const obj = {"ledger":ledger};
        // console.log(obj);
        return res.status(200).send(obj);
    }).catch(function (err) {
        console.log(err);
        return res.status(400).send();
    });
});


app.route('/airdrop').post((req, res) => {
    console.log('\nairdropping ' + req.body.amount + ' to user ' + req.body.user_ids);
    // const data = { username: req.body.amount };

    airdropService.execute({
        amount: req.body.amount,
        user_id: req.body.user_id
    })
        .then(function (res) {
            console.log("Air drop initiated:\n" + JSON.stringify(res));
            var id = res.data.airdrop.id;
            // Check status of airdrop
            airdropService.get({ id: id }).then(function (res) {
                console.log("Air drop status:\n" + JSON.stringify(res));
            }).catch(function (err) {
                console.log(JSON.stringify(err));
            });
        }).catch(function (err) {
            console.log("NOPE!");
            console.log(JSON.stringify(err));
            return res.status(400).json({ success: false, data: err });
        });
});

app.route('/users/delete/:username').delete((req, res) => {
    const requestedUser = req.params['username'];
    console.log('\nDeleting user ' + requestedUser + '...');
    const results = [];
    // Get a Postgres client from the connection pool
    pg.connect(connectionString, (err, client, done) => {
        // Handle connection errors
        if (err) {
            done();
            console.log(err);
            return res.status(500).json({ success: false, data: err });
        }
        // Check to see if user exists
        const query = client.query("SELECT * FROM users WHERE username = '" + requestedUser + "'", function (err, result) {
            if (err) {
                return res.status(400).send(err.detail)
            }
        });

        // Stream results back one row at a time
        query.on('row', (row) => {
            results.push(row);
        });

        // Close connection
        query.on('end', () => {
            done();
            if (results.length == 0) {
                return res.status(400).send("User " + requestedUser + " doesn't exist")
            }
            else {
                // SQL Query > Delete Data
                client.query("DELETE FROM users WHERE username = '" + requestedUser + "'");
                console.log(requestedUser + 'deleted');
                return res.status(200).send("User " + requestedUser + " deleted")
            }
        });
    });
});


// APPLICATIONS ----------------------------------------------------------------------
app.route('/applications/:application_id').get((req, res) => {
    const requestedApplication = req.params['application_id'];
    console.log('\nGetting application ' + requestedApplication + '...');
    const results = [];
    // Get a Postgres client from the connection pool
    pg.connect(connectionString, (err, client, done) => {
        // Handle connection errors
        if (err) {
            done();
            console.log(err);
            return res.status(500).json({ success: false, data: err });
        }
        // SQL Query > Select Data
        const query = client.query("SELECT * FROM applications WHERE application_id = " + requestedApplication, function (err, result) {
            if (err) {
                console.log(err);
                return res.status(400).send(err.detail)
            }
        });
        // Stream results back one row at a time
        query.on('row', (row) => {
            results.push(row);
        });
        // After all data is returned, close connection and return results
        query.on('end', () => {
            done();
            if (results.length == 0) {
                return res.status(400).send("Application doesn't exist")
            }
            else {
                return res.json(results);
            }
        });
    });
});

app.route('/applications/new').post((req, res) => {
    console.log('\nCreating new application...');
    var applicator = '';
    var poster = '';

    // Grab data from http request
    const data = { job_id: req.body.job_id, username: req.body.username, date_applied: req.body.date_applied, message: req.body.message };

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, (err, client, done) => {
        // Handle connection errors
        if (err) {
            done();
            console.log(err);
            return res.status(500).json({ success: false, data: err });
        }
        // SQL Query > Select Data
        const query = client.query("SELECT user_id FROM users WHERE username = '" + data.username + "'", function (err, result) {
            if (err) {
                console.log(err);
                return res.status(400).send(err.detail)
            }
        });
        // Stream results back one row at a time
        query.on('row', (row) => {
            // console.log(row)
            applicator = JSON.parse(JSON.stringify(row)).user_id;
        });
        // After all data is returned, close connection and return results
        query.on('end', () => {
            done();
            // Get a Postgres client from the connection pool
            pg.connect(connectionString, (err, client, done) => {
                // Handle connection errors
                if (err) {
                    done();
                    console.log(err);
                    return res.status(500).json({ success: false, data: err });
                }
                // SQL Query > Select Data
                const query = client.query("SELECT users.user_id FROM jobs LEFT OUTER JOIN users ON jobs.username = users.username WHERE job_id = " + data.job_id, function (err, result) {
                    if (err) {
                        console.log(err);
                        return res.status(400).send(err.detail)
                    }
                });
                // Stream results back one row at a time
                query.on('row', (row) => {
                    // console.log(row)
                    poster = JSON.parse(JSON.stringify(row)).user_id;
                });
                // After all data is returned, close connection and return results
                query.on('end', () => {
                    done();

                    // Insert record into application table
                    pg.connect(connectionString, (err, client, done) => {
                        // Handle connection errors
                        if (err) {
                            done();
                            console.log(err);
                            return res.status(500).json({ success: false, data: err });
                        }

                        // SQL Query > Insert Data
                        const query = client.query('INSERT INTO applications(job_id, username, date_applied, message) values($1, $2, $3, $4)', [data.job_id, data.username, data.date_applied, data.message], function (err, result) {
                            if (err) {
                                return res.status(400).send(err.detail)
                            }
                        });
                        // Close connection
                        query.on('end', () => {
                            done();
                            return res.status(200).send("Application recorded")
                        });
                    });

                    // Transfer tokens from applicator to poster
                    const action_id = '33853' //(Apply job action)
                    console.log("Poster's user_id: " + JSON.stringify(poster))
                    console.log("Applicator's user_id: " + JSON.stringify(applicator))
                    transactionService.execute({ from_user_id: applicator, to_user_id: poster, action_id: action_id }).then(function (res) {
                        console.log("Apply job funds transfer initiated: \n" + JSON.stringify(res));
                        var transaction_id = res.data.transaction.id
                        console.log("Transaction_id:" + JSON.stringify(transaction_id));
                    }).catch(function (err) {
                        console.log(JSON.stringify(err));
                    });
                });
            });
        });
    });
});

// Login Authentification
app.route('/login').post((req, res) => {
    console.log('\nLogin authentification initiated...');
    var results = [];

    // Grab data from http request
    const data = { username: req.body.username, password: req.body.password };

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, (err, client, done) => {
        // Handle connection errors
        if (err) {
            done();
            console.log(err);
            return res.status(500).json({ success: false, data: err });
        }
        // SQL Query > Select Data
        const query = client.query("SELECT * FROM users WHERE username = '" + data.username + "' AND password = '" + data.password + "'", function (err, result) {
            if (err) {
                console.log(err);
                return res.status(400).send(err.detail)
            }
        });
        // Stream results back one row at a time
        query.on('row', (row) => {
            results.push(row)
        });
        // After all data is returned, close connection and return results
        query.on('end', () => {
            done();
            if (results.length == 0) {
                console.log('Login failed');
                return res.status(400).send("False")
            }
            else {
                console.log('Login success');
                return res.status(200).send("True");
            }
        });
    });
});