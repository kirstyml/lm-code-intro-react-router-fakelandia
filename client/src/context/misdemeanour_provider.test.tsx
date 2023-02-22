import { renderHook } from '@testing-library/react';
import { useMisdemeanours, useAddMisdemeanour } from './misdemeanour_provider';

// Will test the provider and custom hooks as they are being used in the misdemeanours_page and the confession_page
// As they are not pure functions, can't make sensible unit tests for them individually. 
describe("<MisdemeanourProvider>", () => {
  test('useMisdemeanour Hook returns an array of Misdemeanours', () => {
    const { result } = renderHook(() => useMisdemeanours());
    expect(result.current).toEqual([]);
  });
})


