import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import AddnewLink from './Addnewlink';

describe('AddnewLink', () => {
  const mockProps = {
    type: 'text',
    handleOptionClick: jest.fn(),
    prompts: [
      {
        id: '1',
        label: 'GitHub',
        image: 'github.png',
        placeholder: 'Enter your GitHub link',
        answer: '',
        error: false,
        errorMessage: '',
        bgColor: '',
        userId: ''
      }
    ],
    handleInputChange: jest.fn(),
    handleDelete: jest.fn(),
    handleButtonClick: jest.fn(),
    activeIndex: 0,
    error: false,
    errorMessage: ''
  };

  it('renders correctly', () => {
    const { getByText } = render(<AddnewLink {...mockProps} />);
    expect(getByText('= Link #1')).toBeInTheDocument();
    expect(getByText('Platform')).toBeInTheDocument();
    expect(getByText('Link')).toBeInTheDocument();
  });

  it('calls handleDelete when remove button is clicked', () => {
    const { getByText } = render(<AddnewLink {...mockProps} />);
    fireEvent.click(getByText('Remove'));
    expect(mockProps.handleDelete).toHaveBeenCalledTimes(1);
  });

  it('calls handleButtonClick when select button is clicked', () => {
    const { getByRole } = render(<AddnewLink {...mockProps} />);
    fireEvent.click(getByRole('combobox'));
    expect(mockProps.handleButtonClick).toHaveBeenCalledTimes(1);
  });

  it('calls handleInputChange when input value changes', () => {
    const { getByPlaceholderText } = render(<AddnewLink {...mockProps} />);
    const input = getByPlaceholderText('Enter your GitHub link');
    fireEvent.change(input, { target: { value: 'https://github.com/user' } });
    expect(mockProps.handleInputChange).toHaveBeenCalledTimes(1);
    expect(mockProps.handleInputChange).toHaveBeenCalledWith(expect.anything(), 0);
  });
});
