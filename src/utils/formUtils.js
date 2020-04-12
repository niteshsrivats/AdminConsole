import { entryRegex, regex } from './regexUtils';
import { titleCase } from './stringUtils';

export const validEntry = (name, data) => {
  return !!entryRegex[name].test(data);
};

export const validateEntries = data => {
  let valid = true;
  let errors = {};
  Object.keys(data).forEach(key => {
    if (regex[key].test(data[key])) {
      errors[key] = false;
    } else {
      valid = false;
      errors[key] = true;
    }
  });
  return { valid, errors };
};

export const formatEntry = (name, data) => {
  switch (name) {
    case 'id':
      return data.toUpperCase();
    case 'name':
      return titleCase(data);
    case 'email':
      return data.toLowerCase();
    case 'department':
      return data.toUpperCase();
    case 'sections':
      return data.toUpperCase();
    default:
      return data;
  }
};
