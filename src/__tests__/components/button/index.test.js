import { fireEvent, render } from '@testing-library/react';
import { Button } from 'components';

test('Button', () => {
  const mockOnClick = jest.fn();
  const component = render(<Button onClick={mockOnClick}>Search</Button>);

  fireEvent.click(component.getByText('Search'));

  component.getByText('Search')
  expect(mockOnClick.mock.calls.length).toBe(1)
})
