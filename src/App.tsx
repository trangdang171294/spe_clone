import useRouteElement from './useRouteElement';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext, useEffect } from 'react';
import { LocalStorageEventTarget } from './utils/auth';
import { AppContext } from './contexts/app.context';

function App() {
    const routeElements = useRouteElement();
    const { reset } = useContext(AppContext);
    // hm
    useEffect(() => {
        LocalStorageEventTarget.addEventListener('clearAccessTokenFromLS', reset);
        return () => {
            LocalStorageEventTarget.removeEventListener('clearAccessTokenFromLS', reset);
        };
    }, [reset]);
    return (
        <div className="App">
            {routeElements}
            <ToastContainer />
        </div>
    );
}

export default App;
