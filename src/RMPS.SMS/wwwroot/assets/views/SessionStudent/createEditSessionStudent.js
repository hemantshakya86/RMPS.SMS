var model = ko.buildAjaxModel({
    // getUrl: getSessionStudentUrl.formatString(id),
    mapping: SessionStudentModel.Mapping,
    postUrl: postSessionStudentUrl,
    onPostError: function (response) {
        notify.error(response.ErrorMessage);
    },
    onPost: function () {
        parent.notify.success("Session Student Added Successfully");
        parent.refreshSessionStudent();
    },
   
});

model.AllSessionClasses = ko.buildAjaxModel(getAllClasses, SessionStudentModel.Mapping, function () {
}, null, true);

model.RoomSessionsID.subscribe(function (val) {
    if (val) {
        model.AllSessionClasses.getWith(val);
    }
});

$(function () {
    Framework.DataBinder.applyBinding(model, "setsession");
    if (id != null && id !== '' && id != undefined) {
        model.get();
    }
})