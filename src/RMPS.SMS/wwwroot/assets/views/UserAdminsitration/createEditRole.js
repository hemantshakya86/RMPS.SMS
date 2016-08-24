var roleModel = ko.buildAjaxModel({
    getUrl: getRoleUrl.formatString(roleID),
    mapping: RolesModel.Mapping,
    postUrl: postRoleUrl,
    onPostError: function (response) {
        notify.error(response.ErrorMessage);
    },
    onPost: function () {
        parent.notify.success("User's Role Added Successfully");
        parent.refreshUserRole();
    },
    putUrl: putRoleUrl.formatString(roleID),
    onPutError: function (response) {
        notify.error(response.ErrorMessage);
    },
    onPut: function () {
        parent.notify.success("User Role Updated successfully");
        parent.refreshUserRole();
    }
});

$(function () {
    Framework.DataBinder.applyBinding(roleModel, "user-role");
    if (roleID != null && roleID !== '' && roleID != undefined) {
        roleModel.get();
    }
 
})