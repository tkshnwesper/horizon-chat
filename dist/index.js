var horizon = Horizon();
var messages = null;

horizon.onReady(function() {
    $(".mform").on("submit", function(e) {
        e.preventDefault();
    });

    messages = horizon("messages");

    var mlist = new Vue({
        el: ".messages",
        data: {
            messageList: null
        }
    });

    messages.order("datetime", "ascending").limit(50).watch().subscribe((docs) => {
        mlist.messageList = docs;
    });

    mlist.$watch('messageList', function(n, o) {
        var m = $(".messages");
        m.scrollTop(m[0].scrollHeight);
    });
});

horizon.connect();

var Message = function(text) {
    this.datetime = new Date();
    this.text = text;

    this.toObject = function() {
        return {
            datetime: this.datetime,
            text: this.text
        }
    }
}

function sendMessage() {
    var msg = $(".mfield").val();
    $(".mfield").val("");
    if(msg && messages) {
        var message = new Message(msg);
        messages.store(message.toObject());
    }
}