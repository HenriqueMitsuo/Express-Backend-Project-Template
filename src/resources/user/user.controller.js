import User from './user.model';
import { crudControllers } from '../../utils/crud';

//? Specific Update because of password field
export const updateUser = async (req, res) => {
  const user = req.body;

  try {
    const updatedData = await User.update(
      { name: user.name, age: user.age, email: user.email },
      { where: { id: req.params.id } }
    );

    const message = `User ${req.params.id} updated successfully!`;

    !updatedData
      ? res.status(400).end()
      : res.status(200).json({ data: message });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export default crudControllers(User, ['password']);
