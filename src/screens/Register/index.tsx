import React, { useState } from 'react';
import { Button } from '../../components/Form/Button';
import { CategorySelect } from '../../components/Form/CategorySelect';
import { Input } from '../../components/Form/Input';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';

import * as S from './styles';

export function Register() {
  const [transactionType, setTransactionType] = useState('');

  function handleTransactionsTypeSelect(type: 'up' | 'down') {
    setTransactionType(type);
  }

  return (
    <S.Container>
      <S.Header>
        <S.Title>Cadastro</S.Title>
      </S.Header>

      <S.Form>
        <S.Fields>
          <Input placeholder='Nome' />
          <Input placeholder='Preço' />

          <S.TransactionsTypes>
            <TransactionTypeButton
              type="up"
              title="Income"
              isActive={transactionType === 'up'}
              onPress={() => handleTransactionsTypeSelect('up')}
            />
            <TransactionTypeButton
              type="down"
              title="Outcome"
              isActive={transactionType === 'down'}
              onPress={() => handleTransactionsTypeSelect('down')}
            />
          </S.TransactionsTypes>

          <CategorySelect title="Categoria" />
        </S.Fields>

        <Button title='Enviar' />
      </S.Form>
    </S.Container>
  )
}