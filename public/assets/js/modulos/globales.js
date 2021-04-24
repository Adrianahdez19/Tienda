function ajax(type, url, callback) {
  $.ajax({
    type: type,
    url: url,
    success: function(data) {
      data = JSON.parse(data);
      callback(data);
    },
    error: function() {
      callback('error');
    }
  });
}
