/********************************************************
 *  NFC Example
 * 
 * *****************************************************/

function appInit(){
	nfc.enabled( ()=>{ appendMessage( "** NFC **IS** available!" ); }, 
				 ()=>{ appendMessage( " x sorry no NFC" ); } );
	
	nfc.addNdefListener(
		(nfcEvent)=>{ tagDecode(nfcEvent.tag); },
		()=>{ appendMessage( "* addNdefListener listening OK!!" ); },
		()=>{ appendMessage( "x NFC NDEF bind failure!" ); }
	);
	var platform = device.platform.toLowerCase();

	// allow other listening to happen, ex. non
	if (platform == "android" ) {

		// Android reads non-NDEF tag. BlackBerry and Windows don't.
		nfc.addTagDiscoveredListener(
			(nfcEvent)=>{ appendMessage( "* addTagDiscoveredListener->tagDetect: "+JSON.stringify(nfcEvent) ); },
			()=>{ appendMessage( "* addTagDiscoveredListener listening OK!!" ); },
			()=>{ appendMessage( "x addTagDiscoveredListener bind failure!" ); }
		);

		// Android launches the app when tags with mime type text/pg are scanned
		// because of an intent in AndroidManifest.xml.
		// phonegap-nfc fires an ndef-mime event (as opposed to an ndef event)
		// the code reuses the same onNfc handler
		nfc.addMimeTypeListener(
			'text/pg',
			(nfcEvent)=>{ appendMessage( "* addMimeTypeListener->tagDetect: "+JSON.stringify(nfcEvent) ); },
			()=>{ appendMessage( "* addMimeTypeListener listening OK!!" ); },
			()=>{ appendMessage( "x addMimeTypeListener bind failure!" ); }
		);
	}

	// show settings to toggle NFC
	//nfc.showSettings(success, failure);



	//notifyNFC();
}
function appendMessage( msg ){
	$("#message").html( $("#message").html()+"<br> "+msg );
	console.log( msg );
}

function tagDecode( tag ){
	let tagSerial = '';
	let tagText = '';
	let tagScan = '';
	let zeropad = '0';
	appendMessage( "* addNdefListener->tagDetect: "+JSON.stringify(tag) );
	if( tag.id && tag.id.length>0 ){
		tagSerial = nfc.bytesToHexString(tag.id);
	} 
	console.log( ' payload NDEF: ', tag.ndefMessage );
	if( tag.ndefMessage && tag.ndefMessage[0] && tag.ndefMessage[0].payload ){
		let payload = tag.ndefMessage[0].payload;
		console.log( " ... payload: ", payload );
		for( let i=1; i<payload.length; i++ ){
			//if( tag.ndefMessage.payload[i]>20 && tag.ndefMessage.payload[i]<100 )
				//tagText += String.fromCharCode( tag.ndefMessage[0].payload[i] );
			if(  payload[i]>20 )
				tagText += String.fromCharCode( payload[i] );
			tagScan += payload[i]+':'+( payload[i]>20 ? String.fromCharCode( payload[i] ) : '_' )+',';
		}
	}
	console.log( tagScan );
	appendMessage( " tagSerial ("+tagSerial+") and tagText("+tagText+")" );
}

function notifyNFC(){
	nfc.beginSession(
		()=>{ appendMessage( "* beginSession OK!!" ); },
		()=>{ appendMessage( "x beginSession failure!" ); } );
}
function nfcWrite(){
	let message = [
		ndef.uriRecord("http://google.com/?q=test123")
	];
	
	nfc.write(message, 
		()=>{ appendMessage( "* nfcWrite OK!!" ); },
		()=>{ appendMessage( "x nfcWrite failure!" ); } );
}
document.addEventListener("deviceready", appInit, false);
