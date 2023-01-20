import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import * as S from './styles';

const icons = {
  up: 'arrow-up-circle',
  down: 'arrow-down-circle',
}

interface TransactionTypeButtonProps extends TouchableOpacityProps {
  type: 'up' | 'down';
  title: string;
  isActive: boolean;
}

export function TransactionTypeButton({
  title,
  type,
  isActive,
  ...rest
}: TransactionTypeButtonProps) {
  return (
    <S.Container {...rest} isActive={isActive} type={type}>
      <S.Icon
        name={icons[type]}
        type={type}
      />
      <S.Title>{title}</S.Title>
    </S.Container>
  )
}