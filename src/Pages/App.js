import React, {useEffect, useContext} from 'react'
import Menu from '../components/Menu'
import TripContext from '../contexts/trip';
import './app.css'

function App() {
  const {mapComponent} = useContext(TripContext)
  
  useEffect(() =>{
    /*axios.get('https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=-21.7695566,-46.5547852&destinations=-23.5505199,-46.63330939999999&key=AIzaSyBC-9Mp5zO3H8t2E9uBIbYfDS2OzHVxl_w')
    .then(response => console.log('Rotas',response))
    .catch(error => console.log('Rotas',error))*/
  },[])

  return (
    <div className='app'>
      <Menu/>
      {mapComponent}
    </div>
  );
}

export default App;
