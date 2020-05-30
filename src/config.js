export const API_URL = process.env.REACT_APP_API_URL;
export const AUTH_DATA_KEY = 'auth';
export const ENVIRONMENT_WIDTH = 100;
export const ENVIRONMENT_HEIGHT = 100;

export const EVENT_TRIGGERS = {
  ON: 'ON',
  ONCE: 'ONCE',
};

export const ITERATION_TRIGERS = {
  EVERY: 'EVERY',
  AFTER: 'AFTER',
};

export const TRIGGERS = {
  ...EVENT_TRIGGERS,
  ...ITERATION_TRIGERS,
};

export const COMMANDS = {
  PLACE_HEATER: 'PLACE_HEATER',
  REMOVE_HEATER: 'REMOVE_HEATER',
  SET_TEMPERATURE: 'SET_TEMPERATURE',
  SET_HUMIDITY: 'SET_HUMIDITY',
  SET_PRESSURE: 'SET_PRESSURE',
};

export default {};
