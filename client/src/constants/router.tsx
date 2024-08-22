import NotFound from '../routes/404'
import HomePage from '../routes/homePage'
import Pricing from '../routes/pricing'
import RootLayout from '../layouts/rootLayout'
import Login from '../routes/login'
import Register from '../routes/register'
import Account from '../routes/account'
import Browse from '../routes/browse'
import CreateTicket from '../routes/create'
import { Success } from '../routes/success'
import PaymentCanceled from '../routes/cancel'
import VideoCall from '../routes/videoCall'
import MessageRoom from '../routes/messageRoom'

export const routerConstant = [
  {
    element: <RootLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/pricing', element: <Pricing /> },
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
      { path: '/account', element: <Account /> },
      { path: '/browse', element: <Browse /> },
      { path: '/create', element: <CreateTicket /> },
      { path: '/browse', element: <Browse /> },
      { path: '/success', element: <Success /> },
      { path: '/cancel', element: <PaymentCanceled /> },
      { path: '/videoCall/:id', element: <VideoCall /> },
      { path: '/messageRoom/:id', element: <MessageRoom /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]
