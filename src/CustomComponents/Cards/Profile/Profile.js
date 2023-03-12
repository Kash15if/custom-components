import profileStyles from "./Profile.module.css"
const imagesDir = require.context("../../../storage/images/", true);



const Profile = () => {
  return <div>
    <div className={profileStyles.card}>
      <img src={imagesDir(`./imageA.jpg`)} alt="Avatar" />
      <div className={profileStyles.container}>
        <h4><b>John Doe</b></h4>
        <p>Architect & Engineer</p>
      </div>
    </div>
  </div>;
};

export default Profile;
