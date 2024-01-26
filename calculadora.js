//Declaración de variables numericas
const buttonZero = document.getElementById('buttonZero');
const buttonUno = document.getElementById('buttonUno');
const buttonDos = document.getElementById('buttonDos');
const buttonTres = document.getElementById('buttonTres');
const buttonCuatro = document.getElementById('buttonCuatro');
const buttonCinco = document.getElementById('buttonCinco');
const buttonSeis = document.getElementById('buttonSeis');
const buttonSiete = document.getElementById('buttonSiete');
const buttonOcho = document.getElementById('buttonOcho');
const buttonNueve = document.getElementById('buttonNueve');
//Obtener una lista de todos los botones que tienen un valor asignado
const valoresNumericos = document.querySelectorAll('.valor');
const numeros = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
const operadores = ['%', '+', '-', '/', '*'];
//Declaración de operadores
const buttonPlus = document.getElementById('buttonPlus');
const buttonMinus = document.getElementById('buttonMinus');
const buttonDivide = document.getElementById('buttonDivide');
const buttonMultiply = document.getElementById('buttonMultiply');
const buttonModule = document.getElementById('buttonModule');
const buttonEqual = document.getElementById('buttonEqual');
const buttonPoint = document.getElementById('buttonPoint');
const button1OverX = document.getElementById('button1OverX');
const buttonInvertSign = document.getElementById('buttonInvertSign');
const buttonRaiz = document.getElementById('buttonRaiz');
//Declaración de funcionalidades y memorias
const buttonMC = document.getElementById('buttonMC');
const buttonMR = document.getElementById('buttonMR');
const buttonMS = document.getElementById('buttonMS');
const buttonMplus = document.getElementById('buttonMplus');
const buttonMminus = document.getElementById('buttonMminus');
const buttonErase = document.getElementById('buttonErase');
const buttonCE = document.getElementById('buttonCE');
const buttonC = document.getElementById('buttonC');
//Obtener elementos del display
const displayActual = document.getElementById('displayActual');
const displayAnterior = document.getElementById('displayAnterior');
const displayMemory = document.getElementById('MemoryMR');


//Declaracion de variables controladoras del formato-----------

//Variable para conocer el estado de la calculadora (reiniciada, en ejecucion)
var ejecucion = false;
//Controla si ya se ingreso un primer valor 
var primerValor = true;
//Controla si se ingreso y si se puede ingresar un operador
var hayOperador = false;
// Controla si el numero en pantalla no tiene operadores para ejecutar y asi poner sacar una raiz cuadrada real
var controlRaiz = true;
/*Controla eventos que no son especificos del usuario, por ejemplo, si el valor en pantalla no fue digitado por el usuario, 
sino un resultado de una operacion, Erase se comportará como Clear.*/
var digitadoPorUsuario = true;
//Controlan que solo se pueda poner un punto decimal entre cada operador
var puntosPermitidos = 0;
var puntosUsados = 0;
//Varaible controladora del primer signo negativo (en caso de quererse)
var primerNegativo = false;
//Variable de Memoria MS
var memoryS = '0';
//----------------------------------------------------------------

// Asigna la función de transmisión de números a cada botón
valoresNumericos.forEach(function (button) {
    button.addEventListener('click', TransmicionDeNumeros);
});
// Asigna la función de raiz a su boton correspondiente
buttonRaiz.addEventListener('click', RaizCuadrada);
//Asigna la funcion de borrar individual a su botón correspondiente
buttonErase.addEventListener('click', Erase);
//Asigna la funcion de Clear a su botón correspondiente
buttonC.addEventListener('click', Clear);
//Asigna la funcion de ClearEverything a su botón correspondiente
buttonCE.addEventListener('click', ClearEverything);
//Asigna la funcion de Equal a su botón correspondiente
buttonEqual.addEventListener('click', Equal);
//Asigna la funcion de Memory Save su botón correspondiente
buttonMS.addEventListener('click', Store);
//Asigna la funcion de Memory Recall a su botón correspondiente
buttonMR.addEventListener('click', Recall);
//Asigna la funcion de Memory Clear a su botón correspondiente
buttonMC.addEventListener('click', MemoryClear);
//Asigna la funcion de Memory Plus a su botón correspondiente
buttonMplus.addEventListener('click', MemoryPlus);
//Asigna la funcion de Memory Minus a su botón correspondiente
buttonMminus.addEventListener('click', MemoryMinus);
//Asigna la funcion de InvertSings a su botón correspondiente
buttonInvertSign.addEventListener('click', InvertSigns);
//Asigna la funcion de 1/x a su botón correspondiente
button1OverX.addEventListener('click', UnoSobreEquis);


