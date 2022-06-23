var index = 0;
var arrayLetras = ['s', 'r', 'n', 'd', 'l', 'c', 't', 'm'];
var arraySoluciones = [];
var experimento_empezado = false;
var tiempos_respuesta = [0, 0, 0, 0]
var necesita_parar = false
var esta_preparado = false


$(document).ready(function ()
{
    var cnt_p = 0;
    var cnt_q = 0;
    
    $(document).keypress(function(event){
        if(event.which == 32 && !experimento_empezado && $('#wrapper-4-imagenes').hasClass('d-none'))            //Pulsa la tecla espacio para comenzar el experimento
        {
            event.preventDefault();
            if(!esta_preparado)
            {
                calibracion();
                setTimeout(finalizar_experimento, 308000);
            }
            else
            {
                comienza_experimento(true);
                setTimeout(finalizar_experimento, 300000);
            }

        }
        else if(event.which == 113 && experimento_empezado && $('#wrapper-4-imagenes').hasClass('d-none'))       //Pulsa la tecla Q
        {
            cnt_q++;
            muestra_soluciones();

        }
        else if(event.which == 112 && experimento_empezado && $('#wrapper-4-imagenes').hasClass('d-none'))       //Pulsa la tecla P
        {
            cnt_p++;
            muestra_soluciones();
        } else if(!$('#wrapper-4-imagenes').hasClass('d-none'))
        {
            if(event.which == 51)                                                       //Pulsa la tecla 3 asociada a #
                registra_tiempo_respuesta(3);
            else
            {
                var indiceLetra = arraySoluciones.indexOf(String.fromCharCode(event.which));
                registra_tiempo_respuesta(indiceLetra);
            }
        }
    });

    $( "#btn-comenzar-experimento" ).click(function() {
        if(!esta_preparado)
        {
            calibracion();
            setTimeout(finalizar_experimento, 308000);
        }
        else
        {
            comienza_experimento(true);
            setTimeout(finalizar_experimento, 300000);
        }
      });

    $('.enlace-imagen').on('click', function(e) {
        e.preventDefault();
    });

    setInterval(change_image, 500);

})

function calibracion()
{
    $.ajax({
        type : "POST",
        url : "experimento",
        data : '{"estado": "preparar"}',
        contentType: 'application/json;charset=UTF-8', 
      });

    $("#btn-comenzar-experimento").addClass("d-none");
    $("#blank-image").removeClass("d-none");

    setTimeout(comienza_experimento, 8000);

    esta_preparado = true
}

function comienza_experimento(registrar_datos = false)
{
    if(registrar_datos)
    {
        $.ajax({
            type : "POST",
            url : "experimento",
            data : '{"estado": "comenzar"}',
            contentType: 'application/json;charset=UTF-8', 
          });
    }

    experimento_empezado = true;
    $("#btn-comenzar-experimento").addClass("d-none");
    $("#blank-image").addClass("d-none");

    $("#letra-experimento").removeClass("d-none");
}



function change_image()
{
    if($('#wrapper-4-imagenes').hasClass('d-none'))
    {
        if(index == arrayLetras.length)
        {
            var ultimaLetra = arrayLetras[arrayLetras.length-1];
            shuffle(arrayLetras);
            while(ultimaLetra == arrayLetras[0])
                shuffle(arrayLetras);

            index = 0;
        }

        $("#letra-experimento").attr("src", "images/letra-" + arrayLetras[index] + ".png");

        arraySoluciones.unshift(arrayLetras[index])
        if(arraySoluciones.length > 3)
            arraySoluciones.pop();

        index++;
    }
}

function shuffle(array)
{
    array.sort(function() { return 0.5 - Math.random() });
}

function muestra_soluciones()
{
    $("#letra-experimento").addClass("d-none");
    $("#wrapper-4-imagenes").removeClass("d-none");

    $("#conjunto-letra-1").attr("src", "images/letra-" + arraySoluciones[0] + ".png");
    $("#conjunto-letra-2").attr("src", "images/letra-" + arraySoluciones[1] + ".png");
    $("#conjunto-letra-3").attr("src", "images/letra-" + arraySoluciones[2] + ".png");
    $("#conjunto-letra-4").attr("src", "images/letra-cardinal.png");

}

function reset_experimento()
{
    experimento_empezado = false

    $("#wrapper-4-imagenes").addClass("d-none");
    $("#blank-image").removeClass("d-none");

    setTimeout(comienza_experimento, 2000);
}

function registra_tiempo_respuesta(indiceLetra)
{
    if(indiceLetra != -1)
    {
        tiempos_respuesta[indiceLetra]++;

        if(!necesita_parar)
            reset_experimento();
        else
            finalizar_experimento();
    }
}

function finalizar_experimento()
{
    necesita_parar = true;

    if($('#wrapper-4-imagenes').hasClass('d-none'))
    {
        experimento_empezado = false;
        $("#wrapper-4-imagenes").addClass("d-none");
        $("#letra-experimento").addClass("d-none");
        $("#blank-image").addClass("d-none");
        $("#btn-comenzar-experimento").removeClass("d-none");

        $.ajax({
            type : "POST",
            url : "experimento",
            data : '{"estado": "finalizar"}',
            contentType: 'application/json;charset=UTF-8', 
          });
    }
}