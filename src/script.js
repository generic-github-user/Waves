//Gradual indicators/transitions
//Number-only fields
//Information panel
//Spread waves
//Fix offsets ***
//Resolution recalculation

canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");
ctx.canvas.width  = window.innerWidth - 25;
ctx.canvas.height = window.innerHeight - 25;

var resolution = 1000;
var cellSize = Math.round(canvas.height/resolution);
var waveData = [];
var combinedWave = [];
for(i=0;i<resolution;i++){
	combinedWave.push(0);
}

function addWave(){
	waveData.push([]);
	var wavelength = document.getElementById("wavelength").value;
	var amplitude = document.getElementById("amplitude").value;
	var offset = document.getElementById("offset").value;
	
	for(i=0;i<resolution;i++){
		waveData[waveData.length-1].push(Math.sin((i-offset)/wavelength)*amplitude);
	}
}

function update(){
	ctx.canvas.width = window.innerWidth - 25;
	ctx.canvas.height = window.innerHeight - 25;
	
	//resolution = document.getElementById("resolution").value;
	
	combinedWave = [];
	for(i=0;i<resolution;i++){
		combinedWave.push(0);
	}
	for(i=0;i<waveData.length;i++){
		for(j=0;j<waveData[i].length;j++){
			combinedWave[j]+=waveData[i][j];
		}
	}
	
	for(i=0;i<waveData.length;i++){
		ctx.fillStyle = "hsla(" + i*24 + ",100%,50%,0.5)";
		for(j=0;j<waveData[i].length;j++){
			ctx.fillRect(j*cellSize,waveData[i][j]+canvas.height/2,cellSize,Math.abs(waveData[i][j]-waveData[i][j+1])+cellSize);
		}
	}
	ctx.fillStyle = "rgba(0,0,0,1)";
	for(i=0;i<combinedWave.length;i++){
		ctx.fillRect(i*cellSize,combinedWave[i]+canvas.height/2,cellSize,Math.abs(combinedWave[i]-combinedWave[i+1])+(cellSize*waveData.length));
	}
	
	
	var wavelengthField = document.getElementById("wavelength");
	//wavelengthField.style.opacity = wavelengthField.value;
	
	var amplitudeField = document.getElementById("amplitude");
	//amplitudeField.style.opacity = amplitudeField.value;

	var offsetField = document.getElementById("offset");
	//offsetField.style.opacity = offsetField.value;

	var resolutionField = document.getElementById("resolution");
	//resolutionField.style.opacity = resolutionField.value;
}

var intervalID = window.setInterval(update,10);