//Funcion de transmición de datos a la pantalla 
function TransmicionDeNumeros(event) {

    // Obtiene el valor del atributo 'label' del botón clicado
    var numeroLabel = event.target.getAttribute('label');

    //Revisa si el comando ingresado es un punto, y si es el primer punto que se pone
    if (numeroLabel == '.' && puntosUsados < 1) {
        puntosPermitidos++;
        puntosUsados++;
        //Revisa si es el primer comando que se ingresa en la calculadora por operador, si lo es añade un '0.' para ahorrar tiempo, si no, añade simplemente un punto
        if (primerValor == true) {
            primerValor = false;
            //Operador ternario para mantener el formato con la intención de que exista un 0 default en la pantalla y se mantenga estetica
            (ejecucion == true ? displayActual.innerText += `0${numeroLabel}` : displayActual.innerText += `${numeroLabel}`);
            ejecucion = true;
            digitadoPorUsuario = true;
        } else {

            displayActual.innerText += `${numeroLabel}`;
            ejecucion = true;
            digitadoPorUsuario = true;
        }

        //Condicional cuando el comando ingresado es un número
    } else if (numeroLabel != "." && numeroLabel != "/" && numeroLabel != "%" && numeroLabel != "+" && numeroLabel != "-" && numeroLabel != "*") {
        //El único operador que puede ir luego de otro es un menos, para permitir juego de

        //Hace una revisión a si se ingreso ya un operador, si es verdadero, inhabilita la opcion de raiz cuadrada
        if (hayOperador == false) {

            //Asigna falso a la variable primerValor
            primerValor = false;

            if (numeroLabel == '0') {

                ejecucion = true;
            }
            //Operador ternario para mantener el formato con la intención de que exista un 0 default en la pantalla y se mantenga estetica
            (ejecucion == true ? displayActual.innerText += `${numeroLabel}` : displayActual.innerText = `${numeroLabel}`);
            ejecucion = true;
            digitadoPorUsuario = true;
        } else {
            controlRaiz = false;

            //Asigna falso a la variable primerValor
            primerValor = false;
            if (numeroLabel == '0') {

                ejecucion = true;
            }
            //Operador ternario para mantener el formato con la intención de que exista un 0 default en la pantalla y se mantenga estetica
            (ejecucion == true ? displayActual.innerText += `${numeroLabel}` : displayActual.innerText = `${numeroLabel}`);
            ejecucion = true;
            digitadoPorUsuario = true;
        }
        hayOperador = false;
        primerNegativo = true;

    } else {

        //Permitimos siempre la entrada de signo - para no comprometer el juego de signos
        if (numeroLabel == '-') {

            if (primerNegativo == false) {

                displayActual.innerText = `${numeroLabel}`
                primerNegativo = true;
                hayOperador = false;
                ejecucion = true;
                puntosUsados = 0;
                controlRaiz = true;
                console.log(controlRaiz);
            } else {

                displayActual.innerText += `${numeroLabel}`

                puntosUsados = 0;
                primerValor = true;
            }

        }
        //Revisa si hay un operador, esto para evitar que se adicionen 2 operadores seguidos a la cadena de texto
        else if (hayOperador == false) {
            //Si el operador que intenta ingresar no es un punto, lo adiciona y reestablece primerValor y suma 1 punto permitido
            if (numeroLabel != ".") {

                hayOperador = true;
                primerValor = true;
                puntosUsados = 0;
                //Operador ternario para mantener el formato con la intención de que exista un 0 default en la pantalla y se mantenga estetica
                displayActual.innerText += `${numeroLabel}`
                ejecucion = true;
                digitadoPorUsuario = true;
                primerNegativo = true;
            }

        } else {


        }


    }

    tamañoDisplay();
}


