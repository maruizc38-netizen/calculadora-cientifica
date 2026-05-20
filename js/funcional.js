//crear propiedades del objeto calculadora
let p = {
    tecla: document.querySelectorAll("#calculadora ul li"),
    accion: null,
    digito: null,
    operaciones: document.querySelector("#operaciones"),
    cantisignos: 0,
    cantdecimales: false,
    resultado: false
}

//crear los métodos
let m = {

    inicio: function () {

        for (let i = 0; i < p.tecla.length; i++) {

            p.tecla[i].addEventListener("click", m.oprimirtecla);

        }

        document.addEventListener("keydown", m.teclado);

    },

    oprimirtecla: function (tecla) {

        p.accion = tecla.target.getAttribute("class");
        p.digito = tecla.target.innerHTML;

        console.log(p.digito);

        m.calculadora(p.accion, p.digito);

    },

    teclado: function (evento) {

        let tecla = evento.key;

        if (!isNaN(tecla)) {

            m.calculadora("numero", tecla);

        }

        else if (tecla == "+" || tecla == "-" || tecla == "*" || tecla == "/") {

            m.calculadora("simbolo", tecla);

        }

        else if (tecla == ".") {

            m.calculadora("decimal", tecla);

        }

        else if (tecla == "Enter") {

            m.calculadora("igual", "=");

        }

    },

    calculadora: function (accion, digito) {

        switch (accion) {

            case "numero":

                p.cantisignos = 0;

                if (p.operaciones.innerHTML == "0") {

                    p.operaciones.innerHTML = digito;

                } else {

                    if (p.resultado) {

                        p.resultado = false;
                        p.operaciones.innerHTML = digito;

                    } else {

                        p.operaciones.innerHTML += digito;

                    }

                }

                break;

            case "simbolo":

                p.cantisignos++;

                if (p.cantisignos == 1) {

                    if (p.operaciones.innerHTML == "0") {

                        p.operaciones.innerHTML = "0";

                    } else {

                        p.operaciones.innerHTML += digito;
                        p.cantdecimales = false;

                    }

                }

                break;
            case "simboloes":

                if (digito == "√") {

                    p.operaciones.innerHTML = Math.sqrt(
                        parseFloat(p.operaciones.innerHTML)
                    );

                }

                else if (digito == "x²") {

                    p.operaciones.innerHTML =
                        Math.pow(parseFloat(p.operaciones.innerHTML), 2);

                }

                else if (digito == "sin") {

                    p.operaciones.innerHTML =
                        Math.sin(parseFloat(p.operaciones.innerHTML));

                }

                else if (digito == "cos") {

                    p.operaciones.innerHTML =
                        Math.cos(parseFloat(p.operaciones.innerHTML));

                }

                break;

            case "decimal":

                if (!p.cantdecimales) {

                    p.operaciones.innerHTML += digito;
                    p.cantdecimales = true;

                }

                break;

            case "igual":

                if (p.operaciones.innerHTML.includes("/0")) {

                    p.operaciones.innerHTML = "ERROR";

                } else {

                    p.operaciones.innerHTML = eval(p.operaciones.innerHTML);
                    p.resultado = true;

                }

                break;

        }

    },

    borrarCalculadora: function () {

        p.operaciones.innerHTML = 0;

    }

}

//iniciar calculadora
m.inicio();