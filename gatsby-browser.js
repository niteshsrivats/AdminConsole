/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/functions';
import DataContextWrapper from './src/contexts/DataContextWrapper';
import React from 'react';

export const wrapRootElement = ({ element }) => {
  return <DataContextWrapper>{element}</DataContextWrapper>;
};