//Funcion de Igual
function Equal(event) {
    var operacionEnDisplay = displayActual.innerText;
    displayAnterior.innerText = displayActual.innerText;

    // Realizar el reemplazo, conservando el operador original y el dígito original
    var operacionModificada = operacionEnDisplay.replace(/([*/%])\d/g, function (match) {
        return match[0] + '+' + match[1];
    });


    var operacionArray = operacionModificada.split('');

    // Verificar y modificar el primer elemento del array
    if (operacionArray[0] !== '-' && operacionArray[0] !== '+') {
        operacionArray.splice(0, 0, '+');

    } else if (operacionArray[0] == '/' || operacionArray[0] == '*' || operacionArray[0] == '%') {
        operacionArray.splice(0, 1, '+');

    }

    // Actualizar el contenido del display

    //Se inicializan las variables que controlan el orden logico de la concatenación para separar por comando y mantener los numeros

    //Mantendrá en la memoria el numero que fue leido de izquierda a derecha
    var numeroActual = '';
    // Array que almacenara los numeros y los comandos por separado
    var numerosAbstraidos = new Array(operacionArray.length);
    // Memoria ordinal que recuerda que zonas del Array numerosAbstraidos ya han sido utilizados
    var memoriaOrdinal = 0;
    // Memoria que indica si se esta recien escribiendo un numero o no
    var siguienteNumero = false;

    num = 0;
    console.log(operacionArray)
    for (let i = 0; i < operacionArray.length; i++) {
        //Si el carcater es diferente de un comando, lo concatena a numeroActual
        if (!operadores.includes(operacionArray[i])) {

            numeroActual += operacionArray[i];

            //Cuando se encuentre un comando, en el array numerosAbstraidos se almacenará el string convertido a numero en la posicion (memoriaOrdinal), justo despues se agrega el comando hallado  
        } else if (operacionArray[i] == '+') {

            if (siguienteNumero == false) {
                numeroActual += operacionArray[i];
                siguienteNumero = true;
            } else {

                numerosAbstraidos[memoriaOrdinal] = numeroActual;


                memoriaOrdinal += 1;
                numeroActual = '';
                i--;
                siguienteNumero = false;
            }

        } else if (operacionArray[i] == '-') {

            if (siguienteNumero == false) {
                numeroActual += operacionArray[i];
                siguienteNumero = true;
            } else {

                numerosAbstraidos[memoriaOrdinal] = numeroActual;

                memoriaOrdinal += 1;
                numeroActual = '';
                i--;
                siguienteNumero = false;
            }
        }
        else {


            numerosAbstraidos[memoriaOrdinal] = numeroActual;
            numerosAbstraidos[memoriaOrdinal + 1] = operacionArray[i];
            memoriaOrdinal += 2;
            numeroActual = '';

            siguienteNumero == false;
        }




    }

    //Se ejecuta una vez más para asegurarnos de que todos los numeros ingresados se visualizen
    numerosAbstraidos[memoriaOrdinal] = numeroActual;
    numerosAbstraidos[memoriaOrdinal + 1] = operacionArray[operacionArray.lenth - 1];


    var numerosAbstraidos = numerosAbstraidos.filter(elemento => elemento !== undefined);
    var numerosAbstraidos = numerosAbstraidos.filter(elemento => elemento !== "");



    // Se agrega FINAL al final del arreglo como etiqueta controladora
    numerosAbstraidos.push('FINAL');

    //Logica de jerarquias de comandos y signos
    for (let i = 0; i < numerosAbstraidos.length - 1; i++) {

        console.log('INICIANDO');
        if (numerosAbstraidos[i] != "/" && numerosAbstraidos[i] != "%" && numerosAbstraidos[i] != "*") {

            numerosAbstraidos[i] = parseFloat(numerosAbstraidos[i]);

        } else if (numerosAbstraidos[i] == '/') {

            if (numerosAbstraidos[i + 1] != 'FINAL') {

                numerosAbstraidos[i - 1] = parseFloat(numerosAbstraidos[i - 1]) / parseFloat(numerosAbstraidos[i + 1]);

                numerosAbstraidos.splice(i, 2);
                i = 0;


            } else {

                numerosAbstraidos[i] = parseFloat(numerosAbstraidos[i]);
                break;

            }

        } else if (numerosAbstraidos[i] == '*') {

            if (numerosAbstraidos[i + 1] != 'FINAL') {
                numerosAbstraidos[i - 1] = parseFloat(numerosAbstraidos[i - 1]) * parseFloat(numerosAbstraidos[i + 1]);

                numerosAbstraidos.splice(i, 2);
                i = 0;




            } else {
                numerosAbstraidos[i] = numerosAbstraidos[i];
                break;

            }

        } else if (numerosAbstraidos[i] == '%') {

            if (numerosAbstraidos[i + 1] != 'FINAL') {
                numerosAbstraidos[i - 1] = numerosAbstraidos[i - 1] % numerosAbstraidos[i + 1];

                numerosAbstraidos.splice(i, 2);
                i = 0;




            } else {
                numerosAbstraidos[i] = numerosAbstraidos[i];
                break;

            }

        }

    }

    var numerosAbstraidos = numerosAbstraidos.filter(elemento => elemento !== undefined);
    var numerosAbstraidos = numerosAbstraidos.filter(elemento => elemento !== "");


    //Suma final

    for (let i = 1; i < numerosAbstraidos.length - 1; i++) {
        numerosAbstraidos[0] = parseFloat(numerosAbstraidos[0]) + parseFloat(numerosAbstraidos[i]);
        console.log(numerosAbstraidos[0]);

    }


    displayActual.innerText = String(numerosAbstraidos[0]);
    digitadoPorUsuario = false;
    controlRaiz = true;
    if (displayActual.innerText != 'Infinity') {


    } else {
        displayActual.innerText = 'Error';
        digitadoPorUsuario = false;
        ejecucion = false;
    }
    tamañoDisplay();
}
//Funcion de Resta en memoria 
function MemoryMinus() {

    var storage = displayActual.innerText.split('');
    storage = storage.filter(c => c === '%' || c === '/' || c === '+' || c === '-' || c === '*').length;
    if (storage > 1) {


    } else {
        displayAnterior.innerText = displayActual.innerText;
        displayActual.innerText = parseFloat(displayActual.innerText) - parseFloat(memoryS);

    }
    tamañoDisplay();
}
//Funcion de Sumado en memoria 
function MemoryPlus() {

    var storage = displayActual.innerText.split('');
    storage = storage.filter(c => c === '%' || c === '/' || c === '+' || c === '-' || c === '*').length;
    if (storage > 1) {


    } else {
        displayAnterior.innerText = displayActual.innerText;
        displayActual.innerText = parseFloat(displayActual.innerText) + parseFloat(memoryS);

    }
    tamañoDisplay();
}

