import React from 'react';
import { AutoComplete } from 'components';

export const Main = () => {
  return (
    <AutoComplete
      suggestions={[
        {
          text: 'Alligator',
        },
        {
          text: 'Bask',
        },
        {
          text: 'Crocodilian',
        },
        {
          text: 'Death Roll',
        },
        {
          text: 'Eggs',
        },
        {
          text: 'Jaws',
        },
        {
          text: 'Reptile',
        },
        {
          text: 'Solitary',
        },
        {
          text: 'Tail',
        },
        {
          text: 'Wetlands',
        },
      ]}
    />
  );
};
