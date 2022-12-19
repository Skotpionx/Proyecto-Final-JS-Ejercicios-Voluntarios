    // @author Juanmi


    //Bloque para declarar todas las variables necesitadas "globales".
    const $btnNewTask = document.querySelector("#btnNewTask");
    const $containerNewTask = document.querySelector("#containerNewTask");
    const $btnClose = document.querySelector("#btnClose");
    const $btnCreateTask = document.querySelector("#createTask");
    const $inpName = document.querySelector("#newName");
    const $inpEndDate = document.querySelector("#newDateEnd");
    const $tasks = document.querySelector('#tasks');
    const $nav = document.querySelector('nav');
    const $spanFinal = document.createElement('span');
    const $spanNoFinal = document.createElement('span');
    const $spanEliminada = document.createElement('span');
    let sumaFinalizadas = 0;
    let sumaNoFinalizadas = 0;

    $nav.setAttribute('style', "display:flex;justify-content:space-around;background-color:#272b51;color:white;height:50px;align-items:center  ");

    //Bloque de funciones reutilizadas varias veces , hechas de esta forma para facilitar el mantenimiento y la reutilización de código.
    // se que al final algunas son una sola linea, pero es mas facil poner showShomething(bloque) que tener que decir .style.setProperty ah o era setAttribute tal y tal...
    const showSomething = (bloque) => {
        return bloque.style.setProperty("display","block");
    }
    const hideSomething = (bloque) =>{
        return bloque.style.setProperty("display","none");
    }

    const proveValuesNotEmpty = (inp) =>  {
        return inp.value != "";
    }

    //Funcion usada para finalizar tareas (en lo referente a estilos)
    const finalizarTarea = (template,bloque) => {
        template.querySelector(bloque).classList.remove("text-success");
        template.querySelector(bloque).classList.add("text-primary");
        template.querySelector(bloque).classList.add("tachado");
    }

    //Funcion usada para desfinalizar una tarea ( en lo referente a estilos) 
    //( si cambiamos su estado de fianlizada a no finalizada, y para limpiar las variables de la funcion finalizararea() 
    // y poder mostrarlo correctamente)
    const desfinalizarTarea = (template,bloque) =>{
        template.querySelector(bloque).classList.remove("text-primary");
        template.querySelector(bloque).classList.remove("tachado");
        template.querySelector(bloque).classList.add("text-success");
    }

    //Funcion usada para guardar en el localStorage antes de borrar.
    const saveToLocalStorage = async (id) =>    {
        const endpoint = "http://localhost:4000/tasks/" + id;
        const res = await fetch(endpoint),
                json = await res.json();
                if(!res.ok) throw { status: res.status, message: res.statusText};
                //Le pedimos los datos de esa tarea a la api antes de borrarlo
                const miObject = {
                    "Nombre" : json.Nombre,
                    "FechaInicio" : json.FechaInicio,
                    "FechaFinal" : json.endDate,
                    "ended" : json.ended,
                };
            localStorage.setItem(json.id, JSON.stringify(miObject));
    }



    //Funcion usada para añadir tarea, por defecto le ponemos 0 pero lo pasamos como parametro igual por si alguna vez nosotros como admins
    //Quisieramos que esto cambiara.
    const addTask = async (nameValue,startDate,endDate,ended = 0) =>    {
        try{
            const options = {
                method : "POST",
                headers : {
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify({
                    Nombre: nameValue,
                    FechaInicio: startDate,
                    endDate: endDate,
                    ended: ended
                })
            };
            const endpoint = "http://localhost:4000/tasks/";
            const res = await fetch(endpoint,options);
            const json = await res.json();
            if(!res.ok) throw {status: res.status, message: res.statusText};
            location.reload();
        }catch (error){
            const miError = error.statusText || "Error al cargar los datos";
            console.log(miError);
        }
    }




    const loadTask = async() => {
        const $template = document.querySelector("#template-task").content;
        let $fragment = new DocumentFragment();
        const endpoint = "http://localhost:4000/tasks/";
        try{
            const res = await fetch(endpoint);
            const jsonTask = await res.json();
            if(!res.ok) throw {status: res.status, message: res.statusText};
            
            jsonTask.forEach( task =>{
                //Contenido de la template
                $template.querySelector('#nombreTask').textContent = "El nombre de esta tarea es: " +task.Nombre;
                $template.querySelector('#FechaInicioTask').textContent = "La fecha de inicio fue : " +task.FechaInicio;
                $template.querySelector('#FechaFinTask').textContent = "La fecha de finalizacion de esta tarea es:  " +task.endDate;
                const btnEnd = $template.querySelector('#endTask');
                if(task.ended === 0 ){
                    $template.querySelector('#finalizada').textContent = "Estado: No Finalizada";
                    btnEnd.classList.remove("d-none");
                    desfinalizarTarea($template,'#nombreTask');
                    desfinalizarTarea($template,'#FechaInicioTask');
                    desfinalizarTarea($template,'#FechaFinTask');
                    desfinalizarTarea($template,'#finalizada');
                    sumaNoFinalizadas++;
                }else if(task.ended === 1){
                    finalizarTarea($template,'#nombreTask');
                    finalizarTarea($template,'#FechaInicioTask');
                    finalizarTarea($template,'#FechaFinTask');
                    finalizarTarea($template,'#finalizada');
                    btnEnd.classList.add("d-none");
                    $template.querySelector('#finalizada').textContent = "Estado: Finalizada";
                    sumaFinalizadas++;
                }

                //Atributos dataset a los botones
                // delete > solo id
                // finalizar > todo ya que es lo mismo que editar pero solo haciendo el cambio al ended.
                // editar > todo.

                // liada monumental poniendo Nombre FechaInicio y luego endDate y ended.. 🥚🥚
                $template.querySelector('#endTask').dataset.id = task.id;
                $template.querySelector('#endTask').dataset.Nombre = task.Nombre;
                $template.querySelector('#endTask').dataset.FechaInicio = task.FechaInicio;
                $template.querySelector('#endTask').dataset.endDate = task.endDate;
                $template.querySelector('#endTask').dataset.ended = task.ended;

                $template.querySelector('#editTask').dataset.id = task.id;
                $template.querySelector('#editTask').dataset.Nombre = task.Nombre;
                $template.querySelector('#editTask').dataset.FechaInicio = task.FechaInicio;
                $template.querySelector('#editTask').dataset.endDate = task.endDate;
                $template.querySelector('#editTask').dataset.ended = task.ended;

                $template.querySelector('#deleteTask').dataset.id = task.id;



                //Clonamos el template

                let $clonado = document.importNode($template,true);
                $fragment.appendChild($clonado);
            });
            $spanFinal.textContent = "Las finalizadas son: " + sumaFinalizadas;
            $spanNoFinal.textContent = "Las no finalizadas son: " + sumaNoFinalizadas;
            $spanEliminada.textContent = "Las eliminadas son: " + localStorage.length;

            $nav.appendChild($spanFinal);
            $nav.appendChild($spanEliminada);
            $nav.appendChild($spanNoFinal);
            $tasks.append($fragment);
        }catch (error){
            const miError = error.statusText || "Error al cargar los datos";
            console.log(miError);
        }
        loadGrafico(divGrafico);
    }
    
    $btnNewTask.addEventListener("click", (e) =>{
        e.preventDefault();
        showSomething($btnClose);
        showSomething($containerNewTask);
        hideSomething(e.target)
        $tasks.classList.add("d-none");
    });

    $btnClose.addEventListener("click", (e) =>{
        e.preventDefault();
        hideSomething($containerNewTask);
        hideSomething(e.target);
        showSomething($btnNewTask);
        $tasks.classList.remove("d-none");
    });

    
    $btnCreateTask.addEventListener("click", (e) =>{
        e.preventDefault();
        if(proveValuesNotEmpty($inpName) && proveValuesNotEmpty($inpEndDate)){
            const date = new Date();
            const dateEnd = new Date($inpEndDate.value);
            addTask($inpName.value,date.toLocaleDateString(),dateEnd.toLocaleDateString(),0);
        }
        else{
            setTimeout( () =>{
                const $txtInputEmpty = document.createTextNode("Hemos detectado comportamiento sospechoso, te vamos a invitar a abandonar nuestra página. Disculpe las molestias.");
                const $containerEmpty = document.createElement('h6');
                const $img = document.createElement('img');
                $img.setAttribute("src","./img/indice.png");
                $containerEmpty.setAttribute("class","card-subtitle  mt-2 mb-2 text-muted ");
                $containerEmpty.appendChild($txtInputEmpty);
                $containerNewTask.appendChild($img);
                $containerNewTask.appendChild($containerEmpty);
                const $nodos = $containerNewTask.childNodes ;
                $nodos.forEach( () => {
                    $containerNewTask.childNodes[0].remove();
                });
                $containerNewTask.style.setProperty("text-align","center");
                setTimeout( () =>{
                    location.reload();
                },5000);
            },1000);
        }

    });
    document.addEventListener("DOMContentLoaded",loadTask());


    document.addEventListener("click", async (e) => {
        e.preventDefault();
        if(e.target.matches("#deleteTask")){
            try{
                saveToLocalStorage(e.target.dataset.id);
                const options = {
                    method : "DELETE",
                    headers : {
                        "Content-Type": "application/json; charset=utf-8",
                    }
                };
                const url = "http://localhost:4000/tasks/" + e.target.dataset.id;
                res = await fetch(url,options);
                const json = await res.json();
                if( !res.ok) throw { status: res.status, message: res.statusText};
                //recargamos la pagina una vez que la petición post ha sido OK.
                location.reload();
            }catch (error){
                const miError = error.statusText || "Error al cargar los datos";
                console.log(miError);
            }
        }
        else if(e.target.matches("#endTask")){
            try{
                const options = {
                    method : "PUT",
                    headers : {
                        "Content-Type": "application/json; charset=utf-8",
                    },
                    body: JSON.stringify({
                        Nombre : e.target.dataset.Nombre,
                        FechaInicio: e.target.dataset.FechaInicio,
                        endDate: e.target.dataset.endDate,
                        ended: 1,
                    })
                }
                const url = "http://localhost:4000/tasks/" + e.target.dataset.id;
                res = await fetch(url,options);
                const json = await res.json();
                if( !res.ok) throw { status: res.status, message: res.statusText};
                //recargamos la pagina una vez que la petición put ha sido OK.
                location.reload();
            }catch (error){
                const miError = error.statusText || "Error al cargar los datos";
                console.log(miError);
            }
        }
        else if(e.target.matches("#editTask")){
            e.target.disabled = true;
            const id = e.target.dataset.id;
            const fecha = e.target.dataset.FechaInicio;
            //Esto obtiene el div con id #task, se que se podia hacer usando simplemente querySelector(#task) que está declardo arriba,
            //pero nunca he usado esto asi que voy a ver cómo funciona y usarlo
            const inputNombre = document.createElement('input');
            inputNombre.setAttribute("type","text");
            inputNombre.classList.add('form-control');
            inputNombre.setAttribute("value",e.target.dataset.Nombre);
            inputNombre.style.setProperty("margin-top","5%");

            const inputFecha = document.createElement('input');
            inputFecha.setAttribute('type','date');
            inputFecha.classList.add('form-control');
            inputFecha.style.setProperty("margin-top","5%");

            const inputBtn = document.createElement('button');
            inputBtn.setAttribute('type','button');
            inputBtn.textContent = "Confirmar edición";
            inputBtn.classList.add('btn','btn-info','mt-2');



            e.target.parentNode.parentNode.appendChild(inputNombre);
            e.target.parentNode.parentNode.appendChild(inputFecha);
            e.target.parentNode.parentNode.appendChild(inputBtn);


            inputBtn.addEventListener("click",async (e) => {
                try{
                    const options = {
                        method : "PUT",
                        headers : {
                            "Content-Type": "application/json; charset=utf-8",
                        },
                        body: JSON.stringify({
                            Nombre : inputNombre.value,
                            FechaInicio: fecha,
                            endDate: inputFecha.value,
                            ended: 0,
                        }),
                    };
                    // establecemos la url y el data set que se habia establecido en la funcion anterior( este es un boton )
                    // que no se crea cuando haces click en la imagen, si no que estaba creado ya hora simplemente lo muestro
                    const url = "http://localhost:4000/tasks/" + id;
                    res = await fetch(url,options);
                    const json = await res.json();
                    if( !res.ok) throw { status: res.status, message: res.statusText};
                    //recargamos la pagina una vez que la petición put ha sido OK.
                    location.reload();
                }catch (error){
                    const miError = error.statusText || "Error al cargar los datos";
                    console.log(miError);
                }
            });
        }
    }
);

    const divGrafico = document.querySelector('#graficoTareas');
    const loadGrafico = (divGrafico) =>{
        let myChart = new Chart(divGrafico, {
            type: 'pie',
            data: {
                labels: ['Pendientes', 'Terminadas', 'Eliminadas'],
                datasets: [{
                    label: '',
                    data: [sumaNoFinalizadas, sumaFinalizadas, localStorage.length],
                    borderWidth: 1,
                    backgroundColor: ['red', 'green', 'gray'],
                }]
            }
        });
    }

