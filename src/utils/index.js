export const stripUndefined = (obj = {}) => Object.entries(obj)
  .reduce(
    (strippedObj, [key, val]) => (
      val === undefined
        ? strippedObj
        : { ...strippedObj, [key]: val }
    ),
    {},
  );

export default {
  stripUndefined,
};
