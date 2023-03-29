import React, { useState } from 'react';
import { Keyboard, Modal, TouchableWithoutFeedback, Alert } from 'react-native';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

import { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../hooks/Auth';

import { Button } from '../../components/Form/Button';
import { CategorySelectButton } from '../../components/Form/CategorySelectButton';
import { InputForm } from '../../components/Form/InputForm';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';
import { CategorySelect } from '../CategorySelect';

import * as S from './styles';

interface FormDataProps {
  name: string
  amount: string;
}

type NavigationProps = {
  navigate:(screen:string) => void;
}

const schema = yup.object().shape({
  name: yup
    .string()
    .min(2, 'Preencha com um nome válido')
    .required('Nome é obrigatório'),
  amount: yup
    .number()
    .typeError('Informe um valor numérico')
    .positive('O valor não poder ser negativo')
    .required('Valor é obrigatório'),
})

export function Register() {
  const { user } = useAuth();

  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  });

  const navigation = useNavigation<NavigationProps>();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormDataProps>({
    resolver: yupResolver(schema)
  });

  function handleTransactionsTypeSelect(type: 'positive' | 'negative') {
    setTransactionType(type);
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true);
  }

  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false);
  }

  async function handleRegister(form: FormDataProps) {
    if (!transactionType) {
      return Alert.alert('Selecione o tipo da transação')
    }

    if (category.key === 'category') {
      return Alert.alert('Selecione a categoria')
    }

    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      type: transactionType,
      category: category.key,
      date: new Date(),
    }

    try {
      const dataKey = `@gofinances:transactions_user:${user.id}`;
      const data = await AsyncStorage.getItem(dataKey);
      const currentData = data ? JSON.parse(data) : [];

      const dataFormatted = [
        ...currentData,
        newTransaction
      ];
      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted))

      reset();
      setTransactionType('');
      setCategory({
        key: 'category',
        name: 'Categoria'
      });
      navigation.navigate('Listagem');
    } catch (error) {
      console.log(error)
      Alert.alert('Não foi possível salvar.')
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <S.Container>
        <S.Header>
          <S.Title>Cadastro</S.Title>
        </S.Header>

        <S.Form>
          <S.Fields>
            <InputForm
              name="name"
              control={control}
              error={errors.name && errors.name.message}
              placeholder='Nome'
              autoCapitalize='sentences'
              autoCorrect={false}
            />
            <InputForm
              name="amount"
              control={control}
              error={errors.amount && errors.amount.message}
              placeholder='Preço'
              keyboardType='numeric'
            />

            <S.TransactionsTypes>
              <TransactionTypeButton
                type="up"
                title="Entrada"
                isActive={transactionType === 'positive'}
                onPress={() => handleTransactionsTypeSelect('positive')}
              />
              <TransactionTypeButton
                type="down"
                title="Saída"
                isActive={transactionType === 'negative'}
                onPress={() => handleTransactionsTypeSelect('negative')}
              />
            </S.TransactionsTypes>

            <CategorySelectButton
              testID='button-category'
              title={category.name}
              onPress={handleOpenSelectCategoryModal}
            />
          </S.Fields>

          <Button
            title='Enviar'
            onPress={handleSubmit(handleRegister)}
          />
        </S.Form>

        <Modal testID='modal-category' visible={categoryModalOpen}>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseSelectCategoryModal}
          />
        </Modal>
      </S.Container>
    </TouchableWithoutFeedback>
  )
}