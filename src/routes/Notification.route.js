const express = require('express');
const { getAllStatus, createNotification, deleteNotification, getAllNotification } = require('../controller/Notification.controller');
const isAuthenticated = require('../middlewares/auth.middleware');
const router = express.Router();

router.get('/', isAuthenticated, getAllStatus);
router.get('/full', isAuthenticated, getAllNotification);
router.post('/',isAuthenticated, createNotification);
router.delete('/:id',isAuthenticated, deleteNotification);

module.exports = router;
