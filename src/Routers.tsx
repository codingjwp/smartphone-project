import { Suspense, lazy } from 'react';
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';
import Root from './Root';
const RefExample = lazy(() => import('./refexample/RefExample'));


const Routers = () => {
    const routerElement = createBrowserRouter(createRoutesFromElements(
        <Route path='/' element={<Root />}>
            <Route path='refexample' element={<RefExample />} />
        </Route>
    ));
    return (
    <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={routerElement} />
    </Suspense>
    );
}

export default Routers;