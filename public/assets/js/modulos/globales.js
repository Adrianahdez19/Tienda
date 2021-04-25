function ajax(type, url, data, callback) {
  $.ajax({
    type: type,
    url: url,
    data: {data: data},
    dataType: 'JSON',
    success: function(data) {
      callback(data);
    },
    error: function() {
      callback('error');
    }
  });
}
