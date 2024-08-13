import NotFound from '../routes/404'
import HomePage from '../routes/homePage'
import Pricing from '../routes/pricing'
import RootLayout from '../layouts/rootLayout'
import Login from '../routes/login'
import Register from '../routes/register'
import Account from '../routes/account'

export const routerConstant = [
  {
    element: <RootLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/pricing', element: <Pricing /> },
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
      { path: '/account', element: <Account /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]
