
var val = {
  size: 2, // size of cells
  space: 2, // space between cells
  canvas_x: 1000,
  canvas_y: 600,
  on_x: function(){ return Math.floor(this.canvas_x / (this.size + this.space))}, // number per lines
  on_y: function(){ return Math.floor(this.canvas_y / (this.size + this.space))}, // number per columns
  position: function(i, j){
    return new Point(
      i*(this.size+this.space),
      j*(this.size+this.space)
    )
  },
}

view.viewSize =  new Size(val.canvas_x, val.canvas_y);

// what a cell looks like
var cel = new Path.Rectangle(new Point(0, 0), new Size(val.size, val.size));
cel.fillColor = '#000';
cel.visible = false;

var list_cel = null;
var invert_state = [];
//init all cell to dead
init_cell();
function init_cell(){
  list_cel = new Array(val.on_x());
  for (var i = 0; i < list_cel.length; i++) {
    list_cel[i] = new Array(val.on_y());
    for (var j = 0; j < list_cel.length; j++) {
      list_cel[i][j] = new Cell(false);
      list_cel[i][j].set_position(i, j);
    }
  }
}

function Cell(alive){
  this.alive = alive; // bool
  this.path = cel.clone();
  this.set_position = function(i, j){
    this.path.position = val.position(i,j);
  };
}

function create_glider(start_point){
  //   .
  // . .
  //  ..
  var path = [];
  path.push(new Point(0, 0));
  path.push(new Point(0, 1));
  path.push(new Point(0, 2));
  path.push(new Point(-1, 2));
  path.push(new Point(-2, 1));
  make_alive_celle_from_path(start_point, path);
}

function create_oscillo(start_point){
  // ...
  var path = [];
  path.push(new Point(0, 0));
  path.push(new Point(1, 0));
  path.push(new Point(2, 0));
  make_alive_celle_from_path(start_point, path);
}

function create_acorn(start_point){
  // .
  //   .
  //..  ...
  var path = [];
  path.push(new Point(0, 0));
  path.push(new Point(1, 0));
  path.push(new Point(1, -2));
  path.push(new Point(3, -1));
  path.push(new Point(4, 0));
  path.push(new Point(5, 0));
  path.push(new Point(6, 0));
  make_alive_celle_from_path(start_point, path);
}

function make_alive_celle_from_path(start_point, path){
  for(var i=0; i < path.length; i++){
    invert_state.push(
      list_cel[start_point.x+path[i].x][start_point.y+path[i].y]
    );
  }
}

create_glider(new Point(10, 25));
create_acorn(new Point(10, 10));
//create_oscillo(new Point(30, 30));
create_oscillo(new Point(val.on_x()-5, val.on_y()-5));
toggle_cells();

function onFrame(event) {
  update_cells();
  toggle_cells();
  display_fps.content = (1/event.delta) + " fps";
}

function toggle_cells(){
  while(a=invert_state.pop()){
    a.alive = !a.alive;
    a.path.visible = a.alive;
  }
}

function update_cells(){
  for (var i = 0; i < list_cel.length; i++) {
    for (var j = 0; j < list_cel.length; j++) {
      if(need_toggle_state(i, j)){
        invert_state.push(list_cel[i][j]);
      }
    }
  }
}

function need_toggle_state(i , j){
  if(list_cel[i][j].alive){
    return need_toggle_alive(i, j);
  }else{
    return need_toggle_dead(i, j);
  }
}

function need_toggle_alive(i, j){
  var count = count_exist_and_alive(i, j);

  //Any live cell with fewer than two live neighbours dies, as if caused by under-population.
  //Any live cell with more than three live neighbours dies, as if by overcrowding.
  if(count < 2 || count > 3){
    return true;
  }else{
    return false;
  }
}

function need_toggle_dead(i, j){
  var count = 0;
  count = count_exist_and_alive(i, j);

  //Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
  if(count == 3){
    return true;
  }else{
    return false;
  }
}

function count_exist_and_alive(i, j){
  // NW N NE
  // W  .  E
  // SW S SE

  var count = 0;
  // top
  count += exist_and_alive(i - 1, j - 1) ;
  count += exist_and_alive(i,     j - 1) ;
  count += exist_and_alive(i + 1, j - 1) ;

  // mid
  count += exist_and_alive(i - 1, j) ;
  count += exist_and_alive(i + 1, j) ;

  //bottom
  count += exist_and_alive(i - 1, j + 1)   ;
  count += exist_and_alive(i,     j + 1) ;
  count += exist_and_alive(i + 1, j + 1) ;
  return count;
}

function exist_and_alive(i, j){
  if(i >= 0 && i < val.on_x() &&
     j >= 0 && j < val.on_y() &&
       list_cel[i][j].alive){
    return 1;
  }else{
    return 0;
  }
}

//function onMouseUp(event) {
//var a = cel.clone();
//a.position = new Point(event.point);
//a.visible = true;
//project.activeLayer.addChild(a);
//}

// print background
//display_background(); //It slow DOWN A LOT the FPS
function display_background(){
  var background_cel = cel.clone();
  background_cel.fillColor = '#fafafa';
  background_cel.visible = true;

  var background_cel_symbol = new Symbol(background_cel);
  for (var i = 0; i < val.on_x(); i++){
    for (var j = 0; j < val.on_y(); j++){
      background_cel_symbol.place(val.position(i, j));
    }
  }
}

var display_fps = new PointText(new Point(view.size.width - 80, 30));
display_fps.fillColor = 'black';
display_fps.content   = '25 fps';
display_fps.fontSize  = 25;
