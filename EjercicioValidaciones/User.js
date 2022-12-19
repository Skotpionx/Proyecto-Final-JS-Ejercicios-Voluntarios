import * as regExp from "./regExp.js";

    class Usuario{
        constructor(nombre,dni,codPostal,fechaNac){
            this._nombre = nombre;
            this._dni = dni;
            this._codPostal = codPostal;
            this._fechaNac = fechaNac;
        }

        get getNombre(){
            return this._nombre;
        }
        get getDNI(){
            return this._dni;
        }
        get getCodPostal(){
            return this._codPostal;
        }
        get getFechaNac(){
            return this._fechaNac;
        }

    }


    document.addEventListener("DOMContentLoaded", (e )=> {
        Object.entries(localStorage).forEach(element => {
            const objPersona = JSON.parse(element[1]);
            objPersona.dni = element[0];
            const $article = document.createElement('article');
            $article.classList.add("border","text-center","border-info","w-50","mt-1","mx-auto");
            const $pNombre = document.createElement('p');
            $pNombre.textContent = "Nombre : " + objPersona.Nombre;
            const $pFecha = document.createElement('p');
            $pFecha.textContent = " Nacido en :" +objPersona.FechaNacimiento+ " y con edad de " + regExp.GetNumero(objPersona.FechaNacimiento);
            const $pDNI = document.createElement('p');
            $pDNI.textContent = " Con DNI " + objPersona.dni;
            const $pPostal = document.createElement('p');
            $pPostal.textContent = " Con vivienda en " + objPersona.CodPostal;

            $article.appendChild($pNombre);
            $article.appendChild($pFecha);
            $article.appendChild($pDNI);
            $article.appendChild($pPostal);
            
            document.querySelector("main").appendChild($article);
        });
    });


    let dniValido = false,
        codPostalValido = false,
        nombreValido = false,
        fechaValida = false;

    const inputCodPostal = document.querySelector("#codPos");
    inputCodPostal.addEventListener("keyup", (e) =>{
        if(inputCodPostal.value === ""){
            inputCodPostal.style.backgroundColor = "white";
            codPostalValido = false;
        }
        else if(regExp.comprobarCodPostal(inputCodPostal.value)){
            inputCodPostal.style.backgroundColor = "lightgreen";
            codPostalValido = true;
        }else{
            inputCodPostal.style.backgroundColor = "rgb(255, 50, 50)";   
            codPostalValido = false;
        }
    });



    const inputNombre = document.querySelector("#nombre");
    inputNombre.addEventListener("keyup", (e) => {
        if(inputNombre.value === ""){
            inputNombre.style.backgroundColor ="white";
            nombreValido = false;
        }else{
            inputNombre.style.backgroundColor = "lightgreen";
            nombreValido = true;
        }
    });

    //Le he añadido la condicion de tener que ser mayor de edad (extra mio)
    const inputDNI = document.querySelector("#dni");
    inputDNI.addEventListener("keyup", (e) => {
        if(inputDNI.value === ""){
            inputDNI.style.backgroundColor = "white";
            dniValido = false;
        }else if( regExp.comprobarDNI(inputDNI.value)){
            inputDNI.style.backgroundColor = "lightgreen";
            dniValido = true;
        }else{
            inputDNI.style.backgroundColor = "rgb(255, 50, 50)";
            dniValido = false;
        }
    });

    //Esto es un extra que no pedia el ejercicio 
    const inputFecha = document.querySelector("#fechaNac");
    inputFecha.addEventListener("change", (e) => {
        inputFecha.edad = regExp.GetNumero(inputFecha.value) || 1 ;
        if( inputFecha.edad > 18){
            inputFecha.style.backgroundColor = "lightgreen";
            fechaValida = true;
        }else{
            inputFecha.style.backgroundColor = "rgb(255, 50, 50)";  
            fechaValida = false;
        }
    });

    const btnSubmit = document.querySelector("#submitForm");
    btnSubmit.addEventListener("click", () =>{
        let user;
        if(fechaValida === true && dniValido === true && nombreValido === true && codPostalValido === true ){
            user = new Usuario(inputNombre.value,inputDNI.value,inputCodPostal.value,inputFecha.value);
        }
        if(user != undefined && !localStorage.getItem(user.getDNI)){
            const miObject = {
                Nombre : user.getNombre,
                FechaNacimiento : user.getFechaNac,
                CodPostal : user.getCodPostal
            }
            localStorage.setItem(user.getDNI,JSON.stringify(miObject));

            addPersona(user);

            inputCodPostal.value = "";
            inputDNI.value = "";
            inputFecha.value = "";
            inputNombre.value = "";

            //Esto no funciona bien, es pq para q haga esto algun efecto
            //Hay q capturar el keyup y coomo queremos q se reseteen al enviar el form, 
            //tendriamos que resetear los backgrouns en vez de esto, no lo considero como relevante y lo dejé asi
            fechaValida = false;
            dniValido = false;
            nombreValido = false; 
            codPostalValido = false;
        }
    });

    const addPersona = (objPersona) => {
        const $article = document.createElement('article');
        $article.classList.add("border","text-center","border-info","w-50","mt-1","mx-auto");
        const $pNombre = document.createElement('p');
        $pNombre.textContent = "Nombre : " + objPersona.getNombre;
        const $pFecha = document.createElement('p');
        $pFecha.textContent = " Nacido en :" +objPersona.getFechaNac + " y con edad de " + regExp.GetNumero(objPersona.getFechaNac);
        const $pDNI = document.createElement('p');
        $pDNI.textContent = " Con DNI " + objPersona.getDNI;
        const $pPostal = document.createElement('p');
        $pPostal.textContent = " Con vivienda en " + objPersona.getCodPostal;

        $article.appendChild($pNombre);
        $article.appendChild($pFecha);
        $article.appendChild($pDNI);
        $article.appendChild($pPostal);
        
        document.querySelector("main").appendChild($article);
    }


