import React, { useState, useEffect } from 'react';
import { SuggestionsList } from 'components';

import * as S from './style';

interface IAutoCompleteProps {
  suggestions: Array<string>;
}

export const AutoComplete = ({ suggestions }: IAutoCompleteProps) => {
  const [filteredSuggestions, setFilteredSuggestions] = useState<Array<string>>([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [input, setInput] = useState('');

  useEffect(() => {
    console.log('changed');
  }, [activeSuggestionIndex]);

  // 필터링 로직. 현재는 겹치는 글자가 있을 경우 나타나도록 되어 있다.
  const filterLogic = (userInput: string, suggestion: string) => {
    return suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1;
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = e.target.value;

    // 유저가 입력한 내용과 관련 있는 항목만 자동 완성 창에 남긴다.
    const possibleSuggestions = suggestions.filter((suggestion) =>
      filterLogic(userInput, suggestion),
    );

    setInput(e.target.value);
    setFilteredSuggestions(possibleSuggestions);
    setActiveSuggestionIndex(-1);
    setShowSuggestions(true);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // 위 아래 화살표 누르면 바뀜
    if (!showSuggestions) return;

    if (e.key === 'ArrowDown') {
      if (activeSuggestionIndex === filteredSuggestions.length - 1) {
        setActiveSuggestionIndex(0);
      } else {
        setActiveSuggestionIndex((c) => c + 1);
      }
    } else if (e.key === 'ArrowUp') {
      if (activeSuggestionIndex === 0) {
        setShowSuggestions(false);
      } else {
        setActiveSuggestionIndex((c) => c - 1);
      }
    }
  };

  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    setFilteredSuggestions([]);
    setInput(e.target.innerText);
    setActiveSuggestionIndex(-1);
    setShowSuggestions(false);
  };

  return (
    <S.Container>
      <S.SearchInput type="text" onChange={onChange} onKeyDown={onKeyDown} value={input} />
      {showSuggestions && input && (
        <SuggestionsList
          filteredSuggestions={filteredSuggestions}
          activeSuggestionIndex={activeSuggestionIndex}
          onClick={onClick}
        />
      )}
    </S.Container>
  );
};
