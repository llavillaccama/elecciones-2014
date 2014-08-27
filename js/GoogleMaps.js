// JavaScript Document

	$( document ).on( "pageinit", "#paginaMapa", "#page2", function(e,data) {

				
				var defaultPos = new google.maps.LatLng(19.289168,-99.653440);
				
				if (navigator.geolocation) {
		                function exito(pos) {
                     		MuestraMapa(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));

                   		}
						function falla(error) {
						//si falla mostrar mpara en posicion por defecto
							alert('Error en servicio Geolocalizador');
							MuestraMapa(defaultPos); 
						}
						
					//maximumAge- Guarda la posicion por 5 minutos 
					//enableHighAccuracy: Se tratan de obtener los mejores resultados posible del GPS
					//timeout: el tiempo maximo que se espera para obtener la posicion en este caso 5 segundos
						var options = {maximumAge: 500000, enableHighAccuracy:true, timeout: 5000};
						navigator.geolocation.getCurrentPosition(exito, falla, options );
					}//FIN IF
					else {
                    MuestraMapa(defaultPos);  // No soporta geolocalizacion y dibuja el mapa en posicion Default
               		 }
	
					 
					 //FUNCION DIBUJAR MAPa
					 function MuestraMapa(latlng) {
						//Recuperar puntos
						var capa = String(latlng);
						var res = capa.replace(/\(|\)/g, '');//Quitar los parentesis
						var latitud=  res.substring(0, res.indexOf(','));
						var longitud=  res.substring(res.indexOf(",") + 2);
						$('#LatY').val(latitud);
						$('#LongX').val(longitud);
						
						var myOptions = {
                        zoom: 16,
                        center: latlng,
						disableDefaultUI: true,
                        mapTypeId: google.maps.MapTypeId.ROADMAP};
						
						var map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);
						
						var infowindow = new google.maps.InfoWindow({
                                  position: latlng,
                                  content: '<p>Tu posición actual</p>'+latlng
								  });
						
						var marker = new google.maps.Marker({
							position: latlng,
							map: map,
							title: "Mi posición",
							animation: google.maps.Animation.DROP
                    	});
						google.maps.event.addListener(marker, 'click', function() {infowindow.open(map,marker);});
						 
					 }// Fin muestra mapa
				
				});