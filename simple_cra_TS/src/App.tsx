// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// locales
import ThemeLocalization from './locales';
// components
import SnackbarProvider from './components/snackbar';
import { ThemeSettings } from './components/settings';
import { MotionLazyContainer } from './components/animate';
import { useDispatch } from './redux/store';
import { useEffect } from 'react';
import { fetchBookThunk } from './redux/slices/book';
import { fetchCategoriesThunk } from './redux/slices/category';

// ----------------------------------------------------------------------

export default function App() {
  const accessToken = localStorage.getItem('accessToken');
  const dispatch = useDispatch()
  if(accessToken != null){
    dispatch(fetchBookThunk());
    dispatch(fetchCategoriesThunk());
  }

  return (
    <MotionLazyContainer>
      <ThemeProvider>
        <ThemeSettings>
          <ThemeLocalization>
            <SnackbarProvider>
              <Router />
            </SnackbarProvider>
          </ThemeLocalization>
        </ThemeSettings>
      </ThemeProvider>
    </MotionLazyContainer>
  );
}
