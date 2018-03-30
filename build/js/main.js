(function ($) {
	"use strict";

   /**
    * Ajax request to NASA Neo API
    */

   $(function() {

      // set some initial variables
		var neosData;
      var neosTables = '';

      var today = moment().format('YYYY-MM-DD');
      var weekFromNow = moment().add(6, 'days').format('YYYY-MM-DD');
      var apiKey = 'FZyUIK92Ad3nAQQowqtLqyHROaJVaEIoJlIqklhj';
      var endpoint = 'https://api.nasa.gov/neo/rest/v1/feed?start_date=' + today + '&end_date=' + weekFromNow + '&api_key=' + apiKey;

      var $loader = $('.ajax-loader');
		var $neos = $('.neos-list');

      $.ajax({
         url: endpoint,
         method: 'get',
      }).done(function(data) {
         neosData = data.near_earth_objects;

         Object.keys(neosData).sort().forEach(function(value, key) {
            var dayData = neosData[value];
            var day = moment(value).format('dddd, MMMM DD, YYYY');
            var nameHeader = 'Name';
            var diameterHeader = 'Est. Max. Diameter';
            var missHeader = 'Miss Distance';
            var velocityHeader = 'Relative Velocity';
            var hazardousHeader = 'Hazardous?';

            neosTables += '<h3>' + day + '</h3>'
            neosTables += '<table>';
               neosTables += '<thead>';
                  neosTables += '<tr>';
                     neosTables += '<th>' + nameHeader + '</th>';
                     neosTables += '<th>' + diameterHeader + '</th>';
                     neosTables += '<th>' + missHeader + '</th>';
                     neosTables += '<th>' + velocityHeader + '</th>';
                     neosTables += '<th>' + hazardousHeader + '</th>';
                  neosTables += '</tr>';
               neosTables += '</thead>';
               neosTables += '<tbody>';

            $.each(dayData, function(key, value) {

               var hazardous = value.is_potentially_hazardous_asteroid ? 'Call Bruce Willis' : 'Not this time';

               neosTables += '<tr>';
                  neosTables += '<td data-header="' + nameHeader + '"><a href="' + value.nasa_jpl_url + '">' + value.name + '</a></td>';
                  neosTables += '<td data-header="' + diameterHeader + '">' + numberFormatting(value.estimated_diameter.meters.estimated_diameter_max) + ' m</td>';
                  neosTables += '<td data-header="' + missHeader + '">' + numberFormatting(value.close_approach_data[0].miss_distance.kilometers) + ' km</td>';
                  neosTables += '<td data-header="' + velocityHeader + '">' + numberFormatting(value.close_approach_data[0].relative_velocity.kilometers_per_hour) + ' km/h</td>';
                  neosTables += '<td data-header="' + hazardousHeader + '">' + hazardous + '</td>';
               neosTables += '</tr>';
            });

            neosTables += '</tbody>';
            neosTables += '</table>';
         });

         $('.neos-list').append(neosTables);

      }).fail(function() {

      }).always(function() {
         $loader.hide();
      });

   });

   // Helper function for formatting large number data
   function numberFormatting(x) {
      return Math.round(x).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
   }

}(jQuery));
