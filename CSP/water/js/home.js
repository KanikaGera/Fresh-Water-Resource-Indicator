 //      const host = `http://${ location.hostname }:57772`;
 //      const hostapi = host + `/water/api`;  

      var zoomlevel=5;
      var map, places, infoWindow;
      var marker;
      var autocomplete;
      var countryRestrict = {'country': 'IN'};
      var pinImage,pinImage2;
      var infowindow;
      var infowindow2;  


 //      $(window).resize(function(){
 //        $('#map').css("height",$(window).height());
 //        $('#map').css("width",$(window).width());
 //        google.maps.event.trigger(map, 'resize');
 //        map.setZoom( map.getZoom() );
 //       });

      function initMap() 
      {       
        
          map = new google.maps.Map(document.getElementById('map'), {
          zoom: zoomlevel,
          center: {lat: 23.5937, lng: 78.9629},
          disableDefaultUI: true,
          mapTypeControl: false,
          panControl: false,
          zoomControl: true,
          streetViewControl: false, 
          scrollwheel: false,
	  mapTypeId:'hybrid',
	           
        });
              
        google.maps.event.addDomListener(window, 'resize', function() {
        var center = {lat: 23.5937, lng: 78.9629} ; //map.getCenter();
        google.maps.event.trigger(map, 'resize');
        map.setCenter(center); 
        map.setZoom(zoomlevel);
        });

        marker = new google.maps.Marker({
          position: {lat: 23.5937, lng: 78.9629},
          map: map,
          title: 'Select Location',
	  
        });
        marker.setAnimation(google.maps.Animation.BOUNCE);
            
        autocomplete = new google.maps.places.Autocomplete(
              document.getElementById('autocomplete'), {
              types: ['geocode'],
              componentRestrictions: countryRestrict
            });
        places = new google.maps.places.PlacesService(map);

        autocomplete.addListener('place_changed', onPlaceChanged);
      
        var input = document.getElementById('autocomplete');
        google.maps.event.addDomListener(input, 'keydown', function(event) { 
            if (event.keyCode === 13) { 
                event.preventDefault(); 
            }
          }); 
         
         var contentString='<div id="okay">Click for Details</div>';
         infowindow = new google.maps.InfoWindow({
            content: contentString
            });
            $(document).on('click','div#okay',function(e){
				$("#okay").click(function(){
					WeatherDetail(marker.getPosition().lat(),marker.getPosition().lng());
					$("#pmodal").modal();
				});
				//alert('damn'+e.currentTarget.textContent);
            });

        infowindow2=new google.maps.InfoWindow({
        	content:contentString
        });
        function placeMarker(location) {
              marker.setMap(null)
              marker = new google.maps.Marker({
              position: location, 
              map: map
              });
        marker.setAnimation(google.maps.Animation.BOUNCE);

             }

        function onPlaceChanged() {
            var place = autocomplete.getPlace();
            if (place.geometry) {
              map.panTo(place.geometry.location);
              placeMarker(place.geometry.location);
              form1.reset();
              zoomlevel=7;
              map.setZoom(zoomlevel);  
             infowindow.open(map, marker);
             console.log("Done");
             StateNameFromCoordinates(marker.getPosition().lat(),marker.getPosition().lng());
              } else {
              document.getElementById('autocomplete').placeholder = 'Search';
            }
          }


         map.addListener('click', function(e) {
                placeMarker(e.latLng);
                //map.setZoom(zoomlevel+=2);
                map.setZoom(7);
                console.log(zoomlevel);
                infowindow.open(map, marker);
                map.setCenter(marker.getPosition());
                //WeatherDetail(e.latLng.lat(),e.latLng.lng());
                localStorage.setItem("latitude",e.latLng.lat());
				localStorage.setItem("longitude",e.latLng.lng());
                StateNameFromCoordinates(e.latLng.lat(),e.latLng.lng());
             });          
      
        
        
         var pinColor = "0000FF";
         pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
                        new google.maps.Size(21, 34),
                        new google.maps.Point(0,0),
                        new google.maps.Point(10, 34));
        
        
         var pinColor2 = "FFB6C1";
         pinImage2 = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor2,
                        new google.maps.Size(21, 34),
                        new google.maps.Point(0,0),
                        new google.maps.Point(10, 34));
        
              
        
        }
 
        function WeatherDetail(latitude,longitude)
			{
					var xmlhttp = new XMLHttpRequest();
					var url ="http://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longitude+"&APPID=9aad73724ff31e833b1e14dfbf5a6f9e";
					xmlhttp.open("GET", url, true);
					xmlhttp.send();
					var str=""
					xmlhttp.onreadystatechange = function()
					{
						if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
						{	var myArr = JSON.parse(xmlhttp.responseText);
							//console.log(myArr.main)
							str= '<tr><td>Temperature</td><td class="text-right">'+myArr.main.temp+'&deg K'+'</td></tr><tr><td>Pressure</td> <td class="text-right">'+myArr.main.pressure+'</td></tr><tr><td>Humidity</td><td class="text-right">'+myArr.main.humidity+'</td></tr>';
							//document.getElementById("redOK").innerHTML=str;
							
							var xhr = new XMLHttpRequest();
 							var url ="http://localhost:57772/water/api/index";
                            //var url = hostapi + "/index";
 							xhr.open("POST", url, true);
 							xhr.setRequestHeader("Access-Control-Allow-Origin","*");
							xhr.setRequestHeader("Access-Control-Allow-Credentials", "true");
							
							var statename="GUJARAT"
							xhr.send(statename);
							xhr.onreadystatechange = function()
								{  if (xhr.readyState == 4 && xhr.status == 200)
									{   
										var myArr = JSON.parse(xhr.responseText);
			                            str=str +'<tr><td>Water Index</td><td class="text-right">'+myArr.index+'</td></tr>';
 			                            console.log("Inner HTML iS"+str);
 			                           document.getElementById('redOK').innerHTML=str;
 			                        } 
 			                    }
 			              
	                    
						}
					}
			}


       function StateNameFromCoordinates(lat,lng)
        {           console.log("StateNAmeFromCoordinates "+lat+","+lng);
                    var xmlhttp = new XMLHttpRequest();
					var url="https://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+lng+"&key=AIzaSyA7wYFmWd1SDTDqq7L990Gk5oZTgoV_cBA";            
					xmlhttp.open("GET", url, true);
					xmlhttp.send();
					
					xmlhttp.onreadystatechange = function()
					{
						if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
						{
							var myArr = JSON.parse(xmlhttp.responseText);
                            DistNamefromState(myArr.results[0].address_components[3].long_name);
                            RiverLocation(myArr.results[0].address_components[3].long_name);
						}
					}
        }
        function RiverLocation(statename)
        {
        			var xmlhttp = new XMLHttpRequest();
					var url ="http://localhost:57772/water/api/river";
                    //var url = hostapi + "/river";
					xmlhttp.open("POST", url, true);
                    xmlhttp.setRequestHeader("Access-Control-Allow-Origin","*");
                    xmlhttp.setRequestHeader("Access-Control-Allow-Credentials", "true");
                    xmlhttp.send(statename);
					xmlhttp.onreadystatechange = function()
					{  if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
						{   
							var myArr = JSON.parse(xmlhttp.responseText);
                            for(var i=0;i<myArr.location.length;i++)
                            {  console.log(myArr.location[i]);
                                LocationFromName(myArr.location[i],1);
                            }
                            
                        }
					}
					
	
        }
        
        function DistNamefromState(statename)
			{       
					var xmlhttp = new XMLHttpRequest();
					var url ="http://localhost:57772/water/api/districts/"+statename;
                    //var url = hostapi + "/districts/"+statename;
					xmlhttp.open("GET", url, true);
                    xmlhttp.setRequestHeader("Access-Control-Allow-Origin","*");
                    xmlhttp.setRequestHeader("Access-Control-Allow-Credentials", "true");
                   	xmlhttp.send();
					xmlhttp.onreadystatechange = function()
					{  if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
						{   
							var myArr = JSON.parse(xmlhttp.responseText);
                            //for(var i=0;i<myArr.names.length;i++)
                            for(var i=0;i<myArr.names.length;i++)
                            {   //console.log(myArr.names[i]);
                                LocationFromName(myArr.names[i],0);
                            }
                               
                                //console.log(myArr.names);
                        }
					}
			}

        
       //Draw MArker at Districts where data is available if param=0
       //Draw Marker at Water Body of region if param=1
         function LocationFromName(str,param)
        {           
                    var xmlhttp = new XMLHttpRequest();
					var url ="https://maps.googleapis.com/maps/api/geocode/json?address="+str+"&key=AIzaSyA7wYFmWd1SDTDqq7L990Gk5oZTgoV_cBA";
					xmlhttp.open("GET", url, true);
					xmlhttp.send();
					
					xmlhttp.onreadystatechange = function()
					{
						if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
						{
							var myArr = JSON.parse(xmlhttp.responseText);
							if (param==0)
								drawMarker(myArr.results[0].geometry.location,str);
                            else
                            	drawMarkerWater(myArr.results[0].geometry.location,str);
                            //console.log(myArr.results[0].geometry.location);
						}
					}
         
        
        }
        
         
        function drawMarker(location,str)
        {  
           var marker1=new google.maps.Marker({
            position: location,
            map: map,
            icon: pinImage
        });
            str=str.substring(0, str.indexOf("+"));
            google.maps.event.addDomListener(marker1, 'click', function(){
             //console.log("Calling"+str);
             $("#pmodal").modal();
             displayImpurity(str);

             });
           
        }

        function drawMarkerWater(location,str)
        {  
           var marker1=new google.maps.Marker({
            position: location,
            map: map,
            icon: pinImage2
            });
            
            google.maps.event.addDomListener(marker1, 'click', function(){
	            		var xmlhttp = new XMLHttpRequest();
	            		var url ="http://localhost:57772/water/api/indexI";
                        //var url = hostapi + "/indexI";
						xmlhttp.open("POST", url, true);
	                    xmlhttp.setRequestHeader("Access-Control-Allow-Origin","*");
	                    xmlhttp.setRequestHeader("Access-Control-Allow-Credentials", "true");
	                   	xmlhttp.send(str);
						xmlhttp.onreadystatechange = function()
						{  if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
							{   
								var myArr = JSON.parse(xmlhttp.responseText);
	                            var contentString='<b style="color:black;">'+'Index is '+myArr.index+'</b>';
						        infowindow2.setContent(contentString );
						        infowindow2.open(map,marker1);
						     }
	                    }
                  });

        }
        
        
       
        
       

    function displayImpurity(distName)
        {			console.log("Calling"+distName);
                    var xmlhttp = new XMLHttpRequest();
					var url ="http://localhost:57772/water/api/impurity/"+distName;
                    //var url = hostapi + "/impurity/"+distName;
					xmlhttp.open("GET", url, true);
                    xmlhttp.setRequestHeader("Access-Control-Allow-Origin","*");
                    xmlhttp.setRequestHeader("Access-Control-Allow-Credentials", "true");
                   	xmlhttp.send();
					xmlhttp.onreadystatechange = function()
					{  if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
						{   console.log("\nImpurities at"+distName);
							var myArr = JSON.parse(xmlhttp.responseText);
                            //for(var i=0;i<myArr.names.length;i++)
                            var str=" ";
                            for(var i=0;i<myArr.impurityName.length;i++)
                            {   //console.log(myArr.impurityName[i]+"\n");
                                str+=myArr.impurityName[i]+"\n"
                                //LocationFromName(myArr.names[i]);
//                                contentString ='<p>'+myArr.impurityName[i]+'</p><br/>';
//                                new google.maps.InfoWindow({
//                                    content: contentString
//                                    });
                                                         
                            }
                            document.getElementById('redOK').innerHTML='<p>'+str+'</p>'
                               
                                //console.log(myArr.names);
                        }
                    }
        }
$(document).ready(function(){
    $("#myBtn").click(function(){
        $("#myModal").modal();
    });
});
$(document).ready(function(){
    $("#Rate").click(function(){
        $("#rateModal").modal();
    });
});