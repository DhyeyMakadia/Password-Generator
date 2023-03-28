import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import "./App.css";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
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
import { AllowedCharacters } from "./models/password-generator";

function App() {
  // const backgroundImage = "https://source.unsplash.com/random";
  const theme = createTheme();
  const [generatedPassword, setGeneratedPassword] = useState<string>("");
  const [passwordLength, setPasswordLength] = useState<number>(8);
  const [copyText, setCopyText] = useState<string>("Copy");
  const [allowedChars, setAllowedChars] = useState<AllowedCharacters>({
    uppercase: true,
    lowercase: true,
    numbers: true,
    specialchars: true,
  });
  const [error, setError] = useState<boolean>(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPassword);
    setCopyText("Copied!");
  };

  const handleTooltipClose = () => {
    setTimeout(() => {
      setCopyText("Copy");
    }, 500);
  };

  const Generate = () => {
    if (!error) {
      setGeneratedPassword(generatePassword(passwordLength, allowedChars));
    }
  };

  const handleChange = (e: any) => {
    const updatedValue = { ...allowedChars, [e.target.name]: e.target.checked };
    setAllowedChars(updatedValue);
    const isAllUnchecked = Object.values(updatedValue).every(
      (x) => x === false
    );
    setError(false);
    if (isAllUnchecked) {
      setError(true);
    }
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

            <FormControl
              required
              error={error}
              component="fieldset"
              variant="standard"
            >
              <Grid container spacing={0}>
                <Grid item xs={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={handleChange}
                        name="uppercase"
                        color="secondary"
                        checked={allowedChars.uppercase}
                      />
                    }
                    label="Upper Case"
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={handleChange}
                        name="lowercase"
                        color="secondary"
                        checked={allowedChars.lowercase}
                      />
                    }
                    label="Lower Case"
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={handleChange}
                        name="numbers"
                        color="secondary"
                        checked={allowedChars.numbers}
                      />
                    }
                    label="Numbers"
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={handleChange}
                        name="specialchars"
                        color="secondary"
                        checked={allowedChars.specialchars}
                      />
                    }
                    label="Special Characters"
                  />
                </Grid>
              </Grid>
              {error && (
                <FormHelperText>
                  Atleast one option needs to be checked!
                </FormHelperText>
              )}
            </FormControl>
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
