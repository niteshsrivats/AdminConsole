const nameRegex = /^[a-zA-Z ]+$/;
const idRegex = /^1BM\d{2}[A-Z]{2}\d{3}$/;
const emailRegex = /^[\w.]*@[a-z]+\.[a-z]+(\.[a-z]+)?$/;
const phoneNumberRegex = /^\d{10}$/;
const departmentRegex = /^[A-Z]{2,3}$/;
const yearRegex = /^\d{4}$/;
const sectionsRegex = /^(\d[A-Z]{3,4}\d{4},? ?)+$/;

export const regex = {
  name: nameRegex,
  id: idRegex,
  email: emailRegex,
  number: phoneNumberRegex,
  department: departmentRegex,
  year: yearRegex,
  sections: sectionsRegex,
};

const numericRegex = /^[0-9]*$/;
const spacedLetterRegex = /^[a-zA-Z ]*$/;
const alphanumericRegex = /^[a-zA-Z0-9]*$/;
const alphanumericSpacedCommaRegex = /^[a-zA-Z0-9 ,]*$/;
const emailEntryRegex = /^[\w.@]*$/;

export const entryRegex = {
  search: spacedLetterRegex,
  name: spacedLetterRegex,
  id: alphanumericRegex,
  email: emailEntryRegex,
  number: numericRegex,
  department: alphanumericRegex,
  year: numericRegex,
  sections: alphanumericSpacedCommaRegex,
};