//Funcion de Guardado en memoria 
function Store() {
    var storage = displayActual.innerText.split('');
    storage = storage.filter(c => c === '%' || c === '/' || c === '+' || c === '*').length;
    if (storage > 0) {


    } else {

        memoryS = displayActual.innerText;
        displayMemory.innerText = memoryS;
    }



    var displayMemoryNum = document.querySelector('.DisplayMemory');
    var displayMemoryM = document.querySelector('.DisplayMemoryM');

    if (displayMemoryNum) {

        displayMemoryNum.classList.add('activate');
    }

    if (displayMemoryM) {

        displayMemoryM.classList.add('activate2');
    }





    tamañoDisplay();
}

//Funcion de borrado de memoria 
function MemoryClear() {
    memoryS = '';
    tamañoDisplay();
    displayMemory.innerText = memoryS;
    var displayMemoryNum = document.querySelector('.DisplayMemory');
    var displayMemoryM = document.querySelector('.DisplayMemoryM');

    if (displayMemoryNum) {

        displayMemoryNum.classList.remove('activate');
    }

    if (displayMemoryM) {

        displayMemoryM.classList.remove('activate2');
    }




}

//Funcion de Recuerdo en memoria 
function Recall() {
    displayAnterior.innerText = displayActual.innerText;
    displayActual.innerText = memoryS;
    digitadoPorUsuario = false;

    tamañoDisplay();
}

