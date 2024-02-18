
const Link = require('../model/Link');

// const data = {
//     links: require('../model/links.json'),
//     setLinks: function (data) {
//         this.links = data;
//         fs.writeFile('./model/links.json', JSON.stringify(data), (err) => {
//             if (err) {
//                 console.error('Error writing to links.json:', err);
//             } else {
//                 console.log('links.json updated successfully.');
//             }
//         });
//     }
// }





const getAllLinks = async(req, res) => {
    const links = await Link.find();
    if (!links) return res.status(204).json({ 'message': 'No employees found.' });
    res.json(links);
}





const getAllSpecificLinks = async (req, res) => {
    const userId = req.params.userId;
    if (!userId) return res.status(400).json({ "message": "User ID is required." });
    try {
        const userLinks = await Link.find({ userId: userId }).exec();

        if (userLinks.length === 0) {
            return res.status(404).json({ "message": `No links found for user ID ${userId}.` });
        }

        res.json(userLinks);
    } catch (err) {
        console.error(err);
        res.status(500).json({ "message": "Internal Server Error." });
    }
};




// const createNewLinks = async (req, res) => {
//     try {
//         // Checking if req.body is an array
//         if (!Array.isArray(req.body)) {
//             return res.status(400).json({ 'message': 'Request body should be an array.' });
//         }

//         // Iterating over each item in the array
//         for (const newLink of req.body) {
//             console.log(newLink);
//             if (!newLink.answer || !newLink.label || !newLink.image || !newLink.bgColor || !newLink.id || !newLink.userId) {
//                 return res.status(400).json({ 'message': 'Answer, Label, image, bgcolor, id, and userID are all required.' });
//             }

//             // Check if a link with the same label and userId already exists
//             const existingLink = await Link.findOne({ label: newLink.label, userId: newLink.userId }).exec();
//             if (existingLink) {
//                 console.log(`Skipping creation for label: ${newLink.label} and userId: ${newLink.userId} because it already exists.`);
//                 continue; // Skip creating this link and proceed to the next one
//             }

//             // Create a new link if it doesn't already exist
//             const result = await Link.create({
//                 "answer": newLink.answer,
//                 "label": newLink.label,
//                 "image": newLink.image,
//                 "bgColor": newLink.bgColor,
//                 "id": newLink.id,
//                 "userId": newLink.userId
//             });

    

//             console.log(`Created link with label: ${newLink.label} and userId: ${newLink.userId}.`);
//         }

//         res.status(201).json({ 'message': 'Links created successfully.' });
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ 'message': 'Internal Server Error.' });
//     }
// };


const createNewLinks = async (req, res) => {
    try {
        // Checking if req.body is an array
        if (!Array.isArray(req.body)) {
            return res.status(400).json({ 'message': 'Request body should be an array.' });
        }

        // Iterating over each item in the array
        for (const newLink of req.body) {
            if (!newLink.answer || !newLink.label || !newLink.image || !newLink.bgColor || !newLink.id || !newLink.userId) {
                return res.status(400).json({ 'message': 'Answer, Label, image, bgcolor, id, and userID are all required.' });
            }

            // Update the document if it exists, otherwise create a new one
            await Link.findOneAndUpdate(
                { label: newLink.label, userId: newLink.userId },
                {
                    $set: {
                        "answer": newLink.answer,
                        "image": newLink.image,
                        "bgColor": newLink.bgColor,
                        "id": newLink.id,
                    }
                },
                { upsert: true }
            );

            console.log(`Created or updated link with label: ${newLink.label} and userId: ${newLink.userId}.`);
        }

        res.status(201).json({ 'message': 'Links created or updated successfully.' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ 'message': 'Internal Server Error.' });
    }
};



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

