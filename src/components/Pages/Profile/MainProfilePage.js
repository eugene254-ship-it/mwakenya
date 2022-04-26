import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import MainProfileStyles from "./MainProfileStyles";
import UserAvatar from "../UserAvatar";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import { Button } from "@mui/material";
import { useAuthState } from "../../Contexts";
import { useContext } from "react";
import NewPostModal from "../Post/NewPostModal";
import { NewPostModalContext } from "../../Contexts/NewPostModalContext";
import MyTabs from "./MyTabs";
import Content from "./Content";
import { useParams } from "react-router-dom";
import "react-awesome-lightbox/build/style.css";
import ProfileSettingsModal from "./ProfileSettings/ProfileSettingsModal";
import StarIcon from "@mui/icons-material/Star";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Acciordion from "./Accordion/Accordion";
import AdminListModal from "./AdminListModal";
import CreateClubModal from "./ProfileCreateClub/CreateClubModal";
import { NewUniPostModalContext } from "../../Contexts/NewUniPostModalContext";
import { ProfileContext } from "../Profile/ProfileContext";
import UserAvatarResponsive from "./UserAvatarResponsive";
import UniversitySettingsModal from "./UniversitySettings/UniversitySettingsModal";
import { follow, unfollow } from "./PanelActions";
const MainProfilePage = () => {
  // const navigate = useNavigate();
  const [tab, setTab] = React.useState(0);
  const mainState = useAuthState(); //read user details from context

  const { newPostState, setNewPostState } = useContext(NewPostModalContext);
  const { newUniPostState, setNewUniPostState } = useContext(
    NewUniPostModalContext
  );
  const { userid, uniid } = useParams();

  // bu noktada username yerine user id ile kişi bilgileri için istek yönetimi yapılacak
  console.log("profil sahibi:", userid, uniid);
  // bu follow bilgisi bilgilerle kontrol edilecek
  // const [follow, setFollow] = useState(false);
  const [settings, setSettings] = useState();
  const [settingsUni, setSettingsUni] = useState();
  const [createClubState, setCreateClubState] = useState();
  const [isAdmin, setIsAdmin] = useState(false);
  console.log("isAdmin:", isAdmin);
  const isYourProfile = mainState.user.id === userid;
  console.log("isYourProfile:", isYourProfile);
  const { profileState, setProfileState } = useContext(ProfileContext);
  console.log("state:", profileState);

  useEffect(() => {
    setIsAdmin(profileState.userInfo.adminId === mainState.user.id);
  }, [profileState.userInfo]); //eslint-disable-line

  const isUni = userid === "fatihsultanmehmetvakifuniversitesi";
  // buradaki durum bilgisi istekle yönetilecek
  const isFollow = profileState.isFollow;
 
  console.log("isFollow:", isFollow);
  console.log("followShip:", profileState.followShip);
  const classes = MainProfileStyles();
  const [showAdminList, setShowAdminList] = React.useState(false);

  const handleFollow = async () => {
    follow(
      mainState.user.id,
      profileState.userInfo.id,
      profileState,
      setProfileState
    );
  };
  const handleUnfollow = () => {
    // join(mainState.user.id,clubState.clubInfo.id)
    unfollow(profileState.followShip, profileState, setProfileState);
  };

  return (
    <Grid id={"xyz"} container className={classes.HomeContainer}>
      <AdminListModal
        showAdminList={showAdminList}
        setShowAdminList={setShowAdminList}
      />
      <Grid item className={classes.LeftSide}>
        <div className={classes.leftSideInner}>
          {isYourProfile && (
            <div className={classes.editButtonWrapper}>
              <IconButton
                aria-label="delete"
                onClick={() =>
                  setSettings({ ...profileState.userInfo, isopen: true })
                }
              >
                <EditIcon />
              </IconButton>
            </div>
          )}

          {isAdmin && (
            <div className={classes.editButtonWrapper}>
              <IconButton
                aria-label="delete"
                onClick={() =>
                  setSettingsUni({ ...profileState.userInfo, isopen: true })
                }
              >
                <EditIcon />
              </IconButton>
            </div>
          )}

          <UserAvatar profileImgId={profileState.userInfo.profileImgId} />
          <Typography variant="body1" className={classes.UserName}>
            {profileState.userInfo.name} {profileState.userInfo.surname}
          </Typography>
          <Divider />
          <Typography variant="body1" className={classes.UserName}>
            {profileState.userUniInfo.name}
          </Typography>

          <Typography variant="body1" className={classes.UserDept}>
            {profileState.userInfo.type}
          </Typography>
          <Typography variant="body1" className={classes.UserDept}>
            {profileState.userInfo.description}
          </Typography>
          <Divider />
          <div className={classes.LeftSideFollowWrapper} >
            <Typography variant="body2" className={classes.UserDept}>
              {userid && "123 Follows"}
            </Typography>
            <Typography variant="body2" className={classes.UserDept}>
              {profileState.followers?.length + " Followers"}
            </Typography>
          </div>

          <div className={classes.LeftSideButtonWrapper}>
            {isAdmin === false && isYourProfile === false &&
              (isFollow ? (
                <Button
                  className={classes.LeftSideButton}
                  onClick={handleUnfollow}
                >
                  UnFollow
                </Button>
              ) : (
                <Button
                  className={classes.LeftSideButton}
                  onClick={handleFollow}
                >
                  Follow
                </Button>
              ))}

            {isAdmin && (
              <div className={classes.AdminAreaWrapper}>
                <Divider />
                <div className={classes.AdminTitleWrapper}>
                  <StarIcon className={classes.AdminStarIcon} />
                  <div className={classes.AdminText}>Admin</div>
                </div>
                <List component="nav" aria-label="mailbox folders">
                  <ListItem
                    onClick={() => setCreateClubState({ isopen: true })}
                    button
                  >
                    <ListItemText primary="Create Club" />
                  </ListItem>
                  <Divider />
                  <ListItem
                    onClick={() => setShowAdminList(true)}
                    button
                    divider
                  >
                    <ListItemText primary="Show Admins" />
                  </ListItem>
                  <Divider />
                  <ListItem
                    onClick={() =>
                      setNewUniPostState({
                        type: "Post",
                        isOpen: true,
                        from: mainState.user.email,
                        uniPost: true,
                        uniID: "1",
                      })
                    }
                    button
                    divider
                  >
                    <ListItemText primary="New Post" />
                  </ListItem>
                </List>
              </div>
            )}
          </div>
        </div>
      </Grid>
      <Grid item className={classes.Center}>
        {newPostState && (
          <NewPostModal modalState={newPostState} setModal={setNewPostState} />
        )}
        {newUniPostState && (
          <NewPostModal
            modalState={newUniPostState}
            setModal={setNewUniPostState}
          />
        )}
        {settings && (
          <ProfileSettingsModal
            settings={settings}
            setSettings={setSettings}
            mainState={mainState}
            profileState={profileState}
            setProfileState={setProfileState}
          />
        )}
        {settingsUni && (
          <UniversitySettingsModal
            settings={settingsUni}
            setSettings={setSettingsUni}
            profileState={profileState}
            setProfileState={setProfileState}
          />
        )}
        {createClubState && (
          <CreateClubModal
            settings={createClubState}
            setSettings={setCreateClubState}
            adminId={mainState.user.id}
            universityId={profileState.userInfo.id}
          />
        )}

        <div className={classes.CenterTopUserInfoWrapper}>
          <div className={classes.CenterTopUserInfoLeftSide}>
            <div className={classes.CenterTopUserInfoLeftSideAvatarWrapper}>
              <UserAvatarResponsive
                profileImgId={profileState.userInfo.profileImgId}
              />
            </div>
            <div className={classes.CenterTopButtonWrapper}>
              {isYourProfile ? (
                <Button
                  onClick={() =>
                    setSettings({ ...profileState.userInfo, isopen: true })
                  }
                  className={classes.CenterTopButton}
                  endIcon={<EditIcon className={classes.CenterTopEditIcon} />}
                >
                  Edit
                </Button>
              ) : follow ? (
                <Button className={classes.CenterTopButton}>UnFollow</Button>
              ) : (
                <Button className={classes.CenterTopButton}>Follow</Button>
              )}
            </div>
          </div>
          <div className={classes.CenterTopUserInfoRightSide}>
            <div className={classes.CenterTopUserInfoRightSideUserName}>
              {profileState.userInfo.name} {profileState.userInfo.surname}
            </div>
            <div className={classes.CenterTopUserInfoRightSideUniversityName}>
              {profileState.userUniInfo.name}
            </div>

            <div className={classes.CenterTopUserInfoRightSideUserType}>
              {profileState.userInfo.type}
            </div>

            <div className={classes.CenterTopUserInfoRightSideFollowWrapper}>
              <div className={classes.CenterTopUserInfoRightSideFollowInfo}>
                {"120 Follows"}
              </div>
              <div className={classes.CenterTopUserInfoRightSideFollowInfo}>
                {"200 Followers"}
              </div>
            </div>
          </div>
        </div>
        {isAdmin && (
          <Acciordion
            createClubState={createClubState}
            setCreateClubState={setCreateClubState}
            showAdminList={showAdminList}
            setShowAdminList={setShowAdminList}
            setNewUniPostState={setNewUniPostState}
          />
        )}
        <MyTabs isUni={isUni} tab={tab} setTab={setTab} />

        <Content tab={tab} />
      </Grid>
      <Grid item className={classes.RightSide}>
        <div className={classes.rightSideInner}>
          <Typography variant="body1" className={classes.UserDept}>
            Right Side
          </Typography>
          <Typography variant="body1" className={classes.UserDept}>
            Right Side
          </Typography>
          <Typography variant="body1" className={classes.UserDept}>
            Right Side
          </Typography>
        </div>
      </Grid>
    </Grid>
  );
};

export default MainProfilePage;
