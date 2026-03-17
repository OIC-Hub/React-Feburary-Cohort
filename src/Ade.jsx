
import './App.css'
import NavBar from './components/navBar';
import Footer from './components/footer';
import ProfileCard from './components/profileCard';
import Counter from './components/counter';
import { Data } from './components/data';
import Effect from './components/effect';
import Timer from './components/timer';
import Fetch from "./components/Fetch"
import { UserProfile } from './components/userProfile';
import { Routes, Route } from 'react-router-dom';
import { NotFound } from './components/NotFound';
import { Users } from './components/user';
function App() {

  // const team = [
  //   {
  //     name: "Adeola Akinyemi",
  //     role: "Software Engineer",
  //     avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  //   },
  //   {
  //     name: "Kola Badmus",
  //     role: "Frontend Engineer",
  //     avatar: "https://randomuser.me/api/portraits/men/4.jpg"
  //   },
  //   {
  //     name: "Goodnew Oluwaseun",
  //     role: "Backend Engineer",
  //     avatar: "https://randomuser.me/api/portraits/men/9.jpg"
  //   },
  //   {
  //     name: "Sade Akinyemi",
  //     role: "UI/UX Designer",
  //     avatar: "https://randomuser.me/api/portraits/women/12.jpg"
  //   }
  // ]

  return (
    
    <>
    {/* <NavBar/>
    <Effect/>

    <Timer/>
    <div className="profile-container">
     {team.map((teammember, index) => (
      <ProfileCard 
        key={index}
        name={teammember.name}
        role={teammember.role}
        avatar={teammember.avatar}
      />
    ))}
    </div>

    <Data/>

    <Footer/>

    <Counter/>

    <Fetch/>
    </> */}

    <Routes>
        <Route path='/count' element={<Counter/>}/>
        <Route path="/data" element={<Data/>}/>
        <Route path="*" element={<NotFound/>}/>
        <Route path='/user/:id' element={<UserProfile/>}/>
        <Route path='/users' element={<Users/>}/>
        
    </Routes>

    </>
  )
}

export default App
