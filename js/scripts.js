
     // Defaults to sessionStorage for storing the Facebook token
     openFB.init({appId: '291213201047808'});



     function login() {
       openFB.login(
        function(response) {
         if(response.status === 'connected') {
          alert('Facebook login succeeded');
          $.mobile.changePage( "#menu-home", { transition: "slideup"});
        } else {
          alert('Facebook login failed: ' + response.error);
        }
      }, {scope: 'email,read_stream,publish_stream,user_birthday,user_friends,publish_actions'});
     }

     
     function getInfo() {
       openFB.api({
        path: '/me',
        success: function(data) {
         console.log(JSON.stringify(data));

         document.getElementById("userName").innerHTML = data.name;
         document.getElementById("userEmail").innerHTML = data.email;
         document.getElementById("userBirthday").innerHTML = data.birthday;
         document.getElementById("userPic").src = 'http://graph.facebook.com/' + data.id + '/picture?type=small';
       },
       error: errorHandler});
     }

     function share() {
       openFB.api({
        method: 'POST',
        path: '/me/feed',
        params: {
          name: 'AVERIGUA DONDE TE TOCA VOTAR ',
          link: 'http://s3.amazonaws.com/android.phonegap/slicehost-production/apps/1060107/Eleccionesmunicipales2014-debug.apk',
          message:'No sabes donde te toca votar, numero de mesa o si eres miembro de mesa, ahora puedes acceder a toda esa información desde cualquier dispositivo móvil.',
          picture:'http://webdesignjc.com/phone/elecciones%202014.png'
        },
        success: function() {
         alert('Gracias por compartir esta aplicación');
       },
       error: errorHandler});
     }



     function revoke() {
       openFB.revokePermissions(
        function() {
         alert('Permissions revoked');
       },
       errorHandler);
     }

     function logout() {
       openFB.logout(
        function() {
         alert('Logout successful');
         $.mobile.changePage( "#home", { transition: "slideup"});
       },
       errorHandler);
     }

     function errorHandler(error) {
       alert(error.message);
     }


     $(function() {
      $("#guardardatos").click(function() {
        var fNombre = $("#Nombre").val();
        var fDescripcion = $("#Descripcion").val();
        var fLatY = $("#LatY").val();
        var fLongX = $("#LongX").val();
        $("#Nombre").val(" ");
        $("#Descripcion").val(" ");
        $("#LatY").val(" ");
        $("#LongX").val(" ");

        $.ajax({type: "POST", 
          url: "http://webdesignjc.com/phone/agregar.php",
          data: ({Nombre: fNombre, Descripcion: fDescripcion, LatY: fLatY, LongX: fLongX}),
          cache: false,
          dataType: "text",
          success: Enviamos
        });
      });
      function Enviamos(data){       
        alert(data+"Reporte enviado");
        $.mobile.changePage( "#page3", { transition: "slideup", role:"dialog"});
      }
    });



//enviamos data de facebook a  DB
$(function() {
  $( document ).on( "pageinit", "#menu-home", function( event ) {
    getInfo();
    openFB.api({
      path: '/me',
      success: function(data) {
        console.log(JSON.stringify(data));
        var userid = data.id;
        var usersex = data.gender;
        var username = data.name;
        var useremail = data.email;
        var date = data.birthday;
        var myArray = date.split('/');
        var mes = myArray[0];
        var dia = myArray[1];
        var ano = myArray[2];
        var userbirtday = ano + "-" + mes + "-" + dia;
        $.ajax({type: "POST", 
          url: "http://webdesignjc.com/phone/agregarusuario.php",
          data: ({id: userid,sex: usersex,name: username,email: useremail,birtday: userbirtday}),
          cache: false,
          dataType: "text",
          success: Enviamos
        });

      },
      error: errorHandler});
  });
  function Enviamos(data){       
   // $.mobile.changePage( "#page-alert", { transition: "slideup", role:"dialog"});
 }
});







$(document).ready(function() {
  $("#resultusuario").load('http://webdesignjc.com/phone/buscarusuario.html');
});



$(document).ready(function() {
 $('a.exit').click(function() {
  localStorage.clear();
  navigator.app.exitApp();
  return true;
});
});



















var app = {
  initialize: function() {
    this.bindEvents();
  },
  bindEvents: function() {
    document.addEventListener('deviceready', this.onDeviceReady, false);
  },
  onDeviceReady: function() {
    pictureSource=navigator.camera.PictureSourceType;
    destinationType=navigator.camera.DestinationType;
  }
};

window.onload=function(){
  document.getElementById("foto").style.width = (window.innerWidth-50)+"px";
  document.getElementById("foto").style.height = (window.innerWidth-50)+"px";
  document.getElementById("foto").style.backgroundImage="url('img/cordova.png')";
  document.getElementById("foto").style.backgroundSize="50% 50%";
};

function capturePhoto() {
  navigator.camera.getPicture(onSuccess, onFail, { quality: 90,
    destinationType: Camera.DestinationType.DATA_URL,
    correctOrientation: true,
    targetWidth: 1000,
    targetHeight: 1000
  });
}

function getPhoto(source) {
  navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 90,
    destinationType: destinationType.FILE_URI,
    sourceType: source });
}

function onSuccess(imageData) {
  document.getElementById("foto").style.backgroundImage="url('data:image/jpeg;base64,"+imageData+"')";
  document.getElementById("foto").style.backgroundSize="100% 100%";
}

function onPhotoURISuccess(imageURI) {
  document.getElementById("foto").style.backgroundImage="url('"+imageURI+"')";
  document.getElementById("foto").style.backgroundSize="100% 100%";
}

function onFail(message) {
  alert('Failed because: ' + message);
}



function sendsms(){
 alert("click");
  var contactNumber = '943973537';
  var message= 'hello Cesar';
  window.sms.send(contactNumber , message,
    function () {
     alert('Message successfully sent to' + contactNumber);
   },
   function (event) {
     alert('Message failed due to:' + event);
   }
   );

}



