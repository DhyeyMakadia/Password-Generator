import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import "./App.css";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  IconButton,
  InputAdornment,
  MenuItem,
  OutlinedInput,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Tooltip from "@mui/material/Tooltip";
import { generatePassword } from "./utils/helper";
import { Background } from "./components/Background";
import { PasswordLengthOptions as options } from "./utils/constants";

function App() {
  // const backgroundImage = "https://source.unsplash.com/random";
  const theme = createTheme();
  const [generatedPassword, setGeneratedPassword] = useState<string>("");
  const [passwordLength, setPasswordLength] = useState<number>(8);
  const [copyText, setCopyText] = useState<string>("Copy");

  function Copyright(props: any) {
    return (
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Copyright © "}
        <Link color="inherit" href="https://mui.com/">
          Your Website
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPassword);
    setCopyText("Copied!");
  };

  const handleTooltipClose = () => {
    setCopyText("Copy");
  };

  const Generate = () => {
    setGeneratedPassword(generatePassword(passwordLength));
  };

  return (
    <ThemeProvider theme={theme}>
      <div style={{ position: "relative", zIndex: 2 }}>
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography sx={{ mb: 2 }} component="h1" variant="h5">
            Password Generator
          </Typography>
          <Box
            component="form"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            noValidate
            sx={{ mt: 1 }}
          >
            <OutlinedInput
              id="outlined-adornment-password"
              type={"text"}
              value={generatedPassword}
              readOnly
              style={{ width: "500px", color: "black" }}
              endAdornment={
                <InputAdornment position="end">
                  <Tooltip
                    title={copyText}
                    placement="top"
                    onClose={handleTooltipClose}
                    arrow
                  >
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={copyToClipboard}
                      edge="end"
                    >
                      <ContentCopyIcon />
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              }
            />
            <TextField
              id="outlined-select-pass-length"
              select
              label="Password Length"
              value={passwordLength}
              style={{ width: "120px", marginTop: "15px" }}
              onChange={(e) =>
                setPasswordLength(e?.target ? Number(e?.target?.value) : 8)
              }
            >
              {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <Button
              type="button"
              onClick={Generate}
              fullWidth
              variant="contained"
              color="secondary"
              sx={{ mt: 3, mb: 2 }}
            >
              Generate
            </Button>
          </Box>
        </Box>
      </div>
      <Background />
    </ThemeProvider>
  );
}

export default App;
