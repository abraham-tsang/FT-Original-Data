const fs = require('fs');

var translations = [];
translations.push(fs.readFileSync('sv-en.txt', {encoding: 'utf8'}));
translations.push(fs.readFileSync('ja-en.txt', {encoding: 'utf8'}));
translations.push(fs.readFileSync('pt-en.txt', {encoding: 'utf8'}));
translations.push(fs.readFileSync('ch-en.txt', {encoding: 'utf8'}));

for(var i = 0; i < translations.length; i++){
    translations[i] = translations[i].split(',');
}



var allsounds = fs.readdirSync('.');
var filenames = [[], [], [], []];

for(var i = 0; i < allsounds.length; i++){
    if(allsounds[i].substr(14, 2) == 'sv'){
	filenames[0].push(allsounds[i]);
    }
    else if(allsounds[i].substr(14, 2) == 'ja'){
	filenames[1].push(allsounds[i]);
    }
    else if(allsounds[i].substr(14, 2) == 'pt'){
	filenames[2].push(allsounds[i]);
    }
    else if(allsounds[i].substr(14, 2) == 'zh'){
	filenames[3].push(allsounds[i]);
    }
}



var translationswords = [[], [], [], []];
var filenameswords = [[], [], [], []];

for(var i = 0; i < translations.length; i++){
    for(var j = 0; j < translations[i].length; j++){
        translationswords[i].push(translations[i][j].split(' ')[0]); // get words from translations
    }
}
for(var i = 0; i < translationswords.length; i++){
    translationswords[i].sort();
}

for(var i = 0; i < filenames.length; i++){
    for(var j = 0; j < filenames[i].length; j++){
        filenameswords[i].push(filenames[i][j].substr(17, filenames[i][j].length - (17 + 4))); // get words from filenames
    }
}
for(var i = 0; i < filenameswords.length; i++){
    filenameswords[i].sort();
}



var finalwords = [[], [], [], []];
var translationsi = 0;
var filenamesi = 0;
for(var i = 0; i < 4; i++){
    translationsi = 0;
    filenamesi = 0;
    while(translationsi < translationswords[i].length && filenamesi < filenameswords[i].length){
	if(translationswords[i][translationsi] == filenameswords[i][filenamesi]){
	    finalwords[i].push(translationswords[i][translationsi]);
	    translationsi++;
	    filenamesi++;
	}
	else if(translationswords[i][translationsi] < filenameswords[i][filenamesi]){
	    translationsi++;
	}
	else if(translationswords[i][translationsi] > filenameswords[i][filenamesi]){
	    filenamesi++;
	}
    }
}



var result = [[], [], [], []];
translationsi = 0;
filenamesi = 0;

for(var i = 0; i < 4; i++){
    for(var j = 0; j < finalwords[i].length; j++){
	result[i].push('');
	for(var k = 0; k < translations[i].length; k++){
	    if(translations[i][k].split(' ')[0] == finalwords[i][j]){
		result[i][result[i].length - 1] += '\"';
		result[i][result[i].length - 1] += translations[i][k];
		result[i][result[i].length - 1] += '+';
		break;
	    }
	}
	for(var k = 0; k < filenames[i].length; k++){
	    if(filenames[i][k].substr(17, filenames[i][k].length - (17 + 4)) == finalwords[i][j]){
		result[i][result[i].length - 1] += filenames[i][k];
		result[i][result[i].length - 1] += '\"';
		break;
	    }
	}
    }
}

//console.log(translations);
//console.log(filenames);
//console.log(translationswords);
//console.log(filenameswords);
//console.log(finalwords);
//console.log(result);

fs.writeFileSync('result.txt', '');
fs.appendFileSync('result.txt', result[3]);
