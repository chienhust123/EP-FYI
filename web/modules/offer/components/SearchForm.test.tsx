import { fireEvent, screen } from '@testing-library/react';
import { useSearchParams } from 'next/navigation';

import { useRouter } from 'next/router';
import { SearchForm } from './SearchForm';
import { renderApp } from '@/test/render';

const mockSearchParams = useSearchParams as jest.Mock;
const mockUseRouter = useRouter as jest.Mock;

describe('SearchForm', () => {
  let pushMock: jest.Mock;

  beforeAll(() => {
    // One-time initialization logic if required
  });

  beforeEach(() => {
    // Logic that must be started before every test if required
    pushMock = jest.fn();
    mockUseRouter.mockReturnValue({ push: pushMock });
  });

  afterAll(() => {
    // Logic that must be started after all tests if required
    jest.resetAllMocks();
  });

  describe('#rendering', () => {
    it('renders the form with initial values from search params', async () => {
      mockSearchParams.mockReturnValue(new URLSearchParams('company_id=123&location_id=456'));

      renderApp(<SearchForm />);

      expect(screen.getByLabelText('Search by company')).toHaveValue('123');
      expect(screen.getByLabelText('Search by location')).toHaveValue('456');
    });

    it('renders the form with empty initial values when search params are null', async () => {
      mockSearchParams.mockReturnValue(new URLSearchParams());

      renderApp(<SearchForm />);

      expect(screen.getByLabelText('Search by company')).toHaveValue('');
      expect(screen.getByLabelText('Search by location')).toHaveValue('');
    });
  });

  describe('#submission', () => {
    it('navigates to the search page with query params on form submit', async () => {
      mockSearchParams.mockReturnValue(new URLSearchParams());

      renderApp(<SearchForm />);

      fireEvent.change(screen.getByLabelText('Search by company'), { target: { value: '123' } });
      fireEvent.change(screen.getByLabelText('Search by location'), { target: { value: '456' } });

      fireEvent.submit(screen.getByRole('button', { name: 'Search' }));

      expect(pushMock).toHaveBeenCalledWith({
        pathname: '/search',
        query: {
          company_id: '123',
          location_id: '456',
        },
      });
    });

    it('filters out empty query params on form submit', async () => {
      mockSearchParams.mockReturnValue(new URLSearchParams());

      renderApp(<SearchForm />);

      fireEvent.change(screen.getByLabelText('Search by company'), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText('Search by location'), { target: { value: '456' } });

      fireEvent.submit(screen.getByRole('button', { name: 'Search' }));

      expect(pushMock).toHaveBeenCalledWith({
        pathname: '/search',
        query: {
          location_id: '456',
        },
      });
    });
  });
});
