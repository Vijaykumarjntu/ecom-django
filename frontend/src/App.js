import Layout from './components/Layout';
import { MenuProvider } from './context/MenuContext';
import { OrderProvider } from './context/OrderContext';
import MenuPage from './pages/MenuPage';

function App() {
  return (
    <MenuProvider>
      <OrderProvider>
        <Layout>
          <MenuPage />
        </Layout>
      </OrderProvider>
    </MenuProvider>
  );
}

export default App;