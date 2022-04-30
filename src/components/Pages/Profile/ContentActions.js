import ProfilePostArea from "./ProfilePostArea";
import ProfileEventArea from "./ProfileEventArea";

import Clubs from "./ClubTab/Clubs";
import Memberships from "./MembershipsTab/Memberships"
import Followers from "./FollowersTab/Followers";

export const alltabs={
  ProfilePostArea:<ProfilePostArea/>,
  Followers:<Followers/>,
  ProfileEventArea:<ProfileEventArea/>,
  SURVEYS:"SURVEYS",
  Clubs:<Clubs/>,
  Memberships:<Memberships/>
}

export const GetContent = (index,useriid,uniid) => {

  if(useriid){
    switch (index) {
      case 0:
        return <ProfilePostArea />;

      case 1:
        return <ProfileEventArea />;

      case 2:
        return "SURVEYS";
  
      case 3:
        return <Memberships/>;
  
      default:
        break;
    }
  }


  if(uniid){
    switch (index) {
      case 0:
        return <ProfilePostArea />;
  
      case 1:
        return <Followers/>;
  
      case 2:
        return <ProfileEventArea />;
  
      case 3:
        return "SURVEYS";
  
      case 4:
        return (<Clubs/>);
  
      default:
        break;
    }
  }


};
