var model = ko.buildAjaxModel({
    getUrl: getTeacherUrl.formatString(id),
    mapping: TeacherDetailsModel.Mapping,
    postUrl: postTeacherUrl,
    onPostError: function (response) {
        notify.error(response.ErrorMessage);
    },
    onPost: function () {
        parent.notify.success("Teacher Added Successfully");
        parent.refreshStudent();
    },
    //putUrl: putStudentUrl.formatString(id),
    //onPutError: function (response) {
    //    notify.error(response.ErrorMessage);
    //},
    //onPut: function () {
    //    parent.notify.success("Teacher Updated successfully");
    //    parent.refreshStudent();
    //}
});
$(function () {
    Framework.DataBinder.applyBinding(model, "teacherDetail");
    if (id != null && id !== '' && id != undefined) {
        model.get();
    }
});