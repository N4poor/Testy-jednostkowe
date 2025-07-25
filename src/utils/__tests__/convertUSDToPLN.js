import { convertUSDToPLN } from './../convertUSDToPLN';

describe('convertUSDToPLN', () => {
  it('should return proper value when got input', () => {
    expect(convertUSDToPLN(1)).toBe('PLN 3.50');
    expect(convertUSDToPLN(2)).toBe('PLN 7.00');
    expect(convertUSDToPLN(10)).toBe('PLN 35.00');
  });

it('should return NaN when input is text', () => {
    expect(convertUSDToPLN('6')).toBeNaN();
    expect(convertUSDToPLN('abc')).toBeNaN();
    expect(convertUSDToPLN('-543')).toBeNaN();
  });

  it('should return Error when input is different than number and string',() => {
    expect(convertUSDToPLN({})).toBe('Error');
    expect(convertUSDToPLN([])).toBe('Error');
    expect(convertUSDToPLN(null)).toBe('Error');
    expect(convertUSDToPLN(function() {})).toBe('Error');
    });

 it('should return zero when input is lower than zero', () => {
    expect(convertUSDToPLN(-1)).toBe('$0.00');
    expect(convertUSDToPLN(-2)).toBe('$0.00');
    expect(convertUSDToPLN(-56)).toBe('$0.00');
 }); 

});