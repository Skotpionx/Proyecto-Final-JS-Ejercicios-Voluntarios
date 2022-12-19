    const d= document;
    const $body = document.querySelector('body');
    const $nav = $body.querySelector('nav'),
    $navImg = $nav.querySelector("img");

    $div = d.createElement('div');
    $btn = d.createElement('button');
    $btn.classList.add("btn","btn-info");
    $btn.textContent = "¡Click para consultar el tiempo en tu localidad!";
    $div.appendChild($btn);
    $div.setAttribute('style', "display:none");
    $navImg.setAttribute('style','cursor:pointer');
    $nav.appendChild($div);


    // En algunas me la han colado y no es png, le pongo fondo blanco a la card y asi no se nota :(
    const miMap = new Map([
        ['Smoke','visibilidadpoca.png'],
        ['Haze','visibilidadpoca.png'],
        ['Clouds','nubes.png'],
        ['Sand','visibilidadpoca.png'],
        ['Thunderstorm','rayos.png'], 
        ['Clear','despejado.png'],
        ['Squall','visibilidadpoca.png'],
        ['Drizzle','nevada.png'],
        ['Rain','lluvia.png'],
        ['Snow','moeve.png'],
        ['Dust','visibilidadpoca.png'],
        ['Mist','visibilidadpoca.png'],
        ['Fog','visibilidadpoca.png'],
        ['Ash','visibilidadpoca.png'],
        ['Tornado','visibilidadpoca.png'],
    ]);
    
    $label = d.createElement("label");
    $inpt = d.createElement("input");
    $divError = d.createElement('p');
    $btn2 = d.createElement('button');
        
    $divCiudad = d.createElement('div');
    $divCiudad2 = d.createElement('div');
    let activo = false;
    $navImg.addEventListener("click", () =>{
        if(activo == false){
            $navImg.setAttribute("src","captura2.png");
            $div.setAttribute('style','display:block');
            activo = true;
        }else{
            $navImg.setAttribute("src","Captura.png");
            $div.setAttribute('style', "display:none");
            activo = false;
        }
    });
    $btn.addEventListener("click",() =>{

        $label.textContent = "Introduce aquí tu localidad:";
        $label.style.setProperty("display","flex");
        $label.style.setProperty("justify-content","center");
    

        $inpt.setAttribute("type","text");
        $inpt.classList.add("form-control");
        $inpt.setAttribute('style',' width:20%;margin:auto');
    

        $btn2.classList.add("btn","btn-info");
        $btn2.setAttribute("style",'margin-top:0.5%');
        $btn2.textContent = "Consultar";
    
        $div.appendChild($label);
        $div.appendChild($inpt);
        $div.appendChild($btn2);
    });

    $btn2.addEventListener("click", async () => {
        $divCiudad.innerHTML = '';
        $divCiudad2.innerHTML = '';

        try{
            const $pText4 = d.createTextNode("Que si mario que proyectas la voz, no gritas");
            const $divMario = d.createElement('div');
            $divMario.appendChild($pText4);

            const miValidacion = /^[A-z]+[^\@, ]/i;
            const localidadABuscar = $inpt.value;
            debugger;

            // referencia a mario :D
            if(localidadABuscar === "mario"){
                $div.appendChild($divMario);
            }
            else if(miValidacion.test(localidadABuscar)){
                $divMario.setAttribute("display","none");
                $divError.setAttribute("style","display:none");
                const res = await fetch("https://api.openweathermap.org/data/2.5/weather?q="+localidadABuscar.toLowerCase()+"&appid=109b49014520619ccac96c73b75fa6f7&units=metric")
                        json = await res.json();
                if(!res.ok) throw {status: res.status, statusText: res.statusText};
                //Le meto un time out para que al reiniciar el innerHTMl arriba no se vea feo ya que lo hace instantaneamente :)
                setTimeout( () => {
                    $divCiudad.setAttribute("style","display:flex;margin-left:auto;width:50%;justify-content:space-between;text-align:center;margin-top:1%");
                    $divCiudad.classList.add("mx-auto");
                    //SE QUE ESTA NO ES LA MEJOR FORMA DE HACERLO, PERO DBEIDO A FALTA DE TIEMPO LO METO ASI RÁPIDO DEBIDO A QUE LA DIFICULTAD DEL EJERCICIO RADICA EN LA API 
                    $divCiudad.innerHTML += ' <div class="card bg-info bg-gradient" style="width:20%"> <div class="card-body"> <h5 class="card-title"> Localidad: </h5> <p class="card-text">'+json.name+'</p> </div> </div>';
                    $divCiudad.innerHTML += ' <div class="card bg-warning bg-gradient" style="width:20%"> <div class="card-body"> <h5 class="card-title">  Temperatura minima </h5> <p class="card-text">'+json.main.temp_min+'</p> </div> </div>';
                    $divCiudad.innerHTML += ' <div class="card bg-secondary bg-gradient" style="width:20%"> <div class="card-body"> <h5 class="card-title"> Temperatura máxima </h5> <p class="card-text">'+json.main.temp_max+'</p> </div> </div>';
                    $div.appendChild($divCiudad);
    
    
                    $divCiudad2.setAttribute("style","display:flex;margin-left:auto;width:50%;justify-content:space-between;text-align:center;margin-top:1%");
                    $divCiudad2.classList.add("mx-auto");
                    $divCiudad2.innerHTML = ' <div class="card bg-secondary bg-gradient" style="width:20%"> <div class="card-body"> <h5 class="card-title"> Sensación termica </h5> <p class="card-text">'+json.main.feels_like+'</p> </div> </div>';
                    $divCiudad2.innerHTML += ' <div class="card bg-white bg-gradient" style="width:20%"> <div class="card-body"> <h5 class="card-title">  Tiempo </h5> <p class="card-text"> <img src="'+miMap.get(json.weather[0].main)+'">  </p> </div> </div>';
                    $divCiudad2.innerHTML += ' <div class="card  bg-warning bg-gradient" style="width:20%"> <div class="card-body"> <h5 class="card-title"> Temperatura actual </h5> <p class="card-text">'+json.main.temp+'</p> </div> </div>';
                    $div.appendChild($divCiudad2);
                },2000);
            }else{
                const $pText2 = d.createTextNode("Esto no es válido mi pana");
                const $diverror = d.createElement('div');
                $diverror.appendChild($pText2);
                $div.appendChild($diverror);
            }
        }catch (error){
            if(error.status == 404){
                const $pText3 = d.createTextNode("Esto no es válido mi pana");
                const $div404 = d.createElement('div');
                $div404.appendChild($pText3);
                $div.appendChild($div404);
            }else{
                alert(error);
            }
        }

    });

