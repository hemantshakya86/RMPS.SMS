var model = ko.buildAjaxModel({
    getUrl: getUserUrl.formatString(id),
    mapping: UserModel.Mapping,
    postUrl: postUserUrl,
    onPostError: function (response) {
        notify.error(response.ErrorMessage);
    },
    onPost: function () {
        parent.notify.success("User Added Successfully");
        parent.refreshUser();
    },
    putUrl: putUserUrl.formatString(id),
    onPutError: function (response) {
        notify.error(response.ErrorMessage);
    },
    onPut: function () {
        parent.notify.success("User Updated successfully");
        parent.refreshUser();
    }
});
$(function() {
    Framework.DataBinder.applyBinding(model, "adduser");
    if (id != null && id !== '' && id != undefined) {
        model.get();
    }
});

//var roleName = ko.buildAjaxModel({
//    getUrl: getUrl.formatString(id),
//    mapping: RoleModel.Mapping,

//});

//$(function() {
//    Framework.DataBinder.applyBinding(model, "RoleName");
//    if (id != null)
//    {
//        model.get();

//    }
//});