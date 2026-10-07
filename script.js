//your JS code here. If required.
// Helper: set cookie
function setCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + (days*24*60*60*1000));
  const expires = "expires=" + d.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// Helper: get cookie
function getCookie(name) {
  const cname = name + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for(let c of ca) {
    c = c.trim();
    if (c.indexOf(cname) === 0) {
      return c.substring(cname.length, c.length);
    }
  }
  return "";
}

// Apply preferences from cookies
function applyPreferences() {
  const size = getCookie("fontsize");
  const color = getCookie("fontcolor");

  if (size) {
    document.documentElement.style.setProperty("--fontsize", size + "px");
    document.getElementById("fontsize").value = size;
  }
  if (color) {
    document.documentElement.style.setProperty("--fontcolor", color);
    document.getElementById("fontcolor").value = color;
  }
}

// Handle form submission
document.getElementById("font-form").addEventListener("submit", function(e) {
  e.preventDefault();
  const size = document.getElementById("fontsize").value;
  const color = document.getElementById("fontcolor").value;

  // Save cookies
  setCookie("fontsize", size, 7); // expires in 7 days
  setCookie("fontcolor", color, 7);

  // Apply immediately
  applyPreferences();
});

// Initial load
applyPreferences();
