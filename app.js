document.addEventListener("contextmenu", (event) => event.preventDefault());
document.onkeydown = function (e) {
  if (
    e.keyCode == 16 ||
    e.keyCode == 17 ||
    e.keyCode == 18 ||
    e.keyCode == 123 ||
    (e.ctrlKey && e.shiftKey && e.keyCode == 73) ||
    (e.ctrlKey && e.shiftKey && e.keyCode == 74) ||
    (e.ctrlKey && e.shiftKey && e.keyCode == 67) ||
    (e.ctrlKey && e.keyCode == 85)
  ) {
    return false;
  }
};
// Letiltjuk a billentyűzet eseményeit
document.onkeydown = function (event) {
  event.preventDefault(); // Esemény letiltása
  return false; // Esemény megállítása
};
// Ellenőrizzük, hogy a felhasználó a fejlesztői konzolban van-e
window.onload = function () {
  console.log(
    Object.defineProperties(new Error(), {
      toString: {
        value() {
          // Ellenőrizzük, hogy a stack trace tartalmazza-e a "toString@" szöveget
          // Ez a rész a fejlesztői konzolban jelentkezik általában
          new Error().stack.includes("toString@") && alert("Safari devtools");
        },
      },
      message: {
        get() {
          // Ha a felhasználó a konzolban van, azonnal lépjen ki
          window.location.href = "/setup/bypass.html";
        },
      },
    })
  );
};
document.addEventListener("contextmenu", (event) => event.preventDefault());
document.onkeydown = function (e) {
  if (
    e.keyCode == 16 ||
    e.keyCode == 17 ||
    e.keyCode == 18 ||
    e.keyCode == 123 ||
    (e.ctrlKey && e.shiftKey && e.keyCode == 73) ||
    (e.ctrlKey && e.shiftKey && e.keyCode == 74) ||
    (e.ctrlKey && e.shiftKey && e.keyCode == 67) ||
    (e.ctrlKey && e.keyCode == 85)
  ) {
    return false;
  }
};

// Ellenőrizzük, hogy a felhasználó a fejlesztői konzolban van-e
window.onload = function () {
  console.log(
    Object.defineProperties(new Error(), {
      toString: {
        value() {
          // Ellenőrizzük, hogy a stack trace tartalmazza-e a "toString@" szöveget
          // Ez a rész a fejlesztői konzolban jelentkezik általában
          new Error().stack.includes("toString@") && alert("Safari devtools");
        },
      },
      message: {
        get() {
          // Ha a felhasználó a konzolban van, azonnal lépjen ki
          window.location.href = "/setup/bypass.html";
        },
      },
    })
  );
};
