const fetch = require("node-fetch");
const Push = require( 'pushover-notifications' )



const getData = async () => {
  try {


	const response = await fetch("https://fp.trafikverket.se/boka/occasion-bundles", {
  "headers": {
    "accept": "application/json, text/javascript, */*; q=0.01",
    "accept-language": "sv,en-US;q=0.9,en;q=0.8",
    "cache-control": "no-cache",
    "content-type": "application/json",
    "pragma": "no-cache",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-requested-with": "XMLHttpRequest",
    //"cookie": "ASP.NET_SessionId=ohscgppj3s2x41rwo2tkqfwc; _ga=GA1.2.1667548302.1592931898; _gid=GA1.2.831151847.1610392250; forarprov-ext=ffffffff0914194145525d5f4f58455e445a4a423660; LoginValid=2021-01-12 20:04; FpsExternalIdentity=34FAA67B97B521DB156654400EBBB987B1C56C5C03AC73073A0A54646E67B0B507F491B411CEA5A585E4B001A8B4FE8038043ABB69ABA3D8940C3CCA17E97B1C3CC30E8F85825A9EAAD27C53A759BDB3CA5002C83A361ADBF8A9CEB43DC8DC2CBF780223A51D05AA33660B4AB6A81BFF2D6B8F35A65A596928D763C05F7EE3E7EB465073FFDB0F2B14CDA9745D236D27F3FC7800EDBF8FFFAB32ADA1F0FF698F85159B81C0E11B56DD3B57E17E819E89EAEDDA817C0BA796E70C89CFD5D3F5DC3426FD65A11182F871EBA8C23DC80F1AE6A0F20D60EDA2DD2D52AC1528351CDC2A688436EA9648346E8D2F11186A3520E36DCA5F37DD67EE3B769FF6A6E241F44868B7D172ABD40191FFBF653E24016A478CD113854FD5D56E16EA7E7001C0CB55FD77063C36A7E72593646BE6431725888DCC546020F429261939653D9603EC953FB75886EB89FC60B74D6C04E2A9C0BFB180F7E163701D08F9DA2267CD9B9511250F9A5694B20E03E33E514782BA310EA06DC33A19DF0AE0B18821E2C52C87295B3CCB806EE4AE1C15CEE1729B99EEB88B0F15C3689131509D257102ADCC848C477B00AB12D4EA6016554A8ED97FBD; _gat=1"
  },
  "referrer": "https://fp.trafikverket.se/boka/",
  "referrerPolicy": "no-referrer-when-downgrade",

  // TODO: Ändra body efter dina inställningar och personnr.
  //	Gör en sökning på transportstyrelsens hemsida. Kolla network och kopiera info från anropet.
  "body": "{\"bookingSession\":{\"socialSecurityNumber\":\"198907211315\",\"licenceId\":5,\"bookingModeId\":0,\"ignoreDebt\":false,\"ignoreBookingHindrance\":false,\"examinationTypeId\":0,\"excludeExaminationCategories\":[],\"rescheduleTypeId\":0,\"paymentIsActive\":false,\"paymentReference\":null,\"paymentUrl\":null},\"occasionBundleQuery\":{\"startDate\":\"2021-01-11T23:00:00.000Z\",\"locationId\":1000134,\"nearbyLocationIds\":[1000326,1000132],\"vehicleTypeId\":4,\"tachographTypeId\":1,\"occasionChoiceId\":1,\"examinationTypeId\":12}}",

  "method": "POST",
  "mode": "cors"
});




	const json = await response.json();

	// TODO: Ändra start & slut datum den ska notifiera för.
  const wantedAfterDate = new Date("2021-02-20");
  const wantedBeforeDate = new Date("2021-02-27");

	const firstDate = json.data[0].occasions[0].date;

	const foundLesson = json.data.find( item => {
		const foundDate = new Date(item.occasions[0].date);
		return foundDate > wantedAfterDate && foundDate < wantedBeforeDate;
	} );


    if( foundLesson ){
		const foundDate = foundLesson.occasions[0].date;

    	console.log("found: ", foundDate);

  	// TODO: Lägg in dina pushover.net tokens här.
		var p = new Push( {
		  user: "ucg6vnsaztqq5wxne2mm6dqmqq5ud6",
		  token: "amnc77ut3nkahqeto83ztewne7d678",
		})


		var msg = {
		  // These values correspond to the parameters detailed on https://pushover.net/api
		  message: `${foundDate}`,	// required
		  device: 'iphone',
		}

		p.send( msg, function( err, result ) {
		  if ( err ) {
		    throw err
		  }

		  console.log( result )
		});

    } else {
    	console.log("not found: ", firstDate);
    }


  } catch (error) {
    console.log(error);
  }
};

getData();
