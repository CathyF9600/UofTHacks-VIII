$(function(){
    chrome.storage.sync.get(['total','limit'], function(budget){
        $('#total').text(budget.total);
        $('#limit').text(budget.limit);
    });
    var notifOptions = {
        type: 'basic', //do image type later
        iconUrl: 'icon48.png',
        title: 'Wait!',
        message: "Are you sure you want to make that purchase?"
        };
    chrome.notifications.create('limitNotif', notifOptions);
    chrome.notifications.clear('limitNotif')
});