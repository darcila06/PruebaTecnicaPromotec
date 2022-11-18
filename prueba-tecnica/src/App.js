import './App.css';
import { Routes, Route } from "react-router-dom";
import Layout from './components/Layout';
import Main from './components/Main'
import 'bootstrap/dist/css/bootstrap.min.css';
import UserDetail from './components/UserDetail';
import UserEdit from './components/UserEdit';
import UserCreate from './components/UserCreate';

const App = () => {
  return (
    <div>
      <Layout>
        <Routes>
            <Route path='/' element={<Main/>}/>
            <Route
            path="/user-detail/:userId"
            element={<UserDetail />}
            />
            <Route
            path="/user-edit/:userId"
            element={<UserEdit />}
            />
            <Route
            path="/user-create"
            element={<UserCreate />}
            />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
