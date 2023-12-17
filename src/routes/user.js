const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const UserSequelize = require('../repositories/userSequelize.js');
const User = require('../models/user.js');
const { authorize } = require('../common/authorize.js');
const { json } = require('body-parser');

router.get('/', authorize, async (req, res) => {
    try {
        UserSequelize.getAllUsers((err, user) => {
            if (err) {
                res.status(500).json({ error: 'Internal server error' });
                return;
            }
            if (!user) {
                res.status(404).json({ error: 'User not found' });
                return;
            }
            res.status(200).json(user);
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/me', authorize, async (req, res) => {
    try {
        const email = req.userEmail;
        const firstName = req.firstName;
        const avatar = req.avatar;
        console.log('useravatar',avatar);
        res.status(200).json({ firstName: firstName , email: email  , avatar:  avatar  });
      
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/sign-in', async (req, res) => {
    try {
        const { email, password } = req.body;
        UserSequelize.login(email, (err, user) => {
            if (err) {
                res.status(500).json({ error: `Internal server error '${err}'` });
                return;
            }
            if (!user) {
                res.status(400).json({ error: 'username or password incorrect' });
                return;
            }

            bcrypt.compare(password, user.password, (err, result) => {
            console.log('err',err);

                if (err) {
                    return res.status(500).json({ error: 'Internal server error' });
                }

                if (!result) {
                    return res.status(401).json({ error: 'Invalid credentials' });
                }

                const token = jwt.sign({ userId: user.id, userEmail: user.email, firstName: user.firstName , avatar: user.avatar}, 'secret', { expiresIn: '1h' });
                const refreshToken  = jwt.sign({ userId: user.id, userEmail: user.email, firstName: user.firstName , avatar: user.avatar}, 'secret' );

                UserSequelize.saveRefereshToken(email,refreshToken)
                res.status(200).json({ token, refreshToken });
            });
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/sign-up', (req, res) => {
    const { firstName, lastName, email, password ,avatar } = req.body;
    bcrypt.hash(password, 10, (err, hash) => {
        const user = new User(firstName, lastName, email, hash,avatar)
        UserSequelize.createUser(user);
        res.status(201).json({ message: 'User created successfully' });
    });
});

module.exports = router;