export const getSectionsAndSemesters = sections => {
  sections = sections
    .replace(/ |, ?$/g, '')
    .split(',')
    .sort();

  const semesters = sections.map(section => {
    const yearIndex = section.length === 8 ? 4 : 5;
    return section.charAt(0) + '-' + section.slice(yearIndex, section.length);
  });

  return { sections, semesters };
};
