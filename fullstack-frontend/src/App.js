import IndexPage from './pages/IndexPage'
import {Routes,Route} from 'react-router-dom'
import LoginPage from './pages/LoginPage';
import Register from './pages/Register';
import Layout from './Layout';
import axios from 'axios';
import { UserContextProvider } from './UserContext';
import Account from './pages/AccountPage';
import LoadingPage from './pages/LoadingPage';
import PlacesPage from './pages/PlacesPage';
import PlacesFormPage from './pages/PlacesFormPage';
import PlacePage from './pages/PlacePage';
import BookingsPage from './pages/BookingsPage';
import BookingPage from './pages/BookingPage';
import Success from './pages/Success';
import Cancel from './pages/Cancel';
axios.defaults.baseURL = "http://localhost:5000"
axios.defaults.withCredentials = true
function App() {
  return (
    <UserContextProvider>
    <Routes>
      <Route path='/' element={<Layout/>}>
      <Route path="/" element={<IndexPage/>}/>
      <Route path='/login' element = {<LoginPage/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/account'element={<Account/>}/>
      <Route path='/account/places'element={<PlacesPage/>}/> 
      <Route path='/account/places/new'element={<PlacesFormPage/>}/> 
      <Route path='/loading' element={<LoadingPage/>}/>
      <Route path='/account/places/:id' element={<PlacesFormPage/>}/>     
      <Route path='/place/:id' element={<PlacePage/>}/>
      <Route path='/account/bookings' element={<BookingsPage/>}/>
      <Route path='/account/bookings/:id' element={<BookingPage/>}/>
      <Route path='/success' element={<Success/>}/>
      <Route path='/cancel' element={<Cancel/>}/>
      </Route> 
    </Routes>
    </UserContextProvider>
  );
}
export default App;
