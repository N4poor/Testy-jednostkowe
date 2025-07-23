import CurrencyForm from './CurrencyForm';
import userEvent from '@testing-library/user-event';
import { render, screen, cleanup } from '@testing-library/react';

describe('Component CurrencyForm', () => {
  it('should render without crashing', () => {
    render(<CurrencyForm action={() => {}} />);
  });

  it('should run action callback with proper data on form submit', () => {
    const testCases = [
      { amount: '100', from: 'PLN', to: 'USD' },
      { amount: '20', from: 'USD', to: 'PLN' },
      { amount: '200', from: 'PLN', to: 'USD' },
      { amount: '345', from: 'USD', to: 'PLN' },
    ];

    for (const testCase of testCases) {
      const action = jest.fn();

      // render component
      render(<CurrencyForm action={action} />);

      // get form elements
      const amountField = screen.getByTestId('amount');
      const fromSelect = screen.getByTestId('from-select');
      const toSelect = screen.getByTestId('to-select');
      const submitButton = screen.getByText('Convert');

      // fill fields
      userEvent.clear(amountField); // upewniamy się, że pole jest puste
      userEvent.type(amountField, testCase.amount);
      userEvent.selectOptions(fromSelect, testCase.from);
      userEvent.selectOptions(toSelect, testCase.to);

      // submit form
      userEvent.click(submitButton);

      // assertions
      expect(action).toHaveBeenCalledTimes(1);
      expect(action).toHaveBeenCalledWith({
        amount: parseFloat(testCase.amount),
        from: testCase.from,
        to: testCase.to,
      });

      // unmount component to avoid overlap
      cleanup();
    }
  });
});