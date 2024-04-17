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
        const linksToUpdate = [];
        const linksToInsert = [];

        console.log('req.body', req.body );

        for (const linkData of req.body) {
            // Try to find an existing link with the provided id
            const existingLink = await Link.findOne({ id: linkData.id });
            console.log("exisiting link found", existingLink)

            if (existingLink) {
                // If an existing link is found, update it with the new data
                const updatedLink = await Link.findOneAndUpdate(
                    { id: linkData.id },
                    linkData, // Update with new data
                    { new: true } // Return the modified document after update
                );
                linksToUpdate.push(updatedLink);
            } else {
                // If no existing link is found, insert the new data as a new link
                const newLink = new Link(linkData);
                const createdLink = await newLink.save();
                linksToInsert.push(createdLink);
            }
        }

        let message;
        if (linksToUpdate.length > 0 && linksToInsert.length > 0) {
            message = 'Some links updated and some created successfully.';
        } else if (linksToUpdate.length > 0) {
            message = 'Links updated successfully.';
        } else if (linksToInsert.length > 0) {
            message = 'Links created successfully.';
        } else {
            message = 'No links were updated or created.';
        }


        res.status(201).json({ message, updatedLinks: linksToUpdate, createdLinks: linksToInsert });
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
