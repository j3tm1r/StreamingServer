//var fs = require('fs');
var base64 = require('btoa')


//constant values
const VERBOSE = true
//const FILENAME = 'stream'


function parseJSON(str){
	var obj;
	try{
		obj = JSON.parse(str);
	}
	catch(e){
		console.log('syntax error: '+str);
		return null;
	}
	return obj;
}







//var fd = fs.openSync(FILENAME, 'rs+');
//if (VERBOSE) console.log('opened file "'+FILENAME+'"');

/**
	* Represents actual configuration
	*/
var configuration = {
	fps: 20,
	encodeBps: 500000,		//encoder bitrate (default=500Kpbs)
	width: 320,
	height: 240,
	configArray: '',		//SPS-PPS array for H.264 stream configuration
};

function config(json){
	if (json.hasOwnProperty('data')){
		configuration.configArray = json.data
	}

	if (VERBOSE) console.log('configured: '+configuration.configArray);
}

function getConfig(){
	var obj = {
		type: 'config',
		fps: configuration.fps,
		configArray: configuration.configArray,
		encodeBps: configuration.encodeBps,
		width: configuration.width,
		height: configuration.height
	}
	return obj;
}

function getResetPacket(w, h, bps, fps){
	var obj = {
		type: 'reset',
		width: w,
		height: h,
		encodeRate: bps,
		frameRate: fps
	}
	return obj;
}

/*frame is a json containing data, flags, timestamp
function pushData(chunk){
	var buff = chunk.data;
	fs.appendFile(FILENAME, buff, function(err){
		if (err){
			if (VERBOSE) console.log('Error writing file');
			return;
		}
		//if (VERBOSE) console.log('correctly wrote '+buff.length+' bytes');
		var entry = {
			offset: offset,
			len: buff.length,
			flags: chunk.flags,
			ts: chunk.ts
		};
		streamDataIndex = streamData.push(entry) -1;
		//if (VERBOSE) console.log(entry);
		offset += buff.length;
		//console.log('offset= '+offset);
	});
}
*/


/*
function getData(webSocket){
	console.log("idx="+streamDataIndex)
	var entry = streamData[streamDataIndex++]
	var totSize = entry.len;
	var bufferOffset = 0;
	var buffer = new Buffer(totSize)
	var readCallback = function(err, bytesRead, buffer) {
		if (err){
			if (VERBOSE) console.log('Error reading file '+FILENAME+': '+err);
			return;
		}
        if (VERBOSE) console.log(buffer.toString('utf-8', 0, bytesRead));
        bufferOffset += bytesRead;
        if (bufferOffset == totSize){
        	var obj = {
				data: buffer.toString('utf8'),
				flags: entry.flags,
				ts: entry.ts
			}
			webSocket.sendUTF(JSON.stringify(obj))
        	return;
        }
        else{
        	console.log("aaaaa "+bufferOffset);
        }
    }
    //fs.read(fd, buffer, bufferOffset, totSize, entry.offset, readCallback)

    while (bufferOffset < totSize){
    	bufferOffset += fs.readSync(fd, buffer, bufferOffset, totSize, null, null);
    }
    if (VERBOSE) console.log('Read '+bufferOffset+'bytes from file: '+buffer);

	var obj = {
		data: buffer,
		flags: entry.flags,
		ts: entry.ts
	}
	return obj

}
*/

function logJSON(json){
	try{
		JSON.parse(json);
	}
	catch(e){
		console.log('syntax error: '+json);
		return e;
	}
	console.log('json parse OK: '+json);
	return null;
}




//module exportation
module.exports = {
	config: config,
	getConfig: getConfig
}
