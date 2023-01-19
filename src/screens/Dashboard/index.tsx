import React from 'react';
import { HighLightCard } from '../../components/HighlightCard.tsx';

import * as S from './styles';

export function Dashboard() {
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

          <S.Icon name="power" />
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
    </S.Container>
  )
}