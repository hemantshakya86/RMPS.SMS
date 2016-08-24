var model = ko.buildAjaxModel({
    getUrl: getRoomFeesUrl.formatString(id),
    mapping: RoomFeesModel.Mapping,
    postUrl: postRoomFeesUrl,
    onPostError: function (response) {
        notify.error(response.ErrorMessage);
    },
    onPost: function () {
        parent.notify.success("Room Fees Added Successfully");
        parent.refreshRoomSessions();
    },
    putUrl: putRoomFeesUrl.formatString(id),
    onPutError: function (response) {
        notify.error(response.ErrorMessage);
    },
    onPut: function () {
        parent.notify.success("Room Fees updated successfully");
        parent.refreshRoomSessions();
    }
});
$(function () {
    Framework.DataBinder.applyBinding(model, "create-classfees");
    if (id != null && id !== '' && id != undefined) {
        model.get();
    }
})