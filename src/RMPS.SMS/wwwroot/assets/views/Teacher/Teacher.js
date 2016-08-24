var model = ko.buildAjaxModel({
    getUrl: getTeacherUrl,
    mapping: TeacherDetailsModel.Mapping,
    isArray: true,
    pagingMode: 'More',
    pageSize: 500,
    extend: {
        sortBy: ko.observable('FirstName'),
        sortDirection: ko.observable('asc'),
        firstName: ko.observable(''),
        lastName: ko.observable(''),
        email: ko.observable('')
    },
});
function refreshTeacher() {
    model.get();
    parent.jQuery.fancybox.close();
}


function getSearchResults() {
    model.PageIndex(0);
    model.getWith(model.firstName(), model.lastName(), model.email(), model.sortBy(), model.sortDirection());
}

function resetUser() {
    model.firstName('');
    model.firstName(undefined);

    model.lastName('');
    model.lastName(undefined);

    model.email('');
    model.email(undefined);

    getSearchResults();
}

$(function () {
    Framework.DataBinder.applyBinding(model, "teacher-detail");
    model.get();
});




