const ApiError = require("../api-error");
const MongoDB = require("../utils/mongodb.util");
const ContactService = require("../services/contact.service");


exports.create = (req, res) => {
    res.send({ message: "create handler" });
};

exports.findAll = (req, res) => {
    res.send({ message: "findAll handler"});
};

exports.findOne = (req, res) => {
    res.send({ message: "findOne handler"});
};

exports.update = (req, res) => {
    res.send({ message: "update handler"});
};

exports.delete = (req, res) => {
    res.send({ message: "delete handler"});
};

exports.deleteAll = (req, res) => {
    res.send({ message: "deleteAll handler"});
};

exports.findAllFavorite = (req, res) => {
    res.send({ message: "findAllFavorite handler"});
};


exports.create = async (req, res, next) => {
    if (!req.body?.name){
        return next(new ApiError(400, "name can not be empty"));
    }

    try {
        const contactservice = new ContactService(MongoDB.client);
        const contact = await contactservice.create(req.body);
        return res.send(document);
    }catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the contact")
        );
    }
};


exports.findAll = async (req,res, next) => {
    let document = [];

    try {
        const contactservice = new ContactService(MongoDB.client);
        const { name } = req.query;
        if (name) {
            document = await contactservice.findByName(name);

        }
        else{
            document = await contactservice.find({});
        }
    }catch (error) {
        return next(
            new ApiError(500, "An error occurred while finding the contact")
        );
    }
    return res.send(documents);
};

exports.findOne = async (req, res, next) => {
    try {
        const contactservice = new ContactService(MongoDB.client);
        const document = await contactservice.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Contact not found"));
        }
        return res.send(document);
    } catch (error) {
        return next(new ApiError(500, `Error retrieving contact with id=${req.params.id}`));
    }
};

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length == 0) {
        return next(new ApiError(400, "Data tp update can not be empty"));
    }

    try {
        const ContactService = new ContactService(MongoDB.client);
        const document = await ContactService.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, "Contact not found"));
        }
        return res.send({ message: "Contact was update successfully"});
    } catch (error) {
        return next(new ApiError(500, `Error updating contact with id=${req.params.id}`)
        );
    }
};

exports.delete = async (req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.delete(req.params.id);
        if (!document) {
            return next( new ApiError(404, "Contact not found"));
        }
        return res.send({ message: "Contact was deleted successdully"});
    } catch (error) {
        return next(new ApiError(500, `Error deleting contact with id=${req.params.id}`
            )
        );
    }
};

exports.findAllFavorite = async(_req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const documents = await contactService.findFavorite();
        return res.send(documents);
    } catch (error) {
        return next(new ApiError(500, "Error retrieving favorite contacts"));
    }
};

exports.deleteAll = async(_req, res, next ) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const deleteCount = await contactService.deleteAll();
        return res.send({
            message: `${deleteCount} contacts were deleted successfully`,
        });

    } catch (error) {
        return next(new ApiError(500, "Error deleting all contacts"));
    }
};