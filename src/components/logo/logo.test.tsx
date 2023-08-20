import { render, screen } from '@testing-library/react';
import Logo from './logo';
import { withHistory } from '../../utils/mock-component';

describe('Component: Logo', () => {
  it('should render correct', () => {
    const logoImgTestId = 'logo-img';

    render(withHistory(<Logo />));
    const logoImg = screen.getByTestId(logoImgTestId);

    expect(logoImg).toBeInTheDocument();
  });
});
