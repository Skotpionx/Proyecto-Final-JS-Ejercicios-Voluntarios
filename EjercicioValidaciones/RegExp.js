// Ejercicio que calcule la edad a través de una funcion llamada calculo edad que habrá que exportar
// verificamos el dni con una regExp a traved de una funcion ( keyup??) 
// obtenemos la letra del dni y verificamos si es correcta
// comprobamos que el codigo postal tenga 5 digitos supongo
// fecha de nacimiento > nada se supone (se intentará hacer algo si tengo tiempo)
// nombre > tampoco nada 


export const calculoEdad = (fechaNac) => {
    const fechaActual = new Date();
    const aux = fechaNac.split("-");
    const fechaaNac = new Date();
    fechaaNac.setFullYear(aux[2]);
    fechaaNac.setMonth(aux[1]);
    fechaaNac.setDate(aux[0]);
    return Math.floor((fechaActual.getTime()-fechaaNac.getTime())/(1000*60*60*24*365));
}


//Esto es un intento de función para obtener solamente los años que tiene ( ) un poco raro
export const GetNumero = (fechaNac) => {
    const fechaaNac = new Date(fechaNac);
    return 2022 - fechaaNac.getFullYear();
}

export const comprobarDNI = (dni) => {
    const letrasPosibles = ["T","R","W","A","G","M","Y","F","P","D","X","B","N","J","Z","S","Q","V","H","L","C","K","E"];
    const validadorDNI = /(\d{8})[ABCDEFGHJKLMNPQRSTVWXYZ]/gi;
    return validadorDNI.test(dni) && (dni.substring(8).toUpperCase() === letrasPosibles[dni.substring(0,8)%23]) ;
}
export const comprobarCodPostal = (codPost) => /^\d{5}$/gi.test(codPost);