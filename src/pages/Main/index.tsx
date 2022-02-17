import React from 'react';
import { AutoComplete } from 'components';

import * as S from './style';

export const Main = () => {
  return (
    <AutoComplete
      suggestions={[
        'Alligator',
        'Bask',
        'Crocodilian',
        'Death Roll',
        'Eggs',
        'Jaws',
        'Reptile',
        'Solitary',
        'Tail',
        'Wetlands',
      ]}
    />
  );
};
