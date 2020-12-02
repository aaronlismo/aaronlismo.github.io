
let f = new Date(),dia = f.getDate(),mes=f.getMonth()+1;
if(dia<10){dia='0'+dia;}
if(mes<10){mes="0"+mes;}
let today = (  f.getFullYear() + "-" + mes + "-" + dia);
document.getElementById("fecha").setAttribute("value", `${today}`);
document.getElementById("fecha").setAttribute("min", `${today}`);
document.getElementById("fecha").setAttribute("type", "date");

let noches = document.getElementById("nights");
let menuNoches = document.createElement("select");
menuNoches.appendChild(document.createElement("optgroup"));
menuNoches.appendChild(document.createElement("optgroup"));
let optgroups = menuNoches.getElementsByTagName("optgroup");
optgroups[0].setAttribute("label", "comunes");
let nuevo;
let nochesPopulares = [4, 7, 10, 14];
for (let i = 0; i < nochesPopulares.length; i++) {
    nuevo = document.createElement('option');
    nuevo.setAttribute('value', nochesPopulares[i]);
    nuevo.textContent = nochesPopulares[i].toString() + ' noches';
    optgroups[0].appendChild(nuevo);
}


optgroups[1].setAttribute("label", "diarias");
for (let i = 1; i <= 14; i++) {
    nuevo = document.createElement('option');
    nuevo.setAttribute('value', i);
    nuevo.textContent = i + ' noches';
    optgroups[1].appendChild(nuevo);
}
noches.parentNode.insertBefore((document.createElement('br')), noches);
noches.parentNode.replaceChild(menuNoches, noches);


document.getElementById('aceptar').addEventListener("click",aceptarFormulario);

document.getElementById("rooms").addEventListener('click', mostrarHabitaciones);

/**
 * Función que nos permite añadir habitaciones 
 */
function mostrarHabitaciones() {

    nuevo = document.createElement('div');
    nuevo.setAttribute('id', 'roomContainer');
    nuevo.style.display = 'none';
    (document.getElementsByTagName('form'))[0].insertAdjacentElement("afterend", nuevo);

    document.getElementById('roomContainer').style.display = 'block';
    if (document.getElementById('newRoom') == null) {
        let boton1 = document.createElement('button');
        boton1.setAttribute("type", "button");
        boton1.setAttribute("id", "newRoom");
        boton1.textContent = "New room";
        nuevo.appendChild(boton1);
        document.getElementById("newRoom").addEventListener('click', crearHabitacion);
    }
    if (document.getElementById('done') == null) {
        let boton2 = document.createElement('button');
        boton2.setAttribute("type", "button");
        boton2.setAttribute("id", "done");
        boton2.textContent = "Done";
        nuevo.appendChild(boton2);
        document.getElementById("done").addEventListener("click", resultados);

    }
}

/**
 * Función que nos permite crear la habitación con la cantidad de adultos y niños
 */
function crearHabitacion() {


    nuevo = document.createElement('div');
    nuevo.setAttribute('class','room');
    let latestRoom;
    if ((document.getElementById('1')) == null) {
        latestRoom = 1;
    } else {
        let rooms = document.getElementById('roomContainer').querySelectorAll('.room');
        latestRoom = (rooms.length) + 1;

    }
    nuevo.setAttribute("id", parseInt(latestRoom));
    let titulo = document.createElement("h2");
    titulo.textContent = `Room ${parseInt(latestRoom)}`;
    nuevo.appendChild(titulo);
    let number1 = document.createElement("div");
    number1.textContent = "Number of adults: ";
    let number1Input = document.createElement("input");
    number1Input.setAttribute("type", "number");
    number1Input.setAttribute("min", "0");
    number1Input.setAttribute("max", "4");
    number1Input.setAttribute("id", `${latestRoom}adults`);
    number1Input.defaultValue = 1;
    number1.appendChild(number1Input);
    nuevo.appendChild(number1);

    let number2 = document.createElement("div");
    number2.textContent = "Number of children: ";
    let number2Input = document.createElement("input");
    number2Input.setAttribute("type", "number");
    number2Input.setAttribute("min", "0");
    number2Input.setAttribute("max", "3");
    number2Input.setAttribute("id", `${latestRoom}children`);
    number2Input.defaultValue = 0;
    number2Input.addEventListener('change', function () {
        edadesNiños(number2Input.getAttribute('id'));
    });
    number2.appendChild(number2Input);
    nuevo.appendChild(number2);
    if (latestRoom > 1) {
        let closed = document.createElement('button');
        closed.addEventListener('click', function () {
            cerrarHabitaciones(latestRoom);
        });
        
        closed.textContent = 'X';
        nuevo.appendChild(closed);
    }


    document.getElementById('newRoom').parentNode.insertBefore(nuevo, document.getElementById('newRoom'));
    document.getElementById('roomContainer').appendChild(nuevo);

}

