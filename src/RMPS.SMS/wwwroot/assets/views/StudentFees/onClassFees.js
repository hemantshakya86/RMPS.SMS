//$(document).ready(function () {
//    $('.createEditOnClassFees').fancybox({
//        maxWidth: 700,
//        maxHeight: 600,
//        fitToView: false,
//        width: '400px',
//        height: '330px',
//        autoSize: false,
//        closeClick: false,
//        openEffect: 'none',
//        closeEffect: 'none',
//        padding: 0,
//        closeBtn: false,
//    });

//});
$('.deleteRoomSessions').fancybox({
    maxWidth: 1000,
    maxHeight: 1000,
    fitToView: false,
    width: '900px',
    height: '600px',
    autoSize: false,
    closeClick: false,
    openEffect: 'none',
    closeEffect: 'none',
    padding: 0,
    closeBtn: false,
});

var model = ko.buildAjaxModel({
    getUrl: getAllRoomFeesUrl,
    mapping: RoomFeesModel.Mapping,
    isArray: true
});

//function getSearchResults() {
//    modelRoomSessions.PageIndex(0);
//    modelRoomSessions.getWith(modelRoomSessions.name(), modelRoomSessions.sortBy(), modelRoomSessions.sortDirection());
//}
function refreshRoomSessions() {
    model.get();
    parent.jQuery.fancybox.close();
}
function resetRoomSessions() {
    model.name('');
    model.name(undefined);
    //  getSearchResults();
}
$(function () {
    Framework.DataBinder.applyBinding(model, "onclass-fees");
    model.get();
});