//Funcion de Raiz
function RaizCuadrada(event) {

    if (controlRaiz != false) {
        console.log('Entré a la raiz');
        if (parseFloat(displayActual.innerText) >= 0) {
            raiz = Math.sqrt(parseFloat(displayActual.innerText))
            displayAnterior.innerText = `√${parseFloat(displayActual.innerText)}`;
            displayActual.innerText = raiz;
            digitadoPorUsuario = false;
            controlRaiz = true;

            if (raiz % 1 === 0) {
                puntosPermitidos = 0;
                puntosUsados = 0;

            } else {
                puntosPermitidos = 1;
                puntosUsados = 1;
            }

            hayOperador = false;
        } else {

            displayActual.innerText = 'Error';
            digitadoPorUsuario = false;
            ejecucion = false;

        }
    }

    else {


    }

    tamañoDisplay();
}

//Funcion de borrado Total
function ClearEverything(event) {
    displayActual.innerText = '0';
    displayAnterior.innerText = '0';
    ejecucion = false;
    puntosPermitidos = 0;
    puntosUsados = 0;
    primerValor = true;
    hayOperador = false;
    controlRaiz = true;
    primerNegativo = false;
    memoryS = '0';
    displayMemory.innerText = '';
    tamañoDisplay();

    var displayMemoryNum = document.querySelector('.DisplayMemory');
    var displayMemoryM = document.querySelector('.DisplayMemoryM');

    if (displayMemoryNum) {

        displayMemoryNum.classList.remove('activate');
    }

    if (displayMemoryM) {

        displayMemoryM.classList.remove('activate2');
    }


}

//Funcion de borrado con C

function Clear(event) {
    displayActual.innerText = '0';
    ejecucion = false;
    puntosPermitidos = 0;
    puntosUsados = 0;
    primerValor = true;
    hayOperador = false;
    controlRaiz = true;
    primerNegativo = false;
    tamañoDisplay();
}