/**
 *  Función que nos elimina la habitación 
 * @param  num {*número de la habitación}
 */
function cerrarHabitaciones(num) {
    document.getElementById(num).parentNode.removeChild(document.getElementById(num));
    let rooms=document.getElementById('roomContainer').querySelectorAll('.room');

    for(let i=0;i<rooms.length;i++){
        rooms[i].setAttribute('id',`${i+1}`);
        rooms[i].firstElementChild.textContent=`Room ${i+1}`;
    }
}

/**
 * Función que nos permite modificar la edad de los niños
 * @param  id {*}
 */
function edadesNiños(id) {
    let numChildren = parseInt(document.getElementById(id).value);
    let numCreated = document.getElementById(id).parentNode.querySelectorAll('select');
    let edadMaxima = 17;
    if (numChildren > numCreated.length) {
        for (let i = numCreated.length; i < numChildren; i++) {
            nuevo = document.createElement('select');
            for (let j = 0; j <= edadMaxima; j++) {
                let opcion = document.createElement('option');
               
                opcion.setAttribute('value', j);
                opcion.textContent = j;
                

                nuevo.appendChild(opcion);
            }
            document.getElementById(id).parentNode.appendChild(nuevo);
        }
    } else {
        for (let i = numCreated.length; i > numChildren; i--) {
            document.getElementById(id).parentNode.removeChild(document.getElementById(id).parentNode.lastChild);
        }
    }
}

/**
 * Función que nos coloca la información en el input
 */
function resultados() {
    document.getElementById('roomContainer').style.display = 'none';
    let rooms = document.getElementById('roomContainer').querySelectorAll('.room');
    let roomNum = rooms.length;
    let guestNum = 0;
    

    for (let i = 1; i <= roomNum; i++) {
        guestNum += parseInt(document.getElementById(`${i}adults`).value) + parseInt(document.getElementById(`${i}children`).value);
    }

    document.getElementById('rooms').value = `${roomNum} room(s) and ${guestNum} guests`;
    while (document.getElementById('roomContainer').firstChild) {
        document.getElementById('roomContainer').removeChild(document.getElementById('roomContainer').firstChild);
    }

}

/**
 * Función que nos enseña en la consola la información que hemos introducido
 */
function aceptarFormulario()
{
    let informacionDestino = document.getElementById('destination').value;
    let informacionDate = document.getElementById('fecha').value;
    let informacionNoche = document.querySelector('select').value;
    let informacionHabitaciones = document.getElementById('rooms').value;
    let rooms = document.getElementById('roomContainer').querySelectorAll('.room');
    let roomNum = rooms.length;

    console.log('Destino: '+informacionDestino);
    console.log('Fecha: '+informacionDate);
    console.log('Números de Noches:' + informacionNoche);
    console.log('Información de Habitaciones: ' + informacionHabitaciones);
    for(let i=1 ;i<= roomNum;i++)
    {
        console.log('Habitación'+i);
        console.log('Adultos'+parseInt(document.getElementById(`${i}adults`).value));
        console.log('Niños'+ parseInt(document.getElementById(`${i}children`).value));
    }
    
}


