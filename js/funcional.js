//crear propiedades del objeto calculadora
let p = {
    tecla: document.querySelectorAll("#calculadora ul li"),
    accion: null,
    digito: null,
    operaciones: document.querySelector("#operaciones"),
    cantidadSignos: 0,
    cantidaddecimales: false,
    resultado: false
}

//crear los métodos
let m = {

    inicio: function () {

        for (let i = 0; i < p.tecla.length; i++) {

            p.tecla[i].addEventListener("click", m.oprimirtecla);

        }

    },

    oprimirtecla: function (tecla) {

        p.accion = tecla.target.getAttribute("class");
        p.digito = tecla.target.innerHTML;

        console.log(p.digito);

        m.calculadora(p.accion, p.digito);

    },

    calculadora: function (accion, digito) {

        switch (accion) {

            case "numero":

                if (p.operaciones.textContent == "0") {

                    p.operaciones.textContent = digito;

                } else {

                    p.operaciones.textContent += digito;

                }
                break;

            case "simbolo":

                p.operaciones.innerHTML += digito;

                break;

            case "decimal":

                p.operaciones.innerHTML += digito;

                break;

            case "igual":

                p.operaciones.innerHTML = eval(p.operaciones.innerHTML);

                break;

        }

    },
    borrarCalculadora: function(){
        p.operaciones.innerHTML = 0 ;
    }

}

//iniciar calculadora
m.inicio();