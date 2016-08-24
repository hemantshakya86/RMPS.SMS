$(document).ready(function() {
    $('.createEditClassRooms').fancybox({
        maxWidth: 700,
        maxHeight: 300,
        fitToView: false,
        width: '410px',
        height: '200px',
        autoSize: false,
        closeClick: false,
        openEffect: 'none',
        closeEffect: 'none',
        padding: 0,
        closeBtn: false,
    });

});
var modelClassRooms = ko.buildAjaxModel({
    getUrl: getClassRoomUrl,
    mapping: ClassRoomDetailsModel.Mapping,
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
    modelClassRooms.PageIndex(0);
    modelClassRooms.getWith(modelClassRooms.name(), modelClassRooms.sortBy(), modelClassRooms.sortDirection());
}
function refreshClassRooms() {
    modelClassRooms.get();
    parent.jQuery.fancybox.close();
    
}
function resetClassRooms() {
    modelClassRooms.name('');
    modelClassRooms.name(undefined);
  //  getSearchResults();
}
$(function () {
    Framework.DataBinder.applyBinding(modelClassRooms, "classrooms");
    modelClassRooms.get();
});





