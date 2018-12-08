import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import store from '@store';
import history from '@script/history';
import 'babel-polyfill';
import '@assets/styles/css/global';
import '@script/adjustLayout';
import App from '@view/App';
import { AppContainer } from 'react-hot-loader';

const render = (Component) => {
  const renderMethod = ReactDOM.render;
  const ModeRouter = Object.is(process.env.NODE_ENV, 'development')
    ? HashRouter
    : HashRouter;
  renderMethod(
    <AppContainer>
      <Provider store={store}>
        <ModeRouter history={history} hashType="hashbang">
          <Component />
        </ModeRouter>
      </Provider>
    </AppContainer>,
    document.getElementById('root'),
  );
};

render(App);

if (module.hot) {
  module.hot.accept('@view/App', () => {
    const NextApp = require('@view/App').default;
    render(NextApp);
  });
}
