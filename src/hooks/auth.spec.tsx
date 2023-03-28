import { renderHook, act } from "@testing-library/react-hooks";
import { useAuth, AuthProvider } from './Auth';

jest.mock('expo-apple-authentication', () => {});
jest.mock('expo-auth-session', () => {
  return {
    startAsync: () => {
      return {
        type: 'success',
        params: {
          access_token: 'google-token',
        }
      }
    }
  }
});

describe('Auth hook', () => {
  it('should be able to SignIn with google account', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve({
        id: 'userInfo.id',
        email: 'userInfo.email',
        name: 'userInfo.name',
        photo: 'userInfo.photo',
        locale: 'userInfo.locale',
        verified_email: 'userInfo.verified_email',
      })
    })) as jest.Mock;
    
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });
    
    await act(() => {
      result.current.signInWithGoogle();
    });

    console.log(result.current.user)
    expect(result.current.user).toBeTruthy();
  });
});