function demo(g) {



var spacing = 0;
var dim		= 17;

var grid_width 	= Math.floor(g.width/dim)+1;
var grid_height = Math.floor(g.height/dim)+1;

var grid_bcolor = "rgba(0,0,0,0.1)";
//var grid_ccolor = "rgba(255,0,0,0.1)";

// CREATE
var grid = new Array(grid_width);


for (var j = 0; j<grid_width; j++){
grid[j] = new Array(grid_height);
};


// init
for (var j = 0; j<grid_width; 	j++){
for (var i = 0; i<grid_height; 	i++){

grid[j][i] = 0;

}
}

// borders
for (var j = 0; j<grid_width; j++)
grid[j][0] = "borders";

for (var j = 0; j<grid_height; j++)
grid[0][j] = "borders";

for (var j = 0; j<grid_width; j++)
grid[j][grid_height-1] = "borders";

for (var j = 0; j<grid_height; j++)
grid[grid_width-1][j] = "borders";



console.log(grid)

var timer = 0;

g.draw = function() {
timer++;

var j = Math.floor((g.mouseX / (dim+spacing)));
var i = Math.floor(g.mouseY / (dim+spacing));

if (grid[j][i] != "borders" && i < grid_height-1 && j < grid_width-1)
grid[j][i] = 1;

//drawGrid(grid);

if (timer % 5 === 0)
grid = stepGrid(grid);

drawGrid(grid);


};




g.keydown = function() {

}

function stepGrid(ggrd) {

var newggrd = ggrd.clone();


for (var j = 1; j<grid_width-1; j++){
for (var i = 1; i<grid_height-1; i++){

// count cell neighbors
var n = 0;

if (ggrd[j-1][i] && ggrd[j-1][i] != "borders")
n++;
if (ggrd[j+1][i] && ggrd[j+1][i] != "borders")
n++;
if (ggrd[j][i+1] && ggrd[j][i+1] != "borders")
n++;
if (ggrd[j][i-1] && ggrd[j][i-1] != "borders")
n++;
if (ggrd[j-1][i-1] && ggrd[j-1][i-1] != "borders")
n++;
if (ggrd[j+1][i+1] && ggrd[j+1][i+1] != "borders")
n++;
if (ggrd[j-1][i+1] && ggrd[j-1][i+1] != "borders")
n++;
if (ggrd[j+1][i-1] && ggrd[j+1][i-1] != "borders")
n++;


if (ggrd[j][i]){
// perform if cell is alive
if 		(n == 1 || n == 0)
newggrd[j][i] = 0;
else if	(n >= 4)
newggrd[j][i] = 0;
else if	(n == 2 || n == 3)
newggrd[j][i] = 1;

} else {

// perform if cell is death
if (n == 3)
newggrd[j][i] = 1;

} // if(I/0)
} // for ggrd[]
} // for ggrd[][]


return newggrd

}; // step(ggrd);


function drawGrid(grid) {
//g.ctx.clearRect(0,0,g.width,g.height);

for (var j = 0; j<grid_width; j++){

for (i in grid[j]) {
if (grid[j][i] != "borders" && grid[j][i])
g.ctx.fillStyle = "rgba(" + random(0,255) + "," + random(0,255) + "," + random(0,255) + ",0.1" + ")";
else
g.ctx.fillStyle = grid_bcolor;

g.ctx.fillRect(j*dim, i*dim, dim-spacing, dim-spacing);

}
}

}; // drawGrid(grid)


Object.prototype.clone = function() {
  var newObj = (this instanceof Array) ? [] : {};
  for (i in this) {
    if (i == 'clone') continue;
    if (this[i] && typeof this[i] == "object") {
      newObj[i] = this[i].clone();
    } else newObj[i] = this[i]
  } return newObj;
};
	


function random(min,max){
return Math.round((Math.random() * (max - min)) + min);
};


}
