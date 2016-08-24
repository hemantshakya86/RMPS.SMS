
$(document).ready(function () {
    $('.createEditUser').fancybox({
        maxWidth: 900,
        maxHeight: 900,
        fitToView: false,
        width: '800px',
        height: '520px',
        autoSize: false,
        closeClick: false,
        openEffect: 'none',
        closeEffect: 'none',
        padding: 0,
        closeBtn: false,
    });

    $('.editEditUser').fancybox({
        maxWidth: 900,
        maxHeight: 900,
        fitToView: false,
        width: '800px',
        height: '430px',
        autoSize: false,
        closeClick: false,
        openEffect: 'none',
        closeEffect: 'none',
        padding: 0,
        closeBtn: false,
    });

    $('.createEditUserRole').fancybox({
        maxWidth: 700,
        maxHeight: 500,
        fitToView: false,
        width: '410px',
        height: '280px',
        autoSize: false,
        closeClick: false,
        openEffect: 'none',
        closeEffect: 'none',
        padding: 0,
        closeBtn: false,
    });

   

    $('.deleteUser').fancybox({
        maxWidth: 500,
        maxHeight: 400,
        fitToView: false,
        width: '400px',
        height: '200px',
        autoSize: false,
        closeClick: false,
        openEffect: 'none',
        closeEffect: 'none',
        padding: 0,
        closeBtn: false,
    });
});



var modelRole = ko.buildAjaxModel({
    getUrl: getRoleUrl,
    mapping: UserRolesModel.Mapping,
    isArray: true,
    pagingMode: 'More',
    pageSize: 100,
    extend: {
        sortBy: ko.observable('Name'),
        sortDirection: ko.observable('asc'),
        name: ko.observable(''),
        groupName: ko.observable('')
    },
});

$(function () {
    Framework.DataBinder.applyBinding(modelRole, "roles");
    modelRole.get();
});

function getSearchResultRole() {
    modelRole.PageIndex(0);
    modelRole.getWith(modelRole.name(), modelRole.groupName(), modelRole.sortBy(), modelRole.sortDirection());
}


function resetRole() {
    modelRole.name('');
    modelRole.name(undefined);

    modelRole.groupName('');
    modelRole.groupName(undefined);

    getSearchResultRole();
}



function refreshUserRole() {
    modelRole.get();
    parent.jQuery.fancybox.close();
}


////////user
var model = ko.buildAjaxModel({
    getUrl: getUserUrl,
    mapping: UserModel.Mapping,
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

function getSearchResults() {
    model.PageIndex(0);
    model.getWith(model.firstName(), model.lastName(), model.email(), model.sortBy(), model.sortDirection());
}

$(function () {
    Framework.DataBinder.applyBinding(model, "users");
    model.get();
});

//function getSearchResultRole() {
//    modelRole.PageIndex(0);
//    modelRole.getWith(modelRole.name(), modelRole.groupName(), modelRole.sortBy(), modelRole.sortDirection());
//}


function resetUser() {
    model.firstName('');
    model.firstName(undefined);

    model.lastName('');
    model.lastName(undefined);

    model.email('');
    model.email(undefined);

    getSearchResultRole();
}



function refreshUser() {
    model.get();
    parent.jQuery.fancybox.close();
}