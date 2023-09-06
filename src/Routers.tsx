import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';


const Routers = () => {
    const routerElement = createBrowserRouter(createRoutesFromElements(
        <Route path='/'>
            <Route path='tictactoe' />
        </Route>
    ));
    return (<RouterProvider router={routerElement} />);

}

export default Routers;