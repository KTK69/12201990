import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Paper,
  Snackbar,
  Box,
  Divider,
} from "@mui/material";
import { log } from "../logging-middleware/log";;

const generateCode = () => Math.random().toString(36).substring(2, 7);

export default function Home() {
  const [inputs, setInputs] = useState([{ longUrl: "", shortcode: "", validity: "" }]);
  const [results, setResults] = useState([]);
  const [snack, setSnack] = useState("");

  const handleChange = (index, key, value) => {
    const updated = [...inputs];
    updated[index][key] = value;
    setInputs(updated);
  };

  const shorten = () => {
    const newResults = [];
    const now = Date.now();
    let success = false;

    inputs.forEach((entry) => {
      const { longUrl, shortcode, validity } = entry;
      const code = shortcode || generateCode();
      const duration = parseInt(validity || "30");

      if (!longUrl.match(/^https?:\/\//)) {
        log("frontend", "error", "component", "Invalid URL format");
        return setSnack("❌ Invalid URL: Must start with http:// or https://");
      }

      if (localStorage.getItem(code)) {
        log("frontend", "warn", "utils", "Shortcode collision");
        return setSnack(`⚠️ Shortcode already exists: ${code}`);
      }

      const item = {
        originalUrl: longUrl,
        shortcode: code,
        createdAt: new Date(now).toISOString(),
        expiresAt: new Date(now + duration * 60000).toISOString(),
        clicks: [],
      };

      localStorage.setItem(code, JSON.stringify(item));
      newResults.push(item);
      success = true;
      log("frontend", "info", "page", `Shortened URL for ${longUrl}`);
    });

    if (success) {
      setResults([...results, ...newResults]);
      setSnack("✅ URL(s) shortened successfully!");
    }
  };

  return (
    <Box sx={{ p: 4, maxWidth: "900px", margin: "auto" }}>
      <Typography variant="h4" gutterBottom align="center">
        🔗 URL Shortener
      </Typography>

      <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 3 }}>
        Paste up to 5 URLs below and get clean short links. Optionally add a shortcode and expiry time.
      </Typography>

      {inputs.map((input, index) => (
        <Paper key={index} sx={{ p: 2, mb: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Long URL"
                placeholder="https://example.com/very/long/link"
                variant="outlined"
                value={input.longUrl}
                onChange={(e) => handleChange(index, "longUrl", e.target.value)}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <TextField
                fullWidth
                label="Custom Shortcode"
                placeholder="Optional"
                variant="outlined"
                value={input.shortcode}
                onChange={(e) => handleChange(index, "shortcode", e.target.value)}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <TextField
                fullWidth
                label="Validity (min)"
                type="number"
                placeholder="30"
                variant="outlined"
                value={input.validity}
                onChange={(e) => handleChange(index, "validity", e.target.value)}
              />
            </Grid>
          </Grid>
        </Paper>
      ))}

      <Box textAlign="center" mt={2}>
        <Button
          variant="contained"
          onClick={shorten}
          sx={{ px: 4, py: 1.2, fontWeight: "bold" }}
        >
          Shorten URLs
        </Button>
      </Box>

      <Snackbar
        open={!!snack}
        autoHideDuration={3000}
        message={snack}
        onClose={() => setSnack("")}
      />

      {results.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            🔍 Shortened Links:
          </Typography>
          {results.map((r, i) => (
            <Paper key={i} sx={{ p: 2, mb: 2 }}>
              <Typography>
                <strong>Original:</strong> {r.originalUrl}
              </Typography>
              <Typography>
                <strong>Short:</strong>{" "}
                <a href={`/${r.shortcode}`} target="_blank" rel="noreferrer">
                  {window.location.origin}/{r.shortcode}
                </a>
              </Typography>
              <Typography color="text.secondary">
                Valid Until: {new Date(r.expiresAt).toLocaleString()}
              </Typography>
            </Paper>
          ))}
        </Box>
      )}
    </Box>
  );
}
