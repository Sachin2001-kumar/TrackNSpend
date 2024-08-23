import { useState } from 'react';
import './App.css';
import { MainLayout } from './styles/Layouts';
import Navigation from './Components/Navigation';
import Orb from './Components/Orb';
import Dashboard from './Components/Dashboard';
import Income from './Components/income';
import Expense from './Components/Expense';
import { useGlobalContext } from './context/GlobalContext';

function App() {
  const [active,setActive]=useState(1);
  const global=useGlobalContext();
  console.log(global);

  const DispalyData=()=>{
    switch(active){
      case 1:
        return <Dashboard/>
      case 2:
        return <Dashboard/>
      case 3:
        return <Income/>
      case 4:
        return <Expense/>
      default:
        return <Dashboard/>
    }
  }
  return (
    <div className="App">
      <Orb />
      <MainLayout>
        <Navigation active={active} setActive={setActive}/>
        <main>
          {DispalyData()}
        </main>
      </MainLayout>
    </div>
  );
}

export default App;
