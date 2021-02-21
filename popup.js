$(function(){

    chrome.storage.sync.get(['total','limit'], function(budget){
        $('#total').text(budget.total);
        $('#limit').text(budget.limit);
        //$('#limit').val(budget.limit);
    });

    $('#spendAmount').click(function(){
        chrome.storage.sync.get(['total','limit'], function(budget){
            var newTotal = 0;
            if (budget.total) {
                newTotal += parseFloat(budget.total);
            }

            var amount = $('#amount').val();
            if(amount) {
                newTotal += parseFloat(amount);
            }

            chrome.storage.sync.set({'total': newTotal}, function(){
                if(amount && newTotal >= budget.limit) {
                    var notifOptions = {
                        type: 'basic', //do image type later
                        iconUrl: 'icon48.png',
                        title: 'Limit reached!',
                        message: "Uh oh! Looks like you've reached your limit!"
                    };
                chrome.notifications.create('limitNotif', notifOptions);
                chrome.notifications.clear('limitNotif')
                }
            });

            $('#total').text(newTotal);
            $('#amount').val('');
        });
    });
    

    /*$('#setLimit').click(function(){
        chrome.storage.sync.get('limit', function(budget){
            var newlimit = $('#limit').val();
            if(newlimit){
                chrome.storage.sync.set({'limit': newlimit}, function(){
                var notifOptions = {
                    type: 'basic', //do image type later
                    iconUrl: 'icon48.png',
                    title: 'Limit Set!',
                    message: "Limit set to" + parseFloat(newlimit)
                };
                chrome.notifications.create('limitNotif', notifOptions);
                chrome.notifications.clear('limitNotif')
                });
            }
            $('#limit').text(newlimit);
        })
          
    });*/

    $('#setLimit').click(function(){
        var newLimit = $('#newLimit').val();
        if(newLimit) {
            chrome.storage.sync.set({'limit': newLimit});
        $('#limit').text(newLimit);
        }
    })

    $('#resetTotal').click(function(){
        chrome.storage.sync.set({'total':0}, function(){
            var notifOptions = {
                type: 'basic', //do image type later
                iconUrl: 'icon48.png',
                title: 'Total Reset!',
                message: "Total spendings reset to 0!"
            };
        chrome.notifications.create('limitNotif', notifOptions);
        chrome.notifications.clear('limitNotif')
        });
        $('#total').text(0);
    });

});


