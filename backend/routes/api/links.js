const express = require('express');
const router = express.Router();
const linksController = require('../../controllers/linksController');

router.route('/')
    .get(linksController.getAllLinks)
    .post(linksController.createNewLinks)
    .put(linksController.updateLinks)
    .delete(linksController.deleteLinks);

router.route('/:id')
    .get(linksController.getLinks);

module.exports = router;