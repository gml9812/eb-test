import React, { useState } from 'react';

export const useAutoComplete = (
  suggestions: Array<string>,
): [
  Array<string>,
  number,
  boolean,
  string,
  string,
  (e: React.ChangeEvent<HTMLInputElement>) => void,
  (e: React.KeyboardEvent<HTMLInputElement>) => void,
  (e: React.MouseEvent<HTMLDivElement>) => void,
] => {
  const [filteredSuggestions, setFilteredSuggestions] = useState<Array<string>>([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [inputTyped, setInputTyped] = useState('');
  const [inputAutoCompleted, setInputAutoCompleted] = useState('');

  // 필터링 로직. 현재는 겹치는 글자가 있을 경우 나타나도록 되어 있다.
  const filterLogic = (userInput: string, suggestion: string) => {
    return suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1;
  };

  const resetSuggestionList = () => {
    setFilteredSuggestions([]);
    setActiveSuggestionIndex(-1);
    setShowSuggestions(false);
  };

  const focusSuggestion = (focusTarget: number) => {
    setActiveSuggestionIndex(focusTarget);
    setInputAutoCompleted(filteredSuggestions[focusTarget]);
  };

  const removeFocusSuggestion = () => {
    setShowSuggestions(false);
    setInputAutoCompleted(inputTyped);
  };

  const setBothInputs = (value: string) => {
    setInputTyped(value);
    setInputAutoCompleted(value);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = e.target.value;

    // 유저가 입력한 내용과 관련 있는 항목만 자동 완성 창에 남긴다.
    const possibleSuggestions = suggestions.filter((suggestion) =>
      filterLogic(userInput, suggestion),
    );

    setBothInputs(e.target.value);

    setFilteredSuggestions(possibleSuggestions);
    setActiveSuggestionIndex(-1);
    setShowSuggestions(possibleSuggestions.length > 0);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // 위 아래 화살표 누르면 focus한 검색 항목 바뀜.
    if (!showSuggestions) {
      if (e.key === 'ArrowDown' && filteredSuggestions.length > 0) {
        setShowSuggestions(true);
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      if (activeSuggestionIndex === filteredSuggestions.length - 1) {
        focusSuggestion(0);
      } else {
        focusSuggestion(activeSuggestionIndex + 1);
      }
    } else if (e.key === 'ArrowUp') {
      if (activeSuggestionIndex <= 0) {
        removeFocusSuggestion();
      } else {
        focusSuggestion(activeSuggestionIndex - 1);
      }
    }
  };

  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    setBothInputs(e.target.innerText);

    resetSuggestionList();
  };

  return [
    filteredSuggestions,
    activeSuggestionIndex,
    showSuggestions,
    inputTyped,
    inputAutoCompleted,
    onChange,
    onKeyDown,
    onClick,
  ];
};
