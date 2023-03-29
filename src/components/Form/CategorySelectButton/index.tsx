import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import * as S from './styles';

interface CategorySelectProps extends RectButtonProps {
  title: string;
  onPress: () => void;
}

export function CategorySelectButton({
  title,
  onPress,
  testID
}: CategorySelectProps) {
  return (
    <S.Container onPress={onPress} testID={testID}>
      <S.Category isSelected={title !== 'Categoria'}>{title}</S.Category>
      <S.Icon name="chevron-down" />
    </S.Container>
  )
}