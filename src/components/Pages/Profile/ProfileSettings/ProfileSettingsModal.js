import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import ProfileSettingsModalStyles from "./ProfileSettingsModalStyles";
import IconButton from "@mui/material/IconButton";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import ClearIcon from "@mui/icons-material/Clear";
import {
  validateNames,
  validateFileSize,
  validateFileExtension,
} from "./ValidationFunctions";
import ProfileSettingsAlert from "./ProfileSettingsAlert";
import { useState } from "react";
import { save } from "./actions";
import CropEasy from "./crop/CropEasy";
import { Avatar } from "@mui/material";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import { useNavigate } from "react-router-dom";
import { useAuthState,useAuthDispatch } from "../../../Contexts";
import { useContext } from "react";
import { UserExtraInfoContext } from "../../../Contexts/UserExtraInfoContext";
const style = {
  position: "absolute",

  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  borderRadius: "18px",
  p: 4,
};

export default function ProfileSettingsModal({ settings, setSettings,mainState,profileState,setProfileState }) {
  const dispatch = useAuthDispatch(); // read dispatch method from context
  let navigate = useNavigate();
  const { userImg } = useContext(UserExtraInfoContext);
  const handleSend = async () => {
    if (validate()) {
      save(settings,mainState,dispatch,profileState,setProfileState);
      setSettings({...settings,isopen:false})
      navigate("/"+mainState.user.id)
    } else {
      window.scrollTo(0, 0);
    }
  };
  const validate = () => {
    if (settings.cropModalOpen === true) {
      setAlert({ msg: "Please Finish Editing Your Media", isOpen: true });
      return false;
    }

    if (!validateNames(settings.name)) {
      setAlert({ msg: "Enter Your Name", isOpen: true });
      return false;
    }
    if (!validateNames(settings.surname)) {
      setAlert({ msg: "Enter Your Surname", isOpen: true });
      return false;
    }
    /*
    if (!validateAbout(settings.about)) {
      setAlert({ msg: "Fill the About", isOpen: true });
      return false;
    }
    */
    return true;
  };

  const [alertState, setAlert] = useState({ msg: "", isOpen: false });

  const classes = ProfileSettingsModalStyles();

  return (
    <div>
      <Modal
        open={settings.isopen}
        onClose={() => {
          setSettings({ isopen: false });
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className={classes.modalBox}>
          <div className={classes.innerGlobal}>
            <ProfileSettingsAlert alertState={alertState} setAlert={setAlert} />
            <IconButton
              aria-label="back"
              onClick={() => {
                setSettings({ isopen: false });
              }}
            >
              <KeyboardBackspaceIcon />
            </IconButton>
            <div className={classes.title}>Your Account</div>
            <div className={classes.middleArea}>
              <div className={classes.avatarWrapper}>
                <label htmlFor="icon-button-file">
                  <input
                    style={{ display: "none" }}
                    accept="image/*"
                    id="icon-button-file"
                    type="file"
                    onChange={(e) => {
                      if (
                        validateFileExtension(e.target.files[0].type) === false
                      ) {
                        setAlert({
                          msg: "Please Select An Image",
                          isOpen: true,
                        });
                        return;
                      }
                      if (validateFileSize(e.target.files[0].size) === false) {
                        setAlert({
                          msg: "File is too big. Max 5MB",
                          isOpen: true,
                        });
                        return;
                      }
                      console.log("w:" + e.target.files[0].width);
                      setSettings({
                        ...settings,
                        originalFile: e.target.files[0],
                        selectedFile: URL.createObjectURL(e.target.files[0]),
                        cropModalOpen: true,
                      });
                    }}
                    value=""
                  />
                  <Avatar
                    alt="Remy Sharp"
                    src={
                      settings.selectedFile
                        ? settings.selectedFile
                        : userImg
                    }
                    sx={{ width: 100, height: 100, cursor: "pointer" }}
                  />
                </label>
                
                {
                settings.selectedFile!==undefined && settings.selectedFile!==null
                && <div className={classes.RemovePhotoText} onClick={()=>setSettings({...settings,selectedFile:null})}>Remove Photo</div>
                }
                
                </div>
              
              {settings.selectedFile && (
                <div className={classes.mediaArea}>
                  <ClearIcon
                    className={classes.mediaClear}
                    onClick={() => {
                      setSettings({ ...settings, selectedFile: null });
                    }}
                  />

                  <div>
                    {settings.cropModalOpen && (
                      <CropEasy {...{ settings, setSettings }} />
                    )}
                  </div>
                </div>
              )}
              <div className={classes.inputAreaWrapper}>
                <TextField
                  id="multiline-static"
                  placeholder={settings.name}
                  value={settings.name}
                  className={classes.text}
                  onChange={(e) => {
                    setSettings({ ...settings, name: e.target.value });
                  }}
                />
                <TextField
                  id="multiline-static"
                  placeholder={settings.surname}
                  value={settings.surname}
                  className={classes.text}
                  onChange={(e) => {
                    setSettings({ ...settings, surname: e.target.value });
                  }}
                />
                <TextField
                  id="multiline-static"
                  placeholder={settings.description!==null?settings.description:"About You"}
                  value={settings.description}
                  className={classes.text}
                  onChange={(e) => {
                    setSettings({ ...settings, description: e.target.value });
                  }}
                />
              </div>
            </div>
            <div className={classes.bottom}>
              <div className={classes.savebuttonWrapper}>
                <Button
                  variant="contained"
                  className={classes.sendButton}
                  endIcon={<SaveAsIcon />}
                  onClick={handleSend}
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
