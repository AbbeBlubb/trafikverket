const fetch = require("node-fetch");
const Push = require("pushover-notifications");
const secrets = require("./secrets");

// TODO: Ändra body efter dina inställningar och personnr.
//	Gör en sökning på transportstyrelsens hemsida. Kolla network och kopiera info från anropet. Escapa nödvändiga citattecken
const request = {
  "Referrer Policy": "strict-origin-when-cross-origin",
  "method": "POST", // Has to be POST, else no body can be attached
  "headers": {
    "accept": "application/json, text/javascript, */*; q=0.01",
    "Accept-Encoding": "gzip, deflate, br",
    "accept-language": "sv,sv-SE;q=0.9,en-SE;q=0.8,en;q=0.7,es-ES;q=0.6,es;q=0.5,en-US;q=0.4,fr;q=0.3",
    "cache-control": "no-cache",
    "connection": "keep-alive",
    "Content-Length": "512",
    "content-type": "application/json",
    "cookie": secrets.requestHeaderCookiesFromMadeSearach,
    "DNT": "1",
    "Host": "fp.trafikverket.se",
    "Origin": "https://fp.trafikverket.se",
    "Referer": "https://fp.trafikverket.se/Boka/",
    "sec-ch-ua": " Not A;Brand\";v=\"99\", \"Chromium\";v=\"101\", \"Google Chrome\";v=\"101\"",
    "sec-ch-ua-mobile": "?1",
    "sec-ch-ua-platform": "Android",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.67 Mobile Safari/537.36",
    "X-Requested-With": "XMLHttpRequest",
  },
  "body": JSON.stringify(secrets.requestBodyFromMadeSearch),
}

const getData = async () => {
  try {
    const response = await fetch("https://fp.trafikverket.se/Boka/occasion-bundles", request);
    const responseObject = await response.json();
    const wantedAfterDate = new Date(secrets.findSlotAfterDate);
    const wantedBeforeDate = new Date(secrets.findSlotBeforeDate);
    // If contract changes, uncomment the response log below and run this script with 'node trafikverket.js > output.txt' so you can look at the data structure
    // console.log("Res: ", JSON.stringify(responseObject.data.bundles[0], null, 4));
    const firstDate = responseObject.data.bundles[0].occasions[0].date;

    const foundLessonObject = responseObject.data.bundles.find(item => {
      const foundDate = new Date(item.occasions[0].date);
      return foundDate > wantedAfterDate && foundDate < wantedBeforeDate;
    });

    if (foundLessonObject) {
      //console.log("The found lesson object: ", foundLessonObject)
      const foundDate = foundLessonObject.occasions[0].date;
      console.log("Exam slot found. Date", foundDate);

      var push = new Push({
        user: secrets.pushOverUserKey,
        token: secrets.pushOverApplicationToken,
      })

      var message = {
        // These values correspond to the parameters detailed on https://pushover.net/api
        message: `Exam slot found at ${foundDate}!`,	// required
      }

      push.send(message, function (err, result) {
        if (err) {
          throw err
        }

        console.log("The result of the Pushover notification: ", result)
      });

    } else {
      // If no slot found
      console.log("Exam slot not found. First available date is", firstDate);
    }

  } catch (error) {
    console.log("Error thrown: ", error);
  }
};

// watch -n 10 node trafikverket.js
getData();