//Funcion de borrado individual
function Erase(event) {


    if (digitadoPorUsuario == true) {

        let cadenaParaBorrar = displayActual.innerText.split('');
        // Eliminar el último caracter

        if (cadenaParaBorrar.length > 1) {

            //Inicio de logica controladora para los Puntos, no permite nunca 2 puntos luego de un mismo operados:
            if (cadenaParaBorrar[cadenaParaBorrar.length - 1] == '.') {
                puntosUsados--;
                console.log(puntosUsados)
            }
            if (cadenaParaBorrar[cadenaParaBorrar.length - 1] == '%' || cadenaParaBorrar[cadenaParaBorrar.length - 1] == '+' || cadenaParaBorrar[cadenaParaBorrar.length - 1] == '-' || cadenaParaBorrar[cadenaParaBorrar.length - 1] == '/' || cadenaParaBorrar[cadenaParaBorrar.length - 1] == '*') {
                puntosUsados = puntosPermitidos - 1;
                puntosPermitidos--;

                if (puntosUsados > 1) {
                    puntosUsados = 1;
                }
            }

            cadenaParaBorrar.pop();
            //Variable que contara la cantidad de operadores de la cadena
            var cantidadOperadores = 0;
            //Variable que verificara el ultimo caracter de la cadena
            var ultimoCaracter = cadenaParaBorrar[cadenaParaBorrar.length - 1];
            //Filtro que recorre el array y cuenta los operadores, esto con el fin de reestablecer funciones al borrar
            var cantidadOperadores = cadenaParaBorrar.filter(c => c === '%' || c === '/' || c === '+' || c === '-' || c === '*').length;

            //Si solo se cuenta uno o menos operadores y que el ultimo caracter de la cadena sea un operador ( o sea no un numero), reestablece la funcion Raiz, si se borra un operador restablece ejecucion para una correcta inserion de 0.
            if (cantidadOperadores == 0) {
                hayOperador = false;
            } else if (cantidadOperadores >= 1 && numeros.includes(ultimoCaracter)) {
                hayOperador = false;
                ejecucion = false;
            } else if (cantidadOperadores >= 1 && operadores.includes(ultimoCaracter) && ultimoCaracter !== '.') {
                hayOperador = true;
                ejecucion = true;
            } else {
                hayOperador = false;
            }


            displayActual.innerText = cadenaParaBorrar.join('');
            controlRaiz = cantidadOperadores == 0;

            primerValor = cantidadOperadores >= 1 && operadores.includes(ultimoCaracter);


            //Si el texto solo tenia 1 digito
        } else {
            displayActual.innerText = '0';
            ejecucion = false;
            puntosPermitidos = 0;
            puntosUsados = 0;
            primerValor = true;
            hayOperador = false;
            controlRaiz = true;
            primerNegativo = false;
        }
        //Si el texto no fue digitado
    } else {

        displayActual.innerText = '0';
        ejecucion = false;
        puntosPermitidos = 0;
        puntosUsados = 0;
        primerValor = true;
        hayOperador = false;
        controlRaiz = true;
        primerNegativo = false;
    }

}

//Funcion de cambio de signos

function InvertSigns() {
    var cambioSignos = displayActual.innerText.split('');
    console.log(cambioSignos);


    if (numeros.includes(cambioSignos[0])) {
        cambioSignos.splice(0, 0, '+');


    }
    console.log(cambioSignos);

    for (let i = 0; i < cambioSignos.length - 1; i++) {
        if
            ((cambioSignos[i] == '/' || cambioSignos[i] == '%' || cambioSignos[i] == '*') && numeros.includes(cambioSignos[i + 1])) {
            cambioSignos.splice(i + 1, 0, '+');
            i++;
        }
    }

    console.log(cambioSignos);
    for (let i = 0; i < cambioSignos.length - 1; i++) {

        if (cambioSignos[i] == '+') {
            cambioSignos[i] = '-';

        } else if (cambioSignos[i] == '-') {
            cambioSignos[i] = '+';
        } else {


        }


    }
    displayActual.innerText = cambioSignos.join('');
    tamañoDisplay();
}

//Funcion de cambio de signos

function UnoSobreEquis() {

    Equal();
    displayAnterior.innerText = displayActual.innerText;
    displayActual.innerText = 1 / parseFloat(displayActual.innerText);
    digitadoPorUsuario = false;
    controlRaiz = true;
    puntosPermitidos = 0;
    puntosUsados = 1;
    tamañoDisplay();
}

function tamañoDisplay() {


    var cantidadCarac = displayActual.innerText.split('').length;


    if (cantidadCarac > 11) {
        displayAnterior.style.fontSize = '27px';
        displayActual.style.fontSize = '30px';

    } else {
        displayAnterior.style.fontSize = '30px';
        displayActual.style.fontSize = '40px';

    }

}
















