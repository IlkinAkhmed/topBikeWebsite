import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import './index.css'
import { store } from './store';
import { Provider } from "react-redux";
import ScrollToTop from './Helper/helper.jsx';
import UserProvider from './context/userContext.jsx';
import CategoryContextProvider from './context/categoryContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <CategoryContextProvider>
        <BrowserRouter>
          <Provider store={store}>
            <ScrollToTop />
            <App />
          </Provider>
        </BrowserRouter>
      </CategoryContextProvider>
    </UserProvider>
  </React.StrictMode>,
)
