import { render, screen, fireEvent } from '@testing-library/react';
import { Login } from '../Login';
import { vi } from 'vitest';

describe('Login component', () => {
  it('renders input fields and login button', () => {
    const mockLogin = vi.fn();
    render(<Login onLogin={mockLogin} />);

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('calls onLogin when login button is clicked', () => {
    const mockLogin = vi.fn();
    render(<Login onLogin={mockLogin} />);

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'user' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'pass' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(screen.getByLabelText(/username/i)).toHaveValue('user');
    expect(screen.getByLabelText(/password/i)).toHaveValue('pass');
  });
});
