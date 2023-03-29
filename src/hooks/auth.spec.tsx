import fetchMock from 'jest-fetch-mock';
import { renderHook, act } from "@testing-library/react-hooks";
import { useAuth, AuthProvider } from './Auth';
import { startAsync } from "expo-auth-session";

jest.mock('expo-apple-authentication', () => {});
jest.mock('expo-auth-session');

fetchMock.enableMocks();

const userTest = {
  id: 'any_id',
  email: 'tjk@gmail.com',
  name: 'Thiago',
  photo: 'any_photo.png',
 };

describe('Auth hook', () => {
  it('should be able to SignIn with google account', async () => {
    const googleMocked = jest.mocked(startAsync as any);
   
    googleMocked.mockResolvedValueOnce({
      type: 'success',
      params: {
        accessToken: 'any_token',
      }
    })

    fetchMock.mockResponseOnce(JSON.stringify(userTest));

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });
    
    await act(() => {
      result.current.signInWithGoogle();
    });

    expect(result.current.user.email).toBe('tjk@gmail.com');
  });

  it('should return error with oncorrectly google parameters', async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    try {
      await act(() => {
        result.current.signInWithGoogle();
      });
    } catch {
      expect(result.current.user).toEqual({});
    }
  });
});