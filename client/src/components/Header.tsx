"use client";
import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";
import { Colors } from "../colors/Colors";
import { TextField } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import headerLogo from '/src/images/logo-mark.svg'

import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { Box } from '@mui/material';

import "./Styles/Header.scss";

import {
  FULL_WIDTH,
  HEADER_LOGO_HEIGHT,
  HEADER_LOGO_WIDTH,
} from "../values/HardCodedValues";

const Header = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [isSearchButtonClicked, setIsSearchButtonClicked] = useState(false);

  function onSeachButtonClick() {
    setIsSearchButtonClicked(isSearchButtonClicked => !isSearchButtonClicked);
  }

  return (
    <HeaderWrapper>
      <Box className='top-line'>d</Box>
      <Box className="header-main-class">
        <Box className="header-logo">
          <Link href="/">
            <Logo src={headerLogo.src} className='header-logo-image' alt="Header logo" />
          </Link>
        </Box>
        <Box className="search-bar">
            <SearchIcon onClick={onSeachButtonClick} className='search-button' />
            {
               isSearchButtonClicked ? <TextField
               label="Search"
               value={searchValue}
               onChange={(e) => setSearchValue(e.target.value)}
               InputProps={{
                 endAdornment: searchValue && (
                   <CloseIconWrapper onClick={() => setSearchValue("")}>
                     <ClearIcon />
                   </CloseIconWrapper>
                 ),
                 color: "success",
               }}
               InputLabelProps={{ color: "success" }}
             /> : null
            }
        </Box>
        <Box className="user-profile">
            <AccountCircleRoundedIcon className='user-account-icon' fontSize='large'/>
        </Box>
      </Box>
    </HeaderWrapper>
  );
};

export default Header;

const HeaderWrapper = styled.div`
  width: ${FULL_WIDTH};
  background-color: ${Colors.white};
  position: relative;
  top: 0;
  left: 0;
`;

const Logo = styled.img`
  height: ${HEADER_LOGO_HEIGHT};
  width: ${HEADER_LOGO_WIDTH};
  opacity: 0.9;

  :hover {
    cursor: pointer;
    opacity: 1;
  }
`;

const CloseIconWrapper = styled.div`
  :hover {
    cursor: pointer;
  }
`;
