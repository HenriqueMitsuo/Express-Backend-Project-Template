export const getOne = (model, exclude = []) => async (req, res) => {
  try {
    const data = await model.findByPk(req.params.id, {
      attributes: { exclude: exclude },
    });

    !data ? res.status(404).end() : res.status(200).json({ data: data });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const getMany = (model, exclude = []) => async (req, res) => {
  try {
    const data = await model.findAll({ attributes: { exclude: exclude } });

    !data ? res.status(404).end() : res.status(200).json({ data: data });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const createOne = (model) => async (req, res) => {
  try {
    const newData = await model.create({ ...req.body });

    !newData ? res.status(404).end() : res.status(201).json({ data: newData });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const updateOne = (model) => async (req, res) => {
  try {
    const updatedData = await model.update(
      { ...req.body },
      { where: { id: req.params.id } }
    );

    const message = `${model.name} ${req.params.id} updated successfully!`;

    !updatedData
      ? res.status(400).end()
      : res.status(200).json({ data: message });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const deleteOne = (model) => async (req, res) => {
  try {
    const deletedData = await model.destroy({ where: { id: req.params.id } });

    const message = `${model.name} ${req.params.id} deleted successfully!`;

    !deletedData
      ? res.status(400).end
      : res.status(200).json({ data: message });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const crudControllers = (model, exclude = []) => {
  return {
    getOne: getOne(model, exclude),
    getMany: getMany(model, exclude),
    createOne: createOne(model),
    updateOne: updateOne(model),
    deleteOne: deleteOne(model),
  };
};
