import { BrowserRouter } from 'react-router-dom';

interface AppProvidersProps {
  children: React.ReactNode;
}

export const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <BrowserRouter>
      {children}
    </BrowserRouter>
  );
};