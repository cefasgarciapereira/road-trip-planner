import React, {useContext} from 'react'
import Menu from '../components/Menu'
import TripDetails from '../components/TripDetails'
import TripContext from '../contexts/trip'
import './app.css'

function App() {
  const {mapComponent} = useContext(TripContext)

  return (
    <div className='app'>
      <Menu/>
      <TripDetails/>
      {mapComponent}
    </div>
  );
}

export default App;
