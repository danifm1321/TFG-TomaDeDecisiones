var index = 0;
var arrayLetras = ['s', 'r', 'n', 'd', 'l', 'c', 't', 'm'];
var arraySoluciones = ['', '', '']
var experimento_empezado = false;


$(document).ready(function ()
{
    var cnt_p = 0;
    var cnt_q = 0;
    
    $(document).keypress(function(event){
        if(event.which == 32 && !experimento_empezado)
        {
            event.preventDefault();
            comienza_experimento();
        }
        else if(event.which == 113 && experimento_empezado)
        {
            cnt_q++;
            muestra_soluciones();

        }
        else if(event.which == 112 && experimento_empezado)
        {
            cnt_p++;
            muestra_soluciones();
        }
    });

    $( "#btn-comenzar-experimento" ).click(function() {
        comienza_experimento();
      });

    $('.enlace-imagen').on('click', function(e) {
        e.preventDefault();
    });


})

function comienza_experimento()
{
    experimento_empezado = true;
    $("#btn-comenzar-experimento").addClass("d-none");
    $("#letra-experimento").removeClass("d-none");
    change_image();
}

function change_image()
{
    if(index == arrayLetras.length)
    {
        shuffle(arrayLetras);
        index = 0;
    }

    $("#letra-experimento").attr("src", "images/letra-" + arrayLetras[index] + ".png");
    index++;
}

function shuffle(array)
{
    array.sort(function() { return 0.5 - Math.random() });
}

function muestra_soluciones()
{
    $("#letra-experimento").addClass("d-none");
    $("#wrapper-4-imagenes").removeClass("d-none");

}