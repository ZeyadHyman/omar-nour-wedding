import './App.css'
import Landing from './components/Landing'
import RSVP from "./components/RSVP";

function App() {

  return (
    <>
      <div className="bg-gradient-to-br from-[#f4ede5] via-[#f9f6f2] to-[#e6d9b9] pb-20">

        <Landing />
        <RSVP />

      </div>
    </>
  )
}

export default App
