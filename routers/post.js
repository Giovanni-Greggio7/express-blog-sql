const express = require('express')
const controllore = require('../controllers/controllore')
const router = express.Router()

// index
router.get('/', controllore.index);

// show
router.get('/:id', controllore.show);

// store
router.post('/', controllore.store);

// update
router.put('/:id', controllore.update);

// modify
router.patch('/:id', controllore.modify);

// destroy
router.delete('/:id', controllore.destroy);

module.exports = router