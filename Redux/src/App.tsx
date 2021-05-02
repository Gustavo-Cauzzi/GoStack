import { Provider as ReduxProvider } from 'react-redux';
import Cart from './components/Cart';
import Catalog from './components/Catalog';
import store from './store';

function App() {
  return (
    <ReduxProvider store={store}>
      <Catalog />
      <Cart />
    </ReduxProvider>
  );
}

export default App;
