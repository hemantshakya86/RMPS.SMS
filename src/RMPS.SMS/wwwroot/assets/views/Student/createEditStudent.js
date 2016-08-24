var model = ko.buildAjaxModel({
    getUrl: getStudentUrl.formatString(id),
    mapping: StudentDetailsModel.Mapping,
    postUrl: postStudentUrl,
    onPostError: function (response) {
        notify.error(response.ErrorMessage);
    },
    onPost: function () {
        parent.notify.success("Student Added Successfully");
        parent.refreshStudent();
    },
    putUrl: putStudentUrl.formatString(id),
    onPutError: function (response) {
        notify.error(response.ErrorMessage);
    },
    onPut: function () {
        parent.notify.success("Student Updated successfully");
        parent.refreshStudent();
    }
});
$(function () {
    Framework.DataBinder.applyBinding(model, "studentDetail");
    if (id != null && id !== '' && id != undefined) {
        model.get();
    }
});