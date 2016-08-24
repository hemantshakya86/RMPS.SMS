
var model = ko.buildAjaxModel({
    getUrl: getSessionsUrl,
    mapping: SessionDetailsModel.Mapping,
    isArray: true,
    pagingMode: 'More',
    pageSize: 500,
    extend: {
        sortBy: ko.observable('StartDate'),
        sortDirection: ko.observable('asc'),
        StartDate: ko.observable(''),
        EndDate: ko.observable(''),
    },
});

function getSearchResultSession() {
    model.PageIndex(0);
    model.getWith(model.StartDate(), model.EndDate(), model.sortBy(), model.sortDirection());
}

$(function () {
    Framework.DataBinder.applyBinding(model, "student-sessions");
    model.get();
});

//function getSearchResultRole() {
//    modelRole.PageIndex(0);
//    modelRole.getWith(modelRole.name(), modelRole.groupName(), modelRole.sortBy(), modelRole.sortDirection());
//}

function resetSession() {
    model.StartDate('');
    model.StartDate(undefined);
    model.EndDate('');
    model.EndDate(undefined);
    getSearchResultSession();
}

function refreshSession() {
    model.get();
    parent.jQuery.fancybox.close();
}