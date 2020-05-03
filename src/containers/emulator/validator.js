const emulationTypes = ['SOFTWARE', 'HARDWARE'];

const validate = ({
  name,
  emulationType,
  pythonCode,
}) => {
  const errors = {};

  if (!name) {
    errors.name = 'Required';
  }
  if (!emulationType) {
    errors.emulationType = 'Required';
  } else if (!emulationTypes.includes(emulationType)) {
    errors.emulationType = 'Invalid value';
  }

  if (emulationType === 'SOFTWARE' && !pythonCode) {
    errors.pythonCode = 'Required';
  }

  return errors;
};

export default validate;
