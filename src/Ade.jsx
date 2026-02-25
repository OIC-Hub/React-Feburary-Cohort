
import './App.css'
import NavBar from './components/navBar';
import Footer from './components/footer';
import ProfileCard from './components/profileCard';
function App() {

  const team = [
    {
      name: "Adeola Akinyemi",
      role: "Software Engineer",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      name: "Kola Badmus",
      role: "Frontend Engineer",
      avatar: "https://randomuser.me/api/portraits/men/4.jpg"
    },
    {
      name: "Goodnew Oluwaseun",
      role: "Backend Engineer",
      avatar: "https://randomuser.me/api/portraits/men/9.jpg"
    },
    {
      name: "Sade Akinyemi",
      role: "UI/UX Designer",
      avatar: "https://randomuser.me/api/portraits/women/12.jpg"
    }
  ]

  return (
    <>
    <NavBar/>
    
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

    <Footer/>
    </>
  )
}

export default App
