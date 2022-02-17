import React from 'react';
import { SuggestionsList } from 'components';
import { useAutoComplete } from 'hooks/useAutoComplete';

import * as S from './style';

interface IAutoCompleteProps {
  suggestions: Array<string>;
}

export const AutoComplete = ({ suggestions }: IAutoCompleteProps) => {
  const [
    filteredSuggestions,
    activeSuggestionIndex,
    showSuggestions,
    inputTyped,
    inputAutoCompleted,
    onChange,
    onKeyDown,
    onClick,
  ] = useAutoComplete(suggestions);

  return (
    <S.Container>
      <S.SearchInput
        type="text"
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={inputAutoCompleted}
      />
      {showSuggestions && inputTyped && (
        <SuggestionsList
          filteredSuggestions={filteredSuggestions}
          activeSuggestionIndex={activeSuggestionIndex}
          onClick={onClick}
        />
      )}
    </S.Container>
  );
};
