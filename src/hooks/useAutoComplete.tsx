import React, { useState } from 'react';
import { SearchData } from 'types/searchData';

export const useAutoComplete = (
  suggestions: SearchData[],
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

  const filterLogic = (userInput: string, suggestion: SearchData) => {
    return suggestion.text.toLowerCase().indexOf(userInput.toLowerCase()) > -1;
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

    const possibleSuggestions = suggestions
      .filter((suggestion) => filterLogic(userInput, suggestion))
      .map((suggestion) => suggestion.text);

    setBothInputs(e.target.value);

    setFilteredSuggestions(possibleSuggestions);
    setActiveSuggestionIndex(-1);
    setShowSuggestions(possibleSuggestions.length > 0);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
