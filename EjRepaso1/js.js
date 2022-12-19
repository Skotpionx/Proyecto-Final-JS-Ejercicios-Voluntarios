

    class Coche{
        constructor(modelo, color, kms, combustible, consumo){
            this._modelo = modelo;
            this._color = color;
            this._kms = kms;
            this._combustible = combustible;
            this._consumo = consumo;
        }



        get getModelo(){
            return this._modelo;
        }
        get getColor(){
            return this._color;
        }
        get getKms(){
            return this._kms;
        }
        get getCombustible(){
            return this._combustible;
        }
        get getConsumo(){
            return this._consumo;
        }

        addKms = (kms) => {
            if(typeof kms === "number")  {
                this._kms += kms;
                return true;
            }
        }

        

        //Este total gastado es en total de los km del coche ??
        // He supueto que es el total gastado a lo largo de todos los km , aunque no tiene sentido debido a que el precio
        // del combustible va fluctuando pero bueno
        calcularTotalGastado = () => {
            let preciocombustible ;
            if(this._combustible === "diesel")  preciocombustible = 1.80;
            if(this._combustible === "gasolina") preciocombustible = 1.70;
            return ((this._consumo*this._kms)/100)*preciocombustible;
        }
    }

    const coche1 = new Coche("Seat","Rojo",134,"gasolina",6);
    const coche2 = new Coche("Opel","Azul",110,"gasolina",10);
    const coche3 = new Coche("BMW","Gris",220,"diesel",8);
    const coche4 = new Coche("Mercedes","Gris Plateado",50,"diesel",4);
    const coche5 = new Coche("Golf","Verde",554,"diesel",13);


    const addToLocalStorage = (coche) => {
        const tempObject = {
            "Modelo": coche.getModelo,
            "Color" : coche.getColor,
            "Kms" : coche.getKms,
            "Combustible": coche.getCombustible,
            "Consumo" : coche.getConsumo,
            "Total Gastado": coche.calcularTotalGastado(),
        }
        localStorage.setItem(localStorage.length, JSON.stringify(tempObject));
    }

    const garaje = [coche1,coche2,coche3,coche4,coche5];


    // TEMPLATES
    const $body = document.querySelector("body");
    const $d = document;
    const $template = document.querySelector("template").content;
    let $fragment = new DocumentFragment();

    
    const miArray = ["a.jpg",
                    "c.jpg",
                    "d.jpg",
                    "v.jpg",
                    "índice.jpg"];

                    let aux = 1;
                    let contadorfoto = 0;
    // Añadimos el primer node

    for(const coche of garaje){
        setTimeout( () => {
            const $div = $d.createElement('div');
            const modelo =  $d.createElement('p'),
                combustible =$d.createElement('p');
                consumo =$d.createElement('p');
                color =$d.createElement('p');
    
                const $divContenedor = $d.createElement('div');
    
                modelo.textContent = "El modelo de este coche es :" + coche.getModelo;
                combustible.textContent = "El combustible de este coche es :" + coche.getCombustible;
                consumo.textContent = "El consumo de este coche es :" + coche.getConsumo;
                color.textContent = "El color de este coche es :" + coche.getColor;
    
                $div.appendChild(modelo);
                $div.appendChild(combustible);
                $div.appendChild(consumo);
                $div.appendChild(color);

                const $img = $d.createElement('img');
                    $img.setAttribute('src', miArray[contadorfoto]);
                    $img.setAttribute('width', '50%');
                    $divContenedor.setAttribute('style','display: flex;width: 40%;margin: auto;margin-top: 2%;border: 1px solid black');
                    $divContenedor.appendChild($img);
                    $divContenedor.appendChild($div);
                    $template.appendChild($divContenedor);
                    $body.appendChild($template);
                    contadorfoto++;
        }, 2000 * aux);
        aux++;
    }



    // Se clona el template

