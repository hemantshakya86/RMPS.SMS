var model = ko.buildAjaxModel({
    getUrl: getSessionsUrl.formatString(id),
    mapping: SessionModel.Mapping,
    postUrl: postSessionsUrl,
    onPostError: function (response) {
        notify.error(response.ErrorMessage);
    },
    onPost: function () {
        parent.notify.success("Session Added Successfully");
        parent.refreshSession();
    },
    putUrl: putSessionsUrl.formatString(id),
    onPutError: function (response) {
        notify.error(response.ErrorMessage);
    },
    onPut: function () {
        parent.notify.success("Session Updated successfully");
        parent.refreshSession();
    }
});
function refreshSession() {
    model.get();
    parent.jQuery.fancybox.close();
}
$(function () {
    Framework.DataBinder.applyBinding(model, "sessions");
    if (id != null && id !== '' && id != undefined) {
        model.get();
    }
});