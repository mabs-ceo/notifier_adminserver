const express = require('express');
const router = express.Router();

const { getAllProviders, createProvider, updateProvider, deleteProvider } = require('../controller/Provider.controller');

router.get('/',getAllProviders);
router.post('/',createProvider);
router.put('/:id',updateProvider);
router.delete('/:id',deleteProvider);

module.exports = router;