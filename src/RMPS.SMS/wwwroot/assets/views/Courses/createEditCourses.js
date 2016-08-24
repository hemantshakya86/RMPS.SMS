var model = ko.buildAjaxModel({
    getUrl: getCoursesUrl.formatString(id),
    mapping: CoursesModel.Mapping,
    postUrl: postCoursesUrl,
    onPostError: function (response) {
        notify.error(response.ErrorMessage);
    },
    onPost: function () {
        parent.notify.success("Courses Added Successfully");
        parent.refreshCourses();
    },
    putUrl: putCoursesUrl.formatString(id),
    onPutError: function (response) {
        notify.error(response.ErrorMessage);
    },
    onPut: function () {
        parent.notify.success("Courses updated successfully");
        parent.refreshCourses();
    }
});


$(function () {
    Framework.DataBinder.applyBinding(model, "courses");
    if (id != null && id !== '' && id != undefined) {
        model.get();
    }
})