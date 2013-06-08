window.onload = function() {
 
    var messages = [];
    var socket = io.connect('http://elainemosaic.jit.su');
 
    socket.on('message', function (data) {
        if(data) {
            messages.push(data);
            $('body').append('<img src="'+ data +'" />');
        } else {
            console.log("There is a problem:");
        }
    });
 
}