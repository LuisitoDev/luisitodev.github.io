var precio = 0;
var idSkin = 0;

function setDatosSkin(pIdSkin, pPrecio) { 
    idSkin = pIdSkin
    precio = pPrecio; 
}
function getPrecio() { return precio; }
function getIdSkin() { return idSkin; }

function cleanSkins () {
    $( ".skinsCompradasPlayer1" ).empty();
    $( ".skinsCompradasPlayer2" ).empty();


    $( ".skinsParaComprar" ).empty();
}

function comprarSkin () {
    var idUsuario = 0;

    if (localStorage.getItem('UserSesion')!=null) {
        let UserSesion = JSON.parse(localStorage.getItem('UserSesion'));
        idUsuario = UserSesion.id;
    }

    $.ajax({
        url: `https://tanquecitos-api.herokuapp.com/usuarios/comprar-skin`,
        type: 'post',
        data: { 
            'IdUsuario': idUsuario, 
            'IdSkin': idSkin
        },
        success: function(data) {
            debugger;
            var resultado = jQuery.parseJSON( data );
            if (resultado.status == "SUCCESS"){
                
                cleanSkins();
                getSkins(".skinsParaComprar", "mostrar_skins");
                getSkins(".skinsCompradasPlayer1", "mostrar_skins_compradas");
                getSkins(".skinsCompradasPlayer2", "mostrar_skins_compradas");
                closeModal69();
            }
            else if (resultado.status == "ERROR")
                console.log("Error al hacer la petición: ", resultado.message)
        },
        error: function(data) {
            console.log("algo no jalo");
            console.log(data.text);
        },
        failure: function(data) {
            console.log("Failure");
        },
    });
}


$(document).ready(function(){
    paypal.Buttons({
        
        style: {
            shape: 'pill',
            color: 'blue',
            layout: 'horizontal',
            label: 'paypal',
        },

        createOrder: function(data, actions) {
            return actions.order.create({
                purchase_units: [
                    {
                        "intent": "CAPTURE",
                        "amount": {
                            "currency_code":"MXN",
                            "value":precio
                        }
                    }
                ]
            });
        },

        onApprove: function(data, actions) {
            comprarSkin();
        },

        onError: function(err) {
            alert(err);
        }

    }).render('#paypal-button-container');

});