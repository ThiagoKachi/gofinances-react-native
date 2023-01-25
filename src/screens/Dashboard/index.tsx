import React from 'react';
import { HighLightCard } from '../../components/HighlightCard';
import { TransactionCard, TransactionCardData } from '../../components/TransactionCard';

import * as S from './styles';

export interface DataListProps extends TransactionCardData {
  id: string;
}

export function Dashboard() {
  const data: DataListProps[] = [
    {
      id: '1',
      type: 'positive',
      title: 'Desenvolvimento de site',
      amount: 'R$ 12.000,00',
      category: {
        name: 'Vendas',
        icon: 'dollar-sign'
      },
      date: '19/01/2023',
    },
    {
      id: '2',
      type: 'negative',
      title: 'Hamburgueria Pizzy',
      amount: 'R$ 59,00',
      category: {
        name: 'Alimentação',
        icon: 'coffee'
      },
      date: '10/01/2023',
    },
    {
      id: '3',
      type: 'negative',
      title: 'Aluguel do apartamento',
      amount: 'R$ 1200,00',
      category: {
        name: 'Casa',
        icon: 'home'
      },
      date: '10/01/2023',
    },
];

  return ( 
    <S.Container>

      <S.Header>
        <S.UserWrapper>

          <S.UserInfo>
            <S.Photo
              source={{ uri: 'https://avatars.githubusercontent.com/u/61670495?v=4' }}
            />
            <S.User>
              <S.UserGreeting>Olá,</S.UserGreeting>
              <S.UserName>Thiago</S.UserName>
            </S.User>
          </S.UserInfo>

          <S.LogoutButton onPress={() => {}}>
            <S.Icon name="power" />
          </S.LogoutButton>
        </S.UserWrapper>
      </S.Header>

      <S.HighLightCards>
        <HighLightCard
          type="up"
          title='Entradas'
          amount='R$ 17.400,00'
          lastTransaction='Última entrada dia 13 de abril'
        />
        <HighLightCard
          type="down"
          title='Saídas'
          amount='R$ 1.529,00'
          lastTransaction='Última saída dia 03 de abril'
        />
        <HighLightCard
          type="total"
          title='Total'
          amount='R$ 16.141,00'
          lastTransaction='01 à 16 de abril'
        />
      </S.HighLightCards>

      <S.Transactions>
        <S.Title>Listagem</S.Title>

        <S.TransactionList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        >
        </S.TransactionList>
      </S.Transactions>
      
    </S.Container>
  )
}