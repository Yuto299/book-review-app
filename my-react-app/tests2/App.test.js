/* eslint-disable no-undef */

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../src/App.jsx';

describe('App component', () => {
  test('フォームとボタンが正しくレンダリングされる', () => {
    render(<App />);

    const emailInput = screen.getByLabelText('メール：');
    const passwordInput = screen.getByLabelText('パスワード：');
    const loginButton = screen.getByRole('button', { name: 'ログイン' });
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });
});
