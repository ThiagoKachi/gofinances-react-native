import React from 'react';
import { Alert } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import LogoSvg from "../../assets/logo.svg";
import AppleSvg from "../../assets/apple-icon.svg";
import GoogleSvg from "../../assets/google-icon.svg";

import { SignInSocialButton } from '../../components/SignInSocialButton';
import { useAuth } from '../../hooks/Auth';

import * as S from './styles';

export function SignIn() {
  const { signInWithGoogle } = useAuth();

  async function handleSignInWithGoogle() {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.log(error)
      Alert.alert('Não foi possível conectar a conta Google')
    }
  }

  return (
    <S.Container>
      <S.Header>
        <S.TitleWrapper>
          <LogoSvg
            width={RFValue(120)}
            height={RFValue(68)}
          />

          <S.Title>
            Controle suas {'\n'}
            finanças de forma {'\n'}
            muito simples
          </S.Title>
        </S.TitleWrapper>

        <S.SignInTitle>
          Faça seu login com {'\n'} uma das contas abaixo
        </S.SignInTitle>
      </S.Header>

      <S.Footer>
        <S.FooterWrapper>
          <SignInSocialButton
            title='Entrar com Google'
            svg={GoogleSvg}
            onPress={handleSignInWithGoogle}
          />
          <SignInSocialButton
            title='Entrar com Apple'
            svg={AppleSvg}
          />
        </S.FooterWrapper>
      </S.Footer>
    </S.Container>
  )
}