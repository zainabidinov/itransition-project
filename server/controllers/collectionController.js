const { Collection } = require("../models");
const cloudinary = require("../config/cloudinaryConfig");

exports.getCollectionsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const collections = await Collection.findAll({ where: { userId } });
    return res.status(200).send({
      message: "Collection fetched successfully.",
      success: true,
      collections,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching collections." });
  }
};

exports.createCollection = async (req, res) => {
  try {
    const { userId } = req.params;
    const { collectionTitle, collectionCategory } = req.body;

    const collection = await Collection.create({
      userId,
      title: collectionTitle,
      category: collectionCategory,
    });

    return res.status(200).send({
      message: "Collection has been created.",
      success: true,
      data: collection,
    });
  } catch (error) {
    console.error("Error creating collection", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the collection." });
  }
};

exports.uploadCollectionImage = async (req, res) => {
  try {
    const { collectionId } = req.params;
    const { path } = req.file;
    const response = await cloudinary.uploader.upload(path);

    const collection = await Collection.findByPk(collectionId);
    collection.imageUrl = response.secure_url;
    await collection.save();

    res.status(200).json({
      success: true,
      imageUrl: response.secure_url,
    });
  } catch (error) {
    console.error("Error uploading image", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

exports.getCollectionById = async (req, res) => {
  try {
    const { collectionId } = req.params;
    const collection = await Collection.findByPk(collectionId);
    return res.status(200).send({
      message: "Collection fetched successfully.",
      success: true,
      collection,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching collections." });
  }
};

exports.getCollections = async (req, res) => {
  try {
    const collections = await Collection.findAll({
      attributes: [
        "id",
        "title",
        "category",
        "description",
        "imageUrl",
        "userId",
      ],
    });

    return res.status(200).send({
      message: "Collections fetched successfully.",
      success: true,
      collections,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching collections." });
  }
};
