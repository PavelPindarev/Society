import {
  Box,
  Button,
  TextField,
  Typography,
  Avatar,
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import styled from "styled-components";
import Image from "next/image";
import { CreatePost } from "@/components/posts/createPost/CreatePost";

import { Colors } from "../../colors/Colors";
import profileThumbnail from "../../../public/profileThumbnail.png";
import defaultUserPicture from "../../../public/defaultUserPicture.png";
import albumPicture from "../../../public/albumPicture.png";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import TodayIcon from "@mui/icons-material/Today";
import { Post } from "../../components/posts/Post";

import "./Profile.scss";

const UserProfile = () => {
  return (
    <main className="profile-wrapper">
      <Container>
        <Box className="profile-images">
          <Image
            src={profileThumbnail}
            alt="Profile photo"
            className="profile-banner"
          />
          <Box className="profile-picture-box">
            <Image
              src={defaultUserPicture}
              alt="Name"
              className="profile-picture"
            />
          </Box>
        </Box>
        <h2>Name Name</h2>
        <Grid container spacing={2} className="profile-content">
          <Grid item xs={4} className="profile-information">
            <List
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
              className="profile-information-data information-data"
            >
              <ListItem>
                <LocationOnIcon />
                Location
              </ListItem>
              <ListItem>
                <WorkIcon />
                Work
              </ListItem>
              <ListItem>
                <SchoolIcon />
                Education
              </ListItem>
              <ListItem>
                <TodayIcon />
                Birthday
              </ListItem>
              <Typography>See more...</Typography>
            </List>

            <Grid container spacing={2} className="album-grid">
              <Grid>
                <ListItem className="album-grid-item">
                  <Image
                    src={albumPicture}
                    alt="Profile photo"
                    className="user-picture-item"
                  />
                </ListItem>
              </Grid>
              <Grid>
                <ListItem className="album-grid-item">
                  <Image
                    src={albumPicture}
                    alt="Profile photo"
                    className="user-picture-item"
                  />
                </ListItem>
              </Grid>
              <Grid>
                <ListItem className="album-grid-item">
                  <Image
                    src={albumPicture}
                    alt="Profile photo"
                    className="user-picture-item"
                  />
                </ListItem>
              </Grid>
              <Grid>
                <ListItem className="album-grid-item">
                  <Image
                    src={albumPicture}
                    alt="Profile photo"
                    className="user-picture-item"
                  />
                </ListItem>
              </Grid>
            </Grid>
          </Grid>
          <Grid className="profile-action" item xs={8}>
            <CreatePost />
            <Post />
            <Post />
          </Grid>
        </Grid>
      </Container>
    </main>
  );
};

const ProfileWrapper = styled.div`
  height: 300px;
  width: 200px;
  background-color: "#F5F5F5";
`;

export default UserProfile;
