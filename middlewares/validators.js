const validateEmailFormat = (email) => {
  return /\S+@\S+\.\S+/.test(email);
};

export function validateCharacter(req, res, next) {
  const { name, class: characterClass, email } = req.body;
  if (!name || !characterClass || !email) {
    return res.status(400).json({ message: 'Name, class, and email are required' });
  }
  if (!validateEmailFormat(email)) {
    return res.status(400).json({ message: 'Email is not in a valid format' });
  }
  next();
}
 
