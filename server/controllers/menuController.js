import MenuItem from "../models/MenuItem.js";

/**
 * GET /api/menu
 * Supports filters: category, isAvailable
 */
export const getMenuItems = async (req, res) => {
  try {
    const { category, isAvailable } = req.query;

    const filter = {};
    if (category) filter.category = category;
    if (isAvailable !== undefined) {
      filter.isAvailable = isAvailable === "true";
    }

    const menuItems = await MenuItem.find(filter).sort({ createdAt: -1 });
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch menu items" });
  }
};

/**
 * GET /api/menu/search?q=keyword
 */
export const searchMenuItems = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.json([]);
    }

    const results = await MenuItem.find({
      $text: { $search: q }
    });

    res.json(results);
  } catch (error) {
    res.status(500).json({ message: "Search failed" });
  }
};

/**
 * GET /api/menu/:id
 */
export const getMenuItemById = async (req, res) => {
  try {
    const item = await MenuItem.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    res.json(item);
  } catch (error) {
    res.status(400).json({ message: "Invalid menu item ID" });
  }
};

/**
 * POST /api/menu
 */
export const createMenuItem = async (req, res) => {
  try {
    const menuItem = new MenuItem(req.body);
    const savedItem = await menuItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(400).json({ message: "Failed to create menu item" });
  }
};

/**
 * PUT /api/menu/:id
 */
export const updateMenuItem = async (req, res) => {
  try {
    const updatedItem = await MenuItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    res.json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: "Failed to update menu item" });
  }
};

/**
 * DELETE /api/menu/:id
 */
export const deleteMenuItem = async (req, res) => {
  try {
    const deletedItem = await MenuItem.findByIdAndDelete(req.params.id);

    if (!deletedItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    res.json({ message: "Menu item deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Failed to delete menu item" });
  }
};

/**
 * PATCH /api/menu/:id/availability
 */
export const toggleAvailability = async (req, res) => {
  try {
    const item = await MenuItem.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    item.isAvailable = !item.isAvailable;
    await item.save();

    res.json(item);
  } catch (error) {
    res.status(400).json({ message: "Failed to toggle availability" });
  }
};
