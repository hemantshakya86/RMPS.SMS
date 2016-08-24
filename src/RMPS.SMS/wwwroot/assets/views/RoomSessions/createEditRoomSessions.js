var model = ko.buildAjaxModel({
    getUrl: getRoomSessionsUrl.formatString(id),
    mapping: RoomSessionsModel.Mapping,
    postUrl: postRoomSessionsUrl,
    onPostError: function (response) {
        notify.error(response.ErrorMessage);
    },
    onPost: function () {
        parent.notify.success("Room Session Added Successfully");
        parent.refreshRoomSessions();
    },
    putUrl: putRoomSessionsUrl.formatString(id),
    onPutError: function (response) {
        notify.error(response.ErrorMessage);
    },
    onPut: function () {
        parent.notify.success("Room Session updated successfully");
        parent.refreshRoomSessions();
    }
});
$(function () {
    Framework.DataBinder.applyBinding(model, "roomsessions");
    if (id != null && id !== '' && id != undefined) {
        model.get();
    }
})