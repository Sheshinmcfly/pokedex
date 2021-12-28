
/* Se declara y asigna variable que inserta el path de la pokeball en el elemento indicado por id */
let pokeball = $('#Pokeball, #Pokeball_portada').html(`<path id="pkmn-go-teamless" stroke="none" stroke-width="1" d="M 512.00,96.80 C 304.28,96.94 132.17,249.33 101.24,448.41 101.24,448.41 312.51,448.80 312.51,448.80 339.50,364.37 418.60,303.25 512.00,303.20 605.25,303.31 684.24,364.33 711.33,448.61 711.33,448.61 922.53,448.80 922.53,448.80 891.82,249.60 719.75,97.06 512.00,96.80 512.00,96.80 512.00,96.80 512.00,96.80 Z M 512.00,376.80 C 436.89,376.80 376.00,437.69 376.00,512.80 376.00,587.91 436.89,648.80 512.00,648.80 512.00,648.80 512.00,648.80 512.00,648.80 587.11,648.80 648.00,587.91 648.00,512.80 648.00,512.80 648.00,512.80 648.00,512.80 648.00,437.69 587.11,376.80 512.00,376.80 512.00,376.80 512.00,376.80 512.00,376.80 512.00,376.80 512.00,376.80 512.00,376.80 Z M 101.47,576.80 C 132.18,776.00 304.25,928.54 512.00,928.80 719.72,928.66 891.83,776.27 922.76,577.19 922.76,577.19 711.49,576.80 711.49,576.80 684.50,661.23 605.40,722.35 512.00,722.40 418.75,722.29 339.76,661.27 312.67,576.99 312.67,576.99 101.47,576.80 101.47,576.80 101.47,576.80 101.47,576.80 101.47,576.80 Z" />`);

/* Ejecutar después de que todos los elementos del documentos esten cargados */
$(document).ready(() => {

    /* Al hacer click en la portada entrar a la sección principal*/
    $('#Portada').click(() => {

        /* Mostrar pantalla principal */
        $('#Principal').css('display', 'block');

        /* Desactivar click de portada */
        $(this).prop('disabled', true);

        /* Activa click del Hero section */
        $('#Hero-section').prop('disabled', false);

        /* Agrega a la etiqueta audio con id Open, la ruta del archivo de audio */
        $('#Open').attr("src", 'assets/audio/open.mp3');

        /* Modifica el volúmen del audio */
        $('#Open').prop("volume", 0.5);

        /* Reproduce el audio */
        $('#Open').trigger('play');

        /* Se desvanece la portada con animación difuminada de 1 segundo */
        $('#Portada').fadeOut(1000);
    })


    /* Al hacer click en el hero section volver a la portada*/
    $('#Hero-section').click(() => {

        /* Desactivar click del hero section */
        $(this).prop('disabled', true);

        /* Activa el click de la portada */
        $('#Portada').prop('disabled', false);

        /* Agrega a la etiqueta audio con id Close, la ruta del archivo de audio */
        $('#Close').attr("src", 'assets/audio/close.mp3')

        /* Modifica el volúmen del audio */
        $('#Close').prop("volume", 0.5);

        /* Reproduce el audio */
        $('#Close').trigger('play');

        /* Reaparece la portada con animación difuminada de 1 segundo */
        $('#Portada').fadeIn(1000);

        /* Se desvanece la seccion pokemon con animación difuminada de 1 segundo */
        $('#Pokemon').fadeOut(1000);
    })


    /* Al hacer submit el formulario */
    $('form').submit((event) => {

        /* En cada submit desaparece la sección pokemon */
        $('#Pokemon').css('display', 'none');

        /* Previene que se recargue el formulario por default */
        event.preventDefault();

        /* Declara y asigna variable al input que obtiene el valor de búsqueda y lo transforma a minúscula */
        let valor = $('#InputBusqueda').val().toLowerCase();


        /* Ajax */
        $.ajax({

            /* Asigna la url de la api a consumir y concatena el valor obtenido del input */
            url: `https://pokeapi.co/api/v2/pokemon/${valor}`,

            /* Si la respuesta de la consulta es exitosa obtener datos */
            success: (datos) => {

                /* Reaparece la seccion pokemon con animación difuminada de 1 segundo */
                $('#Pokemon').fadeIn(1000);

                /* Vacía el valor del input */
                $('#InputBusqueda').val('');

                /* Agrega a la etiqueta audio con id Encontrado, la ruta del archivo de audio */
                $('#Encontrado').attr("src", 'assets/audio/found.mp3');

                /* Modifica el volúmen del audio */
                $('#Encontrado').prop("volume", 0.5);

                /* Reproduce el audio */
                $('#Encontrado').trigger('play');


                /* Declara y asigna variables con los valores obtenidos desde la api */
                let nombre = datos.name;
                let numero = datos.id;
                let imagenFront = datos.sprites.other["official-artwork"].front_default;
                let peso = datos.weight;


                /* Inserta a la estructura html los elementos definidos, concatenando los datos obtenidos*/
                $('#Pokeinfo').html(`
                    <div class="text-center text-white">
                        <h5 class="d-inline">#${numero}</h5>
                        <h5 class="d-inline-block text-capitalize">${nombre}</h5>
                        <br>
                        <img id="Pokeimg" src="${imagenFront}">
                        <h5>Peso: ${peso}kg.</h5>
                        <button id="btn_grito" onclick="grito(${numero});" class="btn btn-light py-1 px-5 mt-2">Grito
                        </button>
                    </div>
                `)


                /* Declara y asigna variable a un arreglo vacío */
                let estadisticas = [];


                /* Por cada estadística obtenida de la api, insertar objeto de estadísticas al arreglo vacío*/
                datos.stats.forEach((stat) => {

                    estadisticas.push(
                        {
                            label: stat.stat.name,
                            y: stat.base_stat,
                        }
                    );
                });


                /* Declara y asigna a variable un objeto con parámetros para el gráfico canvas */
                let config = {

                    animationEnabled: true,
                    theme: "dark1", // "light1", "light2", "dark1", "dark2"
                    title: {
                        text: 'Estadísticas',
                    },
                    axisY: {
                        title: 'Valor',
                    },
                    axisX: {
                        title: 'Estadística',
                    },
                    data: [
                        {
                            type: 'column',
                            dataPoints: estadisticas,
                        },
                    ],
                };

                /* Declara y asigna a variable un nuevo objeto canvas con los parámetros del id del elemento a insertar
                y el objeto de configuración creado anteriormente */
                let char = new CanvasJS.Chart('Pokestats', config);

                /* Renderizar el gráfico canvas */
                char.render();
            },
        });
    });
});


/* Se declara y asigna a variable una función */
let grito = (numero) => {

    /* Agrega a la etiqueta audio con id Grito, la ruta del archivo de audio */
    $('#Grito').attr("src", `assets/audio/${numero}.mp3`);

    /* Modifica el volúmen del audio */
    $('#Grito').prop("volume", 0.5);

    /* Reproduce el audio */
    $('#Grito').trigger('play');
};