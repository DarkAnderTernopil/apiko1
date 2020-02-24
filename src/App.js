import React from 'react';
import Modal from 'react-modal';
import { createStore, Provider } from './stores/createStore';
import Router from './scenes/routes';

const store = createStore();
store.bootstrap();
function App() {
  // const [isLoading, setLoading] = useState(true);
  // useEffect(() => {
  //
  // }, []);
  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }
  return (
    <main>
      <Provider value={store}>
        <Router />
      </Provider>
    </main>
  );
}
Modal.setAppElement('#modalRoot');
export default App;
