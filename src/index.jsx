import { AppContainer } from 'react-hot-loader'
import React from 'react';
import ReactDOM from 'react-dom';
import './Styles/Main.scss';

import { App } from './App.tsx';

ReactDOM.render(<App />, document.getElementById('root'));

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root')
  )
};

render(App);

if (module.hot)
  module.hot.accept('./App.tsx', () => { render(App) });