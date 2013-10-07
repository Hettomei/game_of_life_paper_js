$( document ).ready(function() {
  $('body').append('<p>Dom loaded</p>');

  var c = document.getElementById("mon_canvas");
  var ctx = c.getContext("2d");

  ctx.beginPath();      // Début du chemin
  ctx.moveTo(50,50);    // Le tracé part du point 50,50
  ctx.lineTo(200,200);  // Un segment est ajouté vers 200,200
  ctx.lineTo(100,200);  // Un segment est ajouté vers 200,200
  ctx.lineTo(100,100);  // Un segment est ajouté vers 200,200
  ctx.closePath();      // Fermeture du chemin (facultative)

  ctx.lineWidth = 5;
  ctx.stroke();
});
