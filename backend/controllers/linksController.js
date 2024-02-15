const fs = require('fs');
const data = {
    links: require('../model/links.json'),
    setLinks: function (data) {
        this.links = data;
        fs.writeFile('./model/links.json', JSON.stringify(data), (err) => {
            if (err) {
                console.error('Error writing to links.json:', err);
            } else {
                console.log('links.json updated successfully.');
            }
        });
    }
}



const getAllLinks = (req, res) => {
    res.json(data.links);
}


const createNewLinks = (req, res) => {
    const newLink = {
        id: req.body.id,
        label: req.body.label,
        answer: req.body.answer,    
        image: req.body.image,
        bgColor: req.body.bgColor,
    }

    if (!newLink.answer || !newLink.label || !newLink.image || !newLink.bgColor || !newLink.id) {
        return res.status(400).json({ 'message': 'Answer,Label, image, bgcolor and id are all required.' });
    }


    data.setLinks([...data.links, newLink]);
    res.status(201).json(data.links);
}

const updateLinks = (req, res) => {
    const link = data.links.find(link => link.id === req.body.id);
    if (!link) {
        return res.status(400).json({ "message": `Link ID ${req.body.id} not found` });
    }
    
    if(req.body.answer) link.answer = req.body.answer;
    if(req.body.label) link.label = req.body.label;
    if(req.body.bgColor) link.bgColor = req.body.bgColor;
    if(req.body.image) link.image = req.body.image;

    const filteredArray = data.links.filter(link => link.id !== req.body.id);
    const unsortedArray = [...filteredArray, link];
    data.setLinks(unsortedArray.sort((a, b) => a.id.localeCompare(b.id))); // Sort as strings
    res.json(data.links);
}


const deleteLinks = (req, res) => {
    const link = data.links.find(link => link.id === req.body.id);
    console.log(link)
    if (!link) {
        return res.status(400).json({ "message": `Link ID ${req.body.id} not found` });
    }
    const filteredArray = data.links.filter(link => link.id !== req.body.id);
    data.setLinks([...filteredArray]);
    res.json(data.links);
}


const getLink = (req, res) => {
    const link = data.links.find(link => link.id === req.params.id);

    if (!link) {
        return res.status(400).json({ "message": `Link ID ${req.params.id} not found` });
    }
    res.json(link);
}

module.exports = {
    getAllLinks,
    createNewLinks,
    updateLinks,
    deleteLinks,
    getLink
}