var val = new Val();
val.init_number_cells(); // because I don't know how to directly set these val
view.viewSize =  new Size(val.canvas_x, val.canvas_y);

//what a cell looks like
var cel = new Path.Rectangle(new Point(0, 0), new Size(val.size, val.size));
cel.fillColor = '#000';
cel.visible = false;

var list_cel = null;
var invert_state = [];
//init all cell to dead
init_cell();

var display_fps = new PointText(new Point(view.size.width - 80, 30));
display_fps.fillColor = 'black';
display_fps.fontSize  = 25;

create_glider(new Point(10, 25));
create_acorn(new Point(10, 10));
create_oscillo(new Point(0, 0));
create_oscillo(new Point(val.on_x-5, val.on_y-5));
toggle_cells();

function Val(){
  this.canvas_x = 1000;
  this.canvas_y = 600;

  this.size = 10; // size of cells
  this.space = 2; // space between cells

  this.on_x = 0; // number per lines
  this.on_y = 0; // number per columns

  //because I don't know how to save this value on object constructor
  this.init_number_cells = function(){
    this.on_x = Math.floor(this.canvas_x / (this.size + this.space));
    this.on_y = Math.floor(this.canvas_y / (this.size + this.space));
  };

  this.position = function(i, j){
    return new Point(
      i*(this.size+this.space),
      j*(this.size+this.space)
    );
  };
}

function Cell(alive){
  this.alive = alive; // bool
  this.path = cel.clone();
  this.set_position = function(i, j){
    this.path.position = val.position(i,j);
  };
}

function init_cell(){
  list_cel = new Array(val.on_x);
  for (var i = 0; i < list_cel.length; i++) {
    list_cel[i] = new Array(val.on_y);
    for (var j = 0; j < list_cel.length; j++) {
      list_cel[i][j] = new Cell(false);
      list_cel[i][j].set_position(i, j);
    }
  }
}

function onFrame(event) {
  update_cells();
  toggle_cells();
  display_fps.content = (1/event.delta) + " fps";
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

function toggle_cells(){
  while(a=invert_state.pop()){
    a.alive = !a.alive;
    a.path.visible = a.alive;
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
  var count = count_exist_and_alive(i, j);

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
  if(i >= 0 && i < val.on_x &&
     j >= 0 && j < val.on_y &&
       list_cel[i][j].alive){
    return 1;
  }else{
    return 0;
  }
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
  var path = [
    new Point(0,  0),
    new Point(1,  0),
    new Point(1, -2),
    new Point(3, -1),
    new Point(4,  0),
    new Point(5,  0),
    new Point(6,  0)
  ];
  make_alive_celle_from_path(start_point, path);
}

function make_alive_celle_from_path(start_point, path){
  for(var i=0; i < path.length; i++){
    invert_state.push(
      list_cel[start_point.x+path[i].x][start_point.y+path[i].y]
    );
  }
}

// print background
// display_background(); //It slow DOWN A LOT the FPS
// need to do another way
function display_background(){
  var background_cel = cel.clone();
  background_cel.fillColor = '#fafafa';
  background_cel.visible = true;

  var background_cel_symbol = new Symbol(background_cel);
  for (var i = 0; i < val.on_x; i++){
    for (var j = 0; j < val.on_y; j++){
      background_cel_symbol.place(val.position(i, j));
    }
  }
}
