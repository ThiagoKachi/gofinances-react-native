import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { useAuth } from '../../hooks/Auth';

import { HighLightCard } from '../../components/HighlightCard';
import { TransactionCard, TransactionCardData } from '../../components/TransactionCard';

import * as S from './styles';

export interface DataListProps extends TransactionCardData {
  id: string;
}

interface highlightDataProps {
  amount: string;
  lastTransaction: string;
}
interface highlightData {
  entries: highlightDataProps;
  expensives: highlightDataProps;
  total: highlightDataProps
}

export function Dashboard() {
  const theme = useTheme();
  const { signOut, user } = useAuth();

  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<DataListProps[]>([]);
  const [highlightData, setHighlightData] = useState({} as highlightData);

  function getLastTransactionDate(
    collection: DataListProps[],
    type: 'positive' | 'negative'
  ) {
    const collectionFiltered = collection
      .filter((transaction) => (transaction.type === type));

    if (collectionFiltered.length === 0) return 0;

    const lastTransaction = new Date(Math.max.apply(Math, collectionFiltered
      .map((item) => new Date(item.date).getTime())
    ));

    return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleDateString('pt-BR', {
      month: 'long',
    })}`;
  }
  
  async function loadTransactions() {
    const dataKey = `@gofinances:transactions_user:${user.id}`;
    const response = await AsyncStorage.getItem(dataKey);
    const transactions = response ? JSON.parse(response) : [];

    let entriesTotal = 0;
    let expensiveTotal = 0;

    const transactionsFormatted: DataListProps[] = transactions
      .map((transaction: DataListProps) => {

        if (transaction.type === 'positive') {
          entriesTotal += Number(transaction.amount)
        } else {
          expensiveTotal += Number(transaction.amount)
        }

        const amount = Number(transaction.amount).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        });
        const date = Intl.DateTimeFormat('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year:  '2-digit'
        }).format(new Date(transaction.date))

        return {
          id: transaction.id,
          name: transaction.name,
          amount,
          type: transaction.type,
          category: transaction.category,
          date
        }
      })

    setTransactions(transactionsFormatted);

    const lastTransactioEntries = getLastTransactionDate(transactions, 'positive')
    const lastTransactioExpensives = getLastTransactionDate(transactions, 'negative')

    const totalInterval = lastTransactioExpensives === 0 
    ? 'Não há transações'
    : `01 a ${lastTransactioExpensives}`

    const total = entriesTotal - expensiveTotal;

    setHighlightData({
      entries: {
        amount: entriesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: lastTransactioEntries === 0 
          ? 'Não há transações'
          : `Última entrada dia ${lastTransactioEntries}`,
      },
      expensives: {
        amount: expensiveTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: lastTransactioExpensives === 0 
        ? 'Não há transações'
        : `Última saída dia ${lastTransactioExpensives}`,
      },
      total: {
        amount: total.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: totalInterval
      }
    })

    setIsLoading(false);
  }

  useEffect(() => {
    loadTransactions();
  }, [])

  useFocusEffect(useCallback(() => {
    loadTransactions()
  }, []))

  return ( 
    <S.Container>
      {isLoading ? (
        <S.LoadContainer>
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </S.LoadContainer>
      ) : (
        <>
          <S.Header>
            <S.UserWrapper>

              <S.UserInfo>
                <S.Photo
                  source={{ uri: user.photo }}
                />
                <S.User>
                  <S.UserGreeting>Olá,</S.UserGreeting>
                  <S.UserName>{user.name}</S.UserName>
                </S.User>
              </S.UserInfo>

              <S.LogoutButton onPress={signOut}>
                <S.Icon name="power" />
              </S.LogoutButton>
            </S.UserWrapper>
          </S.Header>

          <S.HighLightCards>
            <HighLightCard
              type="up"
              title='Entradas'
              amount={highlightData.entries.amount}
              lastTransaction={highlightData.entries.lastTransaction}
            />
            <HighLightCard
              type="down"
              title='Saídas'
              amount={highlightData.expensives.amount}
              lastTransaction={highlightData.expensives.lastTransaction}
            />
            <HighLightCard
              type="total"
              title='Total'
              amount={highlightData.total.amount}
              lastTransaction={highlightData.total.lastTransaction}
            />
          </S.HighLightCards>

          <S.Transactions>
            <S.Title>Listagem</S.Title>

            <S.TransactionList
              data={transactions}
              keyExtractor={item => item.id}
              renderItem={({ item }) => <TransactionCard data={item} />}
            >
            </S.TransactionList>
          </S.Transactions>
        </>
      )}
    </S.Container>
  )
}