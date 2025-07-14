import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Redirector() {
  const { shortcode } = useParams();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(shortcode));
    if (data) {
      const now = new Date().toISOString();
      if (data.expiresAt > now) {
        data.clicks.push({
          timestamp: now,
          source: document.referrer,
          location: "Unknown",
        });
        localStorage.setItem(shortcode, JSON.stringify(data));
        window.location.href = data.originalUrl;
      } else {
        alert("This link has expired.");
      }
    } else {
      alert("Link not found.");
    }
  }, [shortcode]);

  return null;
}
