import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login';

describe('<Login />', () => {
    test('renders login form with input fields and button', async () => {
        render(<Login />);
        
        const emailInput = screen.getByPlaceholderText('e.g. alex@email.com');
        const passwordInput = screen.getByPlaceholderText('Enter your password');
        const loginButton = screen.getByText('Login');

        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(loginButton).toBeInTheDocument();
    });

    test('allows user to fill in and submit form', async () => {
        render(<Login />);
        
        const emailInput = screen.getByPlaceholderText('e.g. alex@email.com');
        const passwordInput = screen.getByPlaceholderText('Enter your password');
        const loginButton = screen.getByText('Login');

        userEvent.type(emailInput, 'test@example.com');
        userEvent.type(passwordInput, 'password123');

        fireEvent.click(loginButton);

        const submittedEmailInput = await screen.findByDisplayValue('test@example.com');
        const submittedPasswordInput = await screen.findByDisplayValue('password123');

        expect(submittedEmailInput).toBeInTheDocument();
        expect(submittedPasswordInput).toBeInTheDocument();
    });

test('displays error messages for invalid input', async () => {
        render(<Login />);
        
        const loginButton = screen.getByText('Login');

        fireEvent.click(loginButton);

        await waitFor(() => {
                expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
        });

        expect(screen.getByText('Please enter a valid password')).toBeInTheDocument();
});

    test('toggles password visibility', () => {
        render(<Login />);
        
        const passwordInput = screen.getByTestId('password-input');
        const passwordToggle = screen.getByTestId('password-toggle');

        expect(passwordInput.getAttribute('type')).toBe('password');

        fireEvent.click(passwordToggle);

        expect(passwordInput.getAttribute('type')).toBe('text');
    });

    test('allows user to toggle "Trust this device" checkbox', () => {
        render(<Login />);
        
        const persistCheckbox = screen.getByLabelText('Trust this device') as HTMLInputElement;

        fireEvent.click(persistCheckbox);

        expect(persistCheckbox.checked).toBe(true);
    });

    // Add more tests as needed for specific functionalities
});
