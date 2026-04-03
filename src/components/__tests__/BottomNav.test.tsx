import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import BottomNav from '../BottomNav';
import { AlertCenterProvider } from '../../contexts/alert-center-context';

describe('BottomNav', () => {
  it('highlights active tab based on current route', () => {
    render(
      <AlertCenterProvider value={{ unresolvedCount: 0 }}>
        <MemoryRouter initialEntries={['/patients']}>
          <BottomNav />
        </MemoryRouter>
      </AlertCenterProvider>,
    );

    expect(screen.getByLabelText('Go to Patients')).toHaveAttribute('aria-current', 'page');
    expect(screen.getByLabelText('Go to Dashboard')).not.toHaveAttribute('aria-current');
  });

  it('shows alerts badge when unresolved count is greater than zero', () => {
    render(
      <AlertCenterProvider value={{ unresolvedCount: 4 }}>
        <MemoryRouter>
          <BottomNav />
        </MemoryRouter>
      </AlertCenterProvider>,
    );

    expect(screen.getByLabelText('4 unresolved alerts')).toBeInTheDocument();
  });
});
