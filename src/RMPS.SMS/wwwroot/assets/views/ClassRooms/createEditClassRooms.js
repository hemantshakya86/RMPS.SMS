var model = ko.buildAjaxModel({
    getUrl: getClassRoomsUrl.formatString(id),
    mapping: ClassRoomModel.Mapping,
    postUrl: postClassRoomsUrl,
    onPostError: function (response) {
        notify.error(response.ErrorMessage);
    },
    onPost: function () {
        parent.notify.success("Class Room Added Successfully");
        parent.refreshClassRooms();
    },
    putUrl: putClassRoomsUrl.formatString(id),
    onPutError: function (response) {
        notify.error(response.ErrorMessage);
    },
    onPut: function () {
        parent.notify.success("Class updated successfully");
        parent.refreshClassRooms();
    }
});


$(function () {
    Framework.DataBinder.applyBinding(model, "classRooms");
    if (id != null && id !== '' && id != undefined) {
        model.get();
    }
})