$(document).ready(function () {
    $('.createEditRoomSessions').fancybox({
        maxWidth: 700,
        maxHeight: 600,
        fitToView: false,
        width: '400px',
        height: '330px',
        autoSize: false,
        closeClick: false,
        openEffect: 'none',
        closeEffect: 'none',
        padding: 0,
        closeBtn: false,
    });

});
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

var modelRoomSessions = ko.buildAjaxModel({
    getUrl: getRoomSessionsUrl,
    mapping: RoomSessionsDetailsModel.Mapping,
    isArray: true,
    pagingMode: 'More',
    pageSize: 100,
    extend: {
        sortBy: ko.observable('Name'),
        sortDirection: ko.observable('asc'),
        name: ko.observable(''),
    },
});

function getSearchResults() {
    modelRoomSessions.PageIndex(0);
    modelRoomSessions.getWith(modelRoomSessions.name(), modelRoomSessions.sortBy(), modelRoomSessions.sortDirection());
}
function refreshRoomSessions() {
    modelRoomSessions.get();
    parent.jQuery.fancybox.close();
}
function resetRoomSessions() {
    modelRoomSessions.name('');
    modelRoomSessions.name(undefined);
    //  getSearchResults();
}
$(function () {
    Framework.DataBinder.applyBinding(modelRoomSessions, "roomsessions");
     modelRoomSessions.get();
});