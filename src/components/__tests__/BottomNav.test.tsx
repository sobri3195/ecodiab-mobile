import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import BottomNav from '../BottomNav';
import { AlertCenterProvider } from '../../contexts/alert-center-context';

describe('BottomNav', () => {
  it('highlights active tab based on current route', () => {
    render(
      <AlertCenterProvider value={{ unresolvedCount: 0 }}>
        <MemoryRouter initialEntries={['/tracker']}>
          <BottomNav />
        </MemoryRouter>
      </AlertCenterProvider>,
    );

    expect(screen.getByLabelText('Go to Tracker')).toHaveAttribute('aria-current', 'page');
    expect(screen.getByLabelText('Go to Beranda')).not.toHaveAttribute('aria-current');
  });

  it('shows community badge when unresolved count is greater than zero', () => {
    render(
      <AlertCenterProvider value={{ unresolvedCount: 4 }}>
        <MemoryRouter>
          <BottomNav />
        </MemoryRouter>
      </AlertCenterProvider>,
    );

    expect(screen.getByLabelText('4 unread community notifications')).toBeInTheDocument();
  });
});
