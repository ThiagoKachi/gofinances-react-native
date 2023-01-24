import React from 'react';
import { FlatList } from 'react-native';
import { categories } from '../../utils/categories';
import { Button } from '../../components/Form/Button'

import * as S from './styles';

interface Category {
  key: string;
  name: string
}

interface CategorySelectProps {
  category: string;
  setCategory: (category: Category) => void;
  closeSelectCategory: () => void;
}

export function CategorySelect({
  category,
  setCategory,
  closeSelectCategory,
}: CategorySelectProps) {
  return (
    <S.Container>
      <S.Header>
        <S.Title>Categoria</S.Title>
      </S.Header>

      <FlatList
        data={categories}
        style={{ flex: 1, width: '100%' }}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <S.Category>
            <S.Icon name={item.icon} />
            <S.Name>{item.name}</S.Name>
          </S.Category>
        )}
        ItemSeparatorComponent={() => <S.Separator />}
      />

      <S.Footer>
        <Button title="Selecionar" />
      </S.Footer>
    </S.Container>
  )
}