"use strict";

(function(document, $) {
  const API_URL = 'http://localhost:3000/api/v1/';
  $(document).ready(function() {
    $.noConflict();

    function tableRows(data) {
      return data.map(function(tableRow, index) {
        return '<tr>' +
          '<td scope="row">' + index + '</td>' +
          '<td>' + tableRow.text + '</td>' +
          '<td>' + tableRow.agentId + '</td>' +
          '</tr>';
      }).join('');
    }

    $.get(API_URL + '/entries', function(data, status) {
      if (status === 'success') {
        $('tbody.table-data')[0].innerHTML = tableRows(data);
      }
    })
  })
})(document, $);