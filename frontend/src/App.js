import Layout from './components/Layout';
import { MenuProvider } from './context/MenuContext';
import { OrderProvider } from './context/OrderContext';

function App() {
    return (
        <MenuProvider>
            <OrderProvider>
                <Layout>
                    <div className="text-center">
                        <h2 className="text-xl">Restaurant Manager</h2>
                        <p className="text-gray-600">
                            Step 3 complete: Context API ready
                        </p>
                    </div>
                </Layout>
            </OrderProvider>
        </MenuProvider>
    );
}

export default App;