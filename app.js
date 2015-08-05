// Esta es una aplicacion GPS para el Pebble


// solicitud de las coordenadas
var posicionar = function(){
	navigator.geolocation.getCurrentPosition(function(pos){
		if(pos){
			var lat = pos.coords.latitude;
			var lon = pos.coords.longitude;
			
			simply.fullscreen(true);

			
			simply.text({
				style: 'large',
				title:'Mapit',
				body: 'Arriba mandar tu posicion a alguien\n'+
					  'Central para mandar un S.O.S\n'+
					  'Abajo para recibir tu Posicion\n'
			});
			simply.on('singleClick', 'down', function(e){
				var miss = '<a href="//maps.apple.com/?ll='+lat+','+lon+'">Apple Maps</a>'+
						'\n<a href="http://google.com/maps/@' + lat + ',' + lon+',15z"';
				ajax({
					method: "POST",
			        url: "https://api.pushover.net/1/messages.json",
			        data: {
			        	token: "a9UDP7Mvt5GCrvLKhjsqn1arqQ9jMm",
				        user: "uo7oH8QGgC8CXVizfy4W3m6U2Q3zS1",
				        device: "iphone",
				        message: miss
				    	}
			    	},
			        function(data){
			        	simply.text({
			        		style:'large',
			        		title: 'Posicion enviada',
			        		subtitle: 'Presiona cualquier boton para volver'
			        	});
			        	simply.off('singleClick');

			        	
			        },
			        function(data){ simply.body("Fallo al enviar") }
		        );
		    });
		}
		else{
			simply.body('Mapit necesita que el navegador web de tu telefono(Safari, Chrome) tenga los permisos de localizacion activados')
		};
	});
};
posicionar();