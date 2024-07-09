export function validateCharacter(req, res, next) {
  const { name, class: characterClass, email } = req.body;
  if (!name || !characterClass) {
    return res.status(400).json({ message: 'error 400 | Name and class are required' });
  }
  next();
}
 
