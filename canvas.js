view.viewSize =  new Size(700, 600);

var val = {
  size: 10, // size of cells
  space: 2, // space between cells
  on_x: 54, // number per lines
  on_y: 46, // number per columns
  margin_left: function(){ return this.size / 2 },
  margin_top: function(){ return this.size / 2 },
  position: function(i, j){
    return new Point(
      i*(this.size+this.space)+this.margin_left(),
      j*(this.size+this.space)+this.margin_top()
    )
  },
}

// what a cell looks like
var cel = new Path.Rectangle(new Point(0, 0), new Size(val.size, val.size));
cel.fillColor = '#000';
cel.visible = false;

var list_cel = null;
var changed_cel = [];
//init all dead cell
init_cell();
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

function Cell(alive){
  this.alive = alive; // bool
  this.path = cel.clone();
  this.set_position = function(i, j){
    this.path.position = val.position(i,j);
  };
}

//add some alive cell:
list_cel[20][20].alive = true;
list_cel[22][20].alive = true;
list_cel[21][21].alive = true;
list_cel[22][21].alive = true;
list_cel[21][22].alive = true;


list_cel[30][30].alive = true;
list_cel[30][31].alive = true;
list_cel[30][32].alive = true;
changed_cel.push(list_cel[20][20]);
changed_cel.push(list_cel[22][20]);
changed_cel.push(list_cel[21][21]);
changed_cel.push(list_cel[22][21]);
changed_cel.push(list_cel[21][22]);


changed_cel.push(list_cel[30][30]);
changed_cel.push(list_cel[30][31]);
changed_cel.push(list_cel[30][32]);
display_only_updated();


function onFrame(event) {
  update_cells();
  display_only_updated();
  display_fps.content = (1/event.delta) + " fps";
}

function display_only_updated(){
  while((a=changed_cel.pop()) != null){
    //debugger;
    a.path.visible = a.alive;
  }
}

function update_cells(){
  for (var i = 0; i < list_cel.length; i++) {
    for (var j = 0; j < list_cel.length; j++) {
      if(need_toggle_state(i, j)){
        list_cel[i][j].alive = !list_cel[i][j].alive;
        changed_cel.push(list_cel[i][j]);
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
  if(i >= 0 && i < val.on_x &&
     j >= 0 && j < val.on_y &&
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

//// print background
////display_background(); //It slow DOWN A LOT the FPS
//function display_background(){
//var background_cel = cel.clone();
//background_cel.fillColor = '#fafafa';
//background_cel.visible = true;

//var background_cel_symbol = new Symbol(background_cel);
//for (var i = 0; i < val.on_x; i++){
//for (var j = 0; j < val.on_y; j++){
//background_cel_symbol.place(val.position(i, j));
//}
//}
//}

var display_fps = new PointText(new Point(view.size.width - 80, 30));
display_fps.fillColor = 'black';
display_fps.content   = '25 fps';
display_fps.fontSize  = 25;
