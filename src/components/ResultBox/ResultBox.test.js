import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ResultBox from './ResultBox';

describe('Component ResultBox', () => {

  it('should render without crashing', () => {
    render(<ResultBox from="PLN" to="USD" amount={100} />);
  });

     const testCases = [
    { amount: 100, expectedText: 'PLN 100.00 = $28.57' },
    { amount: 50, expectedText: 'PLN 50.00 = $14.29' },
    { amount: 200, expectedText: 'PLN 200.00 = $57.14' },
    { amount: 0, expectedText: 'PLN 0.00 = $0.00' },
    { amount: 123.45, expectedText: 'PLN 123.45 = $35.27' },
  ];

  testCases.forEach(({ amount, expectedText }) => {
    it(`should render correct conversion for PLN -> USD for amount ${amount}`, () => {
      render(<ResultBox from="PLN" to="USD" amount={amount} />);
      const resultDiv = screen.getByTestId('result-box');
      expect(resultDiv).toHaveTextContent(expectedText);
    });
  });

  it('should render equal amounts when from and to currencies are the same (PLN)', () => {
    render(<ResultBox from="PLN" to="PLN" amount={123} />);
    const resultDiv = screen.getByTestId('result-box');
    expect(resultDiv).toHaveTextContent('PLN 123.00 = PLN 123.00');
  });

    it('should render equal amounts when from and to currencies are the same (USD)', () => {
    render(<ResultBox from="USD" to="USD" amount={55} />);
    const resultDiv = screen.getByTestId('result-box');
    expect(resultDiv).toHaveTextContent('$55.00 = $55.00');
  });
  
  it('should render "Wrong value..." when amount is negative', () => {
    render(<ResultBox from="PLN" to="USD" amount={-100} />);
    const resultDiv = screen.getByTestId('result-box');
    expect(resultDiv).toHaveTextContent('Wrong value...');
  });
});