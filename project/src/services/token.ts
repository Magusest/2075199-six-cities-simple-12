export const AUTH_TOKEN_KEY_NAME = 'six-cities-token';

export default class Token {
  static get(): string {
    const token = localStorage.getItem(AUTH_TOKEN_KEY_NAME);
    return token ?? '';
  }

  static save(token: string) {
    localStorage.setItem(AUTH_TOKEN_KEY_NAME, token);
  }

  static drop() {
    localStorage.removeItem(AUTH_TOKEN_KEY_NAME);

  }
}
