import { BrowserRouter,Routes,Route} from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import UsersList from './components/UsersList';
import AddUserForm from './components/AddUserForm';
import EditUser from './components/EditUser';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<UsersList/>}/>
        <Route path="/add-user" element={<AddUserForm/>}/>
        <Route path="/edit-user/:id" element={<EditUser/>}/>
      </Routes>
    </BrowserRouter>
    </div>
    
  );
}

export default App;
