import { Route, Routes } from 'react-router-dom';
import './App.css';
import Form from './components/Form';
import { ShowDb } from './components/ShowDb';
import { Thanks } from './components/Thanks';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path='/'>
          <Route exact path='/' element={<Form/>}/>
          <Route exact path="showdb">
            <Route index element={<ShowDb/>}/>
          </Route>
        </Route>
      </Routes>

    </div>
  );
}

export default App;
