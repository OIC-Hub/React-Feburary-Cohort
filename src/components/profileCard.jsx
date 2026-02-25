const ProfileCard = ({ name, role, avatar }) => {
  return (
    <div className="profile-card">
        <img src={avatar} alt={`${name}'s profile`} className="profile-image" />  
        <h2 className="profile-name">{name}</h2>
        <p className="profile-title">{role}</p>
    </div>
  );
}

export default ProfileCard;