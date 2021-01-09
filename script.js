let origSentArr;
let newSentArr;
let arrLength;

async function buttonClick() {
	const origSentence = document.getElementById("inputField").value;
	origSentArr = origSentence.split(" ");
	arrLength = origSentArr.length;
	newSentArr = new Array(arrLength);

	//replaces old words with synonyms
	for(var i = 0; i < arrLength; i++) {
		const origWord = origSentArr[i];
		let newWord;
		try {
			newWord = await getSynonym(origWord);
		} catch(err) {
			newWord = origWord;
		}
		newSentArr.splice(i, 1, newWord);
	}
	printArr(newSentArr);

}


async function getSynonym(word) {
	const url = 
	"https://www.dictionaryapi.com/api/v3/references/thesaurus/json/" + 
	word + "?key=a096286e-319e-4eaa-93b5-0d68fdeac54a";
	const response = await fetch(url);
	const data = await response.json();
	const synArrays = data[0].meta.syns;

	const row = Math.floor(Math.random() * synArrays.length);
	const col = Math.floor(Math.random() * synArrays[row].length);

	const syn = data[0].meta.syns[row][col];

	return syn;
}

function printArr(arr) {
	let newSent = "";
	for(var i = 0; i < arrLength; i++) {
		newSent += arr[i] + " ";
	}
	document.getElementById("moreInstructions").innerHTML = "";
	document.getElementById("moreInstructions").style.paddingTop = 0;
	document.getElementById("charName").innerHTML = newSent;
}

const sampleNames = 
	["goblin slayer",
	"dragon slayer",
	"merciless villain",
	"fairy lord",
	"fairy hunter",
	"dancing nymph",
	"sparkling good witch",
	"girl boss",
	"damsel in distress",
	"morally righteous hacker",
	"scheming royalty",
	"supernatural priest",
	"black panther",
	"pink panther",
	"wistful old man",
	"cosmic sailor",
	"cackling wench",
	"melancholy silhouette", 
	"Lonely Viper"];

function randSampleName() {
	const index = Math.floor(Math.random() * sampleNames.length);
	return sampleNames[index];
}