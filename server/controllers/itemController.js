const { Item } = require("../models");

exports.getItemsByCollection = async (req, res) => {
    try {
        const { collectionId } = req.params;
        const items = await Item.findAll({ where: { collectionId } });
        return res.status(200).send({
            message: "Items fetched successfully.",
            success: true,
            data: items
        });
    } catch (error) {
        console.error("Error fetching items", error);
        res.status(500).json({
            error: "An error occurred while fetching items.",
        });
    }
}

exports.createItem = async (req, res) => {
  try {
    const { collectionId } = req.params;
    const { title, itemTag, userId } = req.body;

    const item = await Item.create({
      title,
      itemTag,
      collectionId,
      userId,
    });

    return res.status(201).send({
      message: "Item created successfully.",
      success: true,
      data: item
    });
  } catch (error) {
    console.error("Error creating item", error);
    res.status(500).json({
      error: "An error occurred while creating the item.",
    });
  }
};
