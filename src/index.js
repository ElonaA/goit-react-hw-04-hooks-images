import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@emotion/react';
import './index.css';
import App from 'components/App/App';

const theme = {
  size: {
    title: '21px',
    subtitle: '15px',
    button: '17px',
    review: '18px',
  },

  icon: {
    small: '27px',
    medium: '40px',
  },

  colors: {
    white: '#ffffff',
    black: '#090c1c',
    grey: 'rgb(197, 196, 196)',
    link: '#bebebe',
    primary: '#02be6e',
    green: '#495057',
    primaryText: '#212121',
    secondaryText: '#757575',
    shadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);',
    overlay: 'rgba(0, 0, 0, 0.8)',
  },

  animate: {
    transition: '500ms cubic-bezier(0.075, 0.82, 0.165, 1)',
  },
};

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
