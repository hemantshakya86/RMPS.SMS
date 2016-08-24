$(document).ready(function() {
    $('.createEditCourses').fancybox({
        maxWidth: 700,
        maxHeight: 300,
        fitToView: false,
        width: '410px',
        height: '210px',
        autoSize: false,
        closeClick: false,
        openEffect: 'none',
        closeEffect: 'none',
        padding: 0,
        closeBtn: false,
    });

});
var modelCourses = ko.buildAjaxModel({
    getUrl: getCoursesUrl,
    mapping: CoursesDetailsModel.Mapping,
    isArray: true,
    extend: {
        sortBy: ko.observable('Name'),
        name: ko.observable(''),
        
    },
    onGet: function () {
        console.log(this);
    }
});

function getSearchResults() {
    modelCourses.PageIndex(0);
    modelCourses.getWith(modelCourses.name());
}
function refreshCourses() {
    modelCourses.get();
    parent.jQuery.fancybox.close();
    
}
function resetCourses() {
    modelCourses.name('');
    modelCourses.name(undefined);
  //  getSearchResults();
}
$(function () {
    Framework.DataBinder.applyBinding(modelCourses, "rmps-courses");
    modelCourses.get();
});





