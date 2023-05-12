import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SIgnUp/SignUp";
import Checkout from "../Pages/Checkout/Checkout";
import BookService from "../Pages/BookService/BookService";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Main/>,
      children: [
        {
            path: '/',
            element: <Home></Home>
        },
        {
          path: 'login',
          element: <Login/>
        },
        {
          path: 'signUp',
          element: <SignUp/>
        },
        {
          path: 'book/:id',
          element: <BookService/>,
          loader: ({params}) => fetch(`http://localhost:5000/services/${params.id}`) 
        },
        {
          path: 'checkout/:id',
          element: <Checkout/>,
          loader: ({params}) => fetch(`http://localhost:5000/services/${params.id}`)
        },
      ]
    },
  ]);


  export default router;