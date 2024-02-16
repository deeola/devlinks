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

const getAllSpecificLinks = (req, res) => {
    const userId = req.params.userId;
    if(!userId) return res.status(400).json({ "message": "User ID is required." });
    const userLinks = data.links.filter(link => link.userID === userId);
    if(!userLinks) return res.status(400).json({ "message": `There is no links found for ${userId}.`});
    res.json(userLinks);
}


const createNewLinks = (req, res) => {
    const newLinks = req.body; // Assuming req.body is an array of newLink objects

    if (!Array.isArray(newLinks) || newLinks.length === 0) {
        return res.status(400).json({ 'message': 'Request payload should contain an array with at least one object.' });
    }

    for (const newLink of newLinks) {
        // Check if any of the required fields are missing
        if (!newLink.answer || !newLink.label || !newLink.image || !newLink.bgColor || !newLink.id) {
            return res.status(400).json({ 'message': 'Answer, Label, image, bgcolor, and id are all required.' });
        }

        // Check if a link with the same ID already exists
        const existingLinkIndex = data.links.findIndex(link => link.id === newLink.id);
        if (existingLinkIndex !== -1) {
            // A link with the same ID exists, check if it's the same link
            const existingLink = data.links[existingLinkIndex];
            if (existingLink.label === newLink.label && existingLink.image === newLink.image && existingLink.bgColor === newLink.bgColor) {
                // Same link, skip adding
                continue;
            } else {
                // Different link, replace the existing one with the new link
                data.links[existingLinkIndex] = newLink;
            }
        } else {
            // Check if a link with the same label already exists
            const linkWithLabelExists = data.links.some(link => link.label === newLink.label);
            if (linkWithLabelExists) {
                return res.status(400).json({ 'message': 'A link with the provided label already exists.' });
            }
            
            // If the new link doesn't exist, add it to the data.links array
            data.links.push(newLink);
        }
    }

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
    getLink,
    getAllSpecificLinks
}

