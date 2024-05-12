import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createRoutesFromElements } from "react-router-dom"
import { createBrowserRouter } from 'react-router-dom'
import {Provider} from "react-redux"
import store from './redux/store.js'
import Todo from './pages/todo/Todo.jsx'
import TodoDetails from './pages/todo/TodoDetails.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'
import Profile from './pages/Profile.jsx'
import Register from './pages/auth/Register.jsx'
import Login from './pages/auth/Login.jsx'
import Home from './pages/Home.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='' element={<App />}>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} /> 
      <Route index={true} path='/' element={<Home />} /> 
      

      <Route path='' element={<PrivateRoute />} >
      <Route path='/todos' element={<Todo />} />
      <Route path='/todo/:id' element={<TodoDetails />} />
        <Route path='/profile' element={<Profile />} />
      </Route>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
