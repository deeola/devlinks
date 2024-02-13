const data = {
    links: require('../model/links.json'),
    setLinks: function (data) { this.links = data }
}

console.log(data)

const getAllLinks = (req, res) => {
    res.json(data.links);
}

const createNewLinks = (req, res) => {
    const newLink = {
        id: data.links?.length ? data.links[data.links.length - 1].id + 1 : 1,
        prompt: req.body.prompt,
        answer: req.body.answer,
        label: req.body.label,
        bgColor: req.body.bgColor,
        image: req.body.image,
        placeholder: req.body.placeholder,
        urlAddress: req.body.urlAddress,
        timestamp: req.body.timestamp   

    }

    if (!newLink.answer || !newLink.label ) {
        return res.status(400).json({ 'message': 'Answer and Labels are required.' });
    }


    data.setLinks([...data.links, newLink]);
    res.status(201).json(data.links);
}

const updateLinks = (req, res) => {
    const link = data.links.find(link => link.id === parseInt(req.body.id));
    if (!link) {
        return res.status(400).json({ "message": `Link ID ${req.body.id} not found` });
    }
    
    if(req.body.prompt) link.prompt = req.body.prompt;
    if(req.body.answer) link.answer = req.body.answer;
    if(req.body.label) link.label = req.body.label;
    if(req.body.bgColor) link.bgColor = req.body.bgColor;
    if(req.body.image) link.image = req.body.image;
    if(req.body.placeholder) link.placeholder = req.body.placeholder;
    if(req.body.urlAddress) link.urlAddress = req.body.urlAddress;
    if(req.body.timestamp) link.timestamp = req.body.timestamp;

    const filteredArray = data.links.filter(link => link.id !== parseInt(req.body.id));
    const unsortedArray = [...filteredArray, link];
    data.setLinks(unsortedArray.sort((a, b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0));
    res.json(data.links);
}

const deleteLinks = (req, res) => {
    const link = data.links.find(link => link.id === parseInt(req.body.id));
    if (!link) {
        return res.status(400).json({ "message": `Link ID ${req.body.id} not found` });
    }
    const filteredArray = data.links.filter(link => link.id !== parseInt(req.body.id));
    data.setLinks([...filteredArray]);
    res.json(data.links);
}

const getLinks = (req, res) => {
    const link = data.links.find(link => link.id === parseInt(req.params.id));
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
    getLinks
}