const Link = require('../model/Link');

const deleteAllLinks = async (req, res) => {
    try {
        const deletedLinks = await Link.deleteMany();
        if (deletedLinks.deletedCount === 0) {
            return res.status(404).json({ message: 'No links found.' });
        }
        res.json({ message: 'All links deleted successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error.' });
    }

};

const getAllLinks = async (req, res) => {
    try {
        const links = await Link.find();
        if (!links || links.length === 0) {
            return res.status(204).json({ message: 'No links found.' });
        }
        res.json(links);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error.' });
    }
};

const getAllSpecificLinks = async (req, res) => {
    const userId = req.params.userId;
    if (!userId) return res.status(400).json({ message: 'User ID is required.' });

    try {
        const userLinks = await Link.find({ userId: userId });
        if (!userLinks || userLinks.length === 0) {
            return res.status(404).json({ message: `No links found for user ID ${userId}.` });
        }
        res.json(userLinks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error.' });
    }
};

const createNewLinks = async (req, res) => {
    try {
        if (!Array.isArray(req.body)) {
            return res.status(400).json({ message: 'Request body should be an array.' });
        }
        const linksToInsert = [];

        console.log('req.body', req.body )

        for (const linkData of req.body) {
            const existingLink = await Link.findOne({
                id: linkData.id,
                label: linkData.label,
                answer: linkData.answer
            });

            console.log('existingLink', existingLink);

            if (!existingLink) {
                // No duplicate found, add to the array of links to insert
                linksToInsert.push(linkData);
            }
        }

        if (linksToInsert.length === 0) {
            return res.status(400).json({ message: 'All provided links are duplicates.' });
        }

        const createdLinks = await Link.insertMany(linksToInsert);
        res.status(201).json({ message: 'Links created successfully.', createdLinks });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error.' });
    }
};



const updateLinks = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ message: 'Link ID is required.' });
        }

        const updatedLink = await Link.findOneAndUpdate({ _id: id }, req.body, { new: true });
        if (!updatedLink) {
            return res.status(404).json({ message: `Link with ID ${id} not found.` });
        }

        res.json(updatedLink);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error.' });
    }
};



const deleteLinks = async (req, res) => {
    try {
        const { id, userId } = req.body;

        // Confirm data
        console.log('id', id);

        if (!id) {
            return res.status(400).json({ message: 'Link ID required' });
        }

        // Confirm link exists to delete
        const deletedLink = await Link.findOneAndDelete({ id });

        if (!deletedLink) {
            return res.status(404).json({ message: 'Link not found' });
        }

        // Fetch the remaining links after deleting the specified one
        const remainingLinks = await Link.find({ userId: userId });


        res.json({ message: 'Link deleted', deletedLink, remainingLinks });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error.' });
    }
};




const getLink = async (req, res) => {
    try {
        const { id } = req.params;
        const link = await Link.findById(id);
        if (!link) {
            return res.status(404).json({ message: `Link with ID ${id} not found.` });
        }
        res.json(link);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error.' });
    }
};


module.exports = {
    getAllLinks,
    getAllSpecificLinks,
    createNewLinks,
    updateLinks,
    deleteLinks,
    getLink,
    deleteAllLinks
};
