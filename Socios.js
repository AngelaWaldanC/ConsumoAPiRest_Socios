var UrlGetSocios = 'http://localhost:90/G5_19/controller/Socios.php?op=GetSocios';
var UrlPostSocios = 'http://localhost:90/G5_19/controller/Socios.php?op=InsertSocios';
var UrlGetUno = 'http://localhost:90/G5_19/controller/Socios.php?op=GetUno';
var UrlPutSocios = 'http://localhost:90/G5_19/controller/Socios.php?op=UpdateSocios';
var UrlDeleteSocios= 'http://localhost:90/G5_19/controller/Socios.php?op=DeleteSocios';

$(document).ready(function(){
    CargarSocios();
});

function CargarSocios(){
    $.ajax({
        url: UrlGetSocios,
        type: 'GET',
        datatype: 'JSON',
        success: function(response){
            var MiItems = response;
            var Valores = '';

            for(i=0; i<MiItems.length; i++){
                Valores += '<tr>'+
                '<td>' + MiItems[i].ID + '</td>'+
                '<td>' + MiItems[i].NOMBRE + '</td>'+
                '<td>' + MiItems[i].RAZON_SOCIAL + '</td>'+
                '<td>' + MiItems[i].DIRECCION + '</td>'+
                '<td>' + MiItems[i].TIPO_SOCIO + '</td>'+
                '<td>' + MiItems[i].CONTACTO + '</td>'+
                '<td>' + MiItems[i].EMAIL + '</td>'+
                '<td>' + MiItems[i].FECHA_CREADO + '</td>'+
                '<td>' + MiItems[i].ESTADO + '</td>'+
                '<td>' + MiItems[i].TELEFONO + '</td>'+
                '<td>' +
                '<button class="btn btn-warning" onclick="CargarSocio('+MiItems[i].ID+')">Editar</button>'+
                '<button class="btn btn-danger" onclick="EliminarSocios('+MiItems[i].ID+')">Eliminar</button>'+                
                '</td>' +
                '</tr>';
                $('.socios').html(Valores);
            }
        }
    });
}

function AgregarSocio(){
    var datosocio= {
        ID: $('#ID').val(),
        NOMBRE: $('#NOMBRE').val(),
        RAZONSOCIAL: $('#RAZONSOCIAL').val(),
        DIRECCION: $('#DIRECCION').val(),
        TIPOSOCIO: $('#TIPOSOCIO').val(),
        CONTACTO: $('#CONTACTO').val(),
        EMAIL: $('#EMAIL').val(),
        FECHACREADO: $('#FECHACREADO').val(),
        ESTADO: $('#ESTADO').val(),
        TELEFONO: $('#TELEFONO').val()
    };
    var datosociojson= JSON.stringify(datosocio);

    $.ajax({
        url:UrlPostSocios,
        type:'POST',
        data: datosociojson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response){
            console.log(response);
        }
    });
    alert("Socio Agregado");
}

function CargarSocio(idsocio){
    var datosocio = {
        ID: idsocio
    };
    var datosociojson= JSON.stringify(datosocio);

    $.ajax({
        url: UrlGetUno,
        type: 'POST',
        data: datosociojson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response){
            var MiItems = response;
            $('#ID').val(MiItems[0].ID);
            $('#NOMBRE').val(MiItems[0].NOMBRE);
            $('#RAZONSOCIAL').val(MiItems[0].RAZON_SOCIAL);
            $('#DIRECCION').val(MiItems[0].DIRECCION);
            $('#TIPOSOCIO').val(MiItems[0].TIPO_SOCIO);
            $('#CONTACTO').val(MiItems[0].CONTACTO);
            $('#EMAIL').val(MiItems[0].EMAIL);
            $('#FECHACREADO').val(MiItems[0].FECHA_CREADO);
            $('#ESTADO').val(MiItems[0].ESTADO);
            $('#TELEFONO').val(MiItems[0].TELEFONO);
            var btnactualizar = '<input type="submit" id="btnactualizar" onclick="ActualizarSocio(' + MiItems[0].ID + ')"' +
            'value="Actualizar Socio" class="btn btn-info"></input>';
            $('.button').html(btnactualizar);
        }
    });
}

function ActualizarSocio(idsocio){
    var datosocio = {
        ID: idsocio,
        NOMBRE: $('#NOMBRE').val(),
        RAZONSOCIAL: $('#RAZONSOCIAL').val(),
        DIRECCION: $('#DIRECCION').val(),
        TIPOSOCIO: $('#TIPOSOCIO').val(),
        CONTACTO: $('#CONTACTO').val(),
        EMAIL: $('#EMAIL').val(),
        FECHACREADO: $('#FECHACREADO').val(),
        ESTADO: $('#ESTADO').val(),
        TELEFONO: $('#TELEFONO').val()
    };
    var datosociojson = JSON.stringify(datosocio);

    $.ajax({
        url: UrlPutSocios,
        type: 'PUT',
        data: datosociojson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function (response) {
            console.log(response);
        }
    });
    alert("Socio Actualizado");
}

function EliminarSocios(idsocio) {
    var datosocio = {
        ID: idsocio
    };
    var datosociojson = JSON.stringify(datosocio);

    $.ajax({
        url: UrlDeleteSocios,
        type: 'DELETE',
        data: datosociojson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function (response) {
            console.log(response);
        }
    });
    alert("Socio Borrado");
}