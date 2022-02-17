// 네이버 검색창 로직 참고해 연습

// 인풋 창에 무언가 입력하면 하단에 자동완성 창이 생성됨.
// 자동완성 창에는 입력값과 관련 있는 항목만 필터링되어 보여짐.
// 자동완성 칸이 열린 상태에서 위, 아래 방향키로 자동완성 항목 선택 가능. 항목 선택하면 그에 맞추어 인풋도 바뀜.
// 맨 위에 있는 자동완성 항목이 선택된 상태에서 위 방향키 누르면 자동완성 창 사라짐.
// 맨 아래 있는 자동완성 항목이 선택된 상태에서 아래 방향키 누르면 맨 위에 있는 항목이 선택됨.
// 자동완성 항목 클릭하면 클릭한 항목에 따라 인풋이 바뀌고, 자동완성 창 사라짐.

// 아무것도 suggestion 없는데 방향키누르면 오류 뜸.

import React, { useState } from 'react';
import { SuggestionsList } from 'components';

import * as S from './style';

interface IAutoCompleteProps {
  suggestions: Array<string>;
}

export const AutoComplete = ({ suggestions }: IAutoCompleteProps) => {
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
    setShowSuggestions(true);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // 위 아래 화살표 누르면 focus한 검색 항목 바뀜.
    if (!showSuggestions) {
      if (e.key === 'ArrowDown') {
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
      if (activeSuggestionIndex === 0) {
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
