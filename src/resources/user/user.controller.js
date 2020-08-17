import User from './user.model';
import bcrypt from 'bcrypt';
import { crudControllers } from '../../utils/crud';
import { newToken } from '../../utils/auth';

export const updatePass = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const newPass = await bcrypt.hash(req.body.password, salt);

    const updatedData = await User.update(
      { password: newPass },
      { where: { id: req.params.id } }
    );

    const message = 'Password updated successfully!';

    !updatedData
      ? res.status(400).end()
      : res.status(200).json({ data: message });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const userLogin = async (req, res) => {
  if (!req.body.email && !req.body.password) {
    return res.status(401).end();
  }

  const message = 'Invalid email or password';

  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    const isValid = await user.checkPass(req.body.password);

    if (!user || !isValid) {
      return res.status(401).json({ data: message });
    }

    const token = newToken(user);
    res.status(202).json({ data: token });
  } catch (error) {
    res.status(401).end();
  }
};

export default crudControllers(User, ['password']);
