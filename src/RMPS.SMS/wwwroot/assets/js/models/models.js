function LocalAddressModel() {
        var self = this;
        self.IsValidatable = ko.observable(true);
        self.HouseNumber = ko.observable();
        self.HouseNumber.extend({ editState : false, disableValidation : false, empty : true });
        self.Street = ko.observable();
        self.Street.extend({ editState : false, disableValidation : false, empty : true });
        self.City = ko.observable();
        self.City.extend({ editState : false, disableValidation : false, empty : true });
        self.State = ko.observable();
        self.State.extend({ editState : false, disableValidation : false, empty : true });
        self.ZipCode = ko.observable();
        self.ZipCode.extend({ editState : false, disableValidation : false, empty : true });
        self.LandMark = ko.observable();
        self.LandMark.extend({ editState : false, disableValidation : false, empty : true });
        self.include = ["_destroy", "HouseNumber", "Street", "City", "State", "ZipCode", "LandMark"];
        self.validationProperties = [];
        self._create = [];
        self.ignore = ["observable", "validationProperties", "ignore", "include", "type", "mapping", "IsValidatable", "_create", "hasID"];
        self.type = "SMS.Data.Models.LocalAddressModel";
        ko.utils.makeComputeds(self);
        ko.utils.makeAsynCommands(self);
        ko.initModel(self);
        if (self.init) self.init();
        }
        
        LocalAddressModel.Mapping = function(){ return new LocalAddressModel(); }
        
    function PermanentAddressModel() {
        var self = this;
        self.IsValidatable = ko.observable(true);
        self.HouseNumber = ko.observable();
        self.HouseNumber.extend({ editState : false, disableValidation : false, empty : true });
        self.Street = ko.observable();
        self.Street.extend({ editState : false, disableValidation : false, empty : true });
        self.City = ko.observable();
        self.City.extend({ editState : false, disableValidation : false, empty : true });
        self.State = ko.observable();
        self.State.extend({ editState : false, disableValidation : false, empty : true });
        self.ZipCode = ko.observable();
        self.ZipCode.extend({ editState : false, disableValidation : false, empty : true });
        self.LandMark = ko.observable();
        self.LandMark.extend({ editState : false, disableValidation : false, empty : true });
        self.include = ["_destroy", "HouseNumber", "Street", "City", "State", "ZipCode", "LandMark"];
        self.validationProperties = [];
        self._create = [];
        self.ignore = ["observable", "validationProperties", "ignore", "include", "type", "mapping", "IsValidatable", "_create", "hasID"];
        self.type = "SMS.Data.Models.PermanentAddressModel";
        ko.utils.makeComputeds(self);
        ko.utils.makeAsynCommands(self);
        ko.initModel(self);
        if (self.init) self.init();
        }
        
        PermanentAddressModel.Mapping = function(){ return new PermanentAddressModel(); }
        
    function RoomSessionsModel() {
        var self = this;
        self.IsValidatable = ko.observable(true);
        self.SessionID = ko.observable();
        self.SessionID.extend({ editState : false, disableValidation : false, empty : true });
        self.ClassID = ko.observable();
        self.ClassID.extend({ editState : false, disableValidation : false, empty : true });
        self.SectionID = ko.observable();
        self.SectionID.extend({ editState : false, disableValidation : false, empty : true });
        self.CourseID = ko.observableArray();
        self.CourseID.extend({ editState : false, disableValidation : false, empty : true });
        self.include = ["_destroy", "SessionID", "ClassID", "SectionID", "CourseID"];
        self.validationProperties = [];
        self._create = [];
        self.ignore = ["observable", "validationProperties", "ignore", "include", "type", "mapping", "IsValidatable", "_create", "hasID"];
        self.type = "SMS.Data.Models.RoomSessionsModel";
        ko.utils.makeComputeds(self);
        ko.utils.makeAsynCommands(self);
        ko.initModel(self);
        if (self.init) self.init();
        }
        
        RoomSessionsModel.Mapping = function(){ return new RoomSessionsModel(); }
        
    function RoomSessionsDetailsModel() {
        var self = this;
        self.IsValidatable = ko.observable(true);
        self.ID = ko.observable();
        self.ID.extend({ editState : false, disableValidation : false, empty : true });
        self.Session = ko.observable();
        self.Session.extend({ editState : false, disableValidation : false, empty : true });
        self.Class = ko.observable();
        self.Class.extend({ editState : false, disableValidation : false, empty : true });
        self.Section = ko.observable();
        self.Section.extend({ editState : false, disableValidation : false, empty : true });
        self.Course = ko.observableArray();
        self.Course.extend({ editState : false, disableValidation : false, empty : true });
        self.RoomSessionStartDate = ko.observable();
        self.RoomSessionStartDate.extend({ editState : false, disableValidation : false, empty : true });
        self.RoomSessionEndDate = ko.observable();
        self.RoomSessionEndDate.extend({ editState : false, disableValidation : false, empty : true });
        self.include = ["_destroy", "ID", "Session", "Class", "Section", "Course", "RoomSessionStartDate", "RoomSessionEndDate"];
        self.validationProperties = [];
        self._create = [];
        self.ignore = ["observable", "validationProperties", "ignore", "include", "type", "mapping", "IsValidatable", "_create", "hasID"];
        self.type = "SMS.Data.Models.RoomSessionsDetailsModel";
        ko.utils.makeComputeds(self);
        ko.utils.makeAsynCommands(self);
        ko.initModel(self);
        if (self.init) self.init();
        }
        
        RoomSessionsDetailsModel.Mapping = function(){ return new RoomSessionsDetailsModel(); }
        
    function CoursesDetailsModel() {
        var self = this;
        self.IsValidatable = ko.observable(true);
        self.Name = ko.observable();
        self.Name.extend({ editState : false, disableValidation : false, empty : true }).extend({ required: { message: "The Name field is required.", onlyIf: function() { return ko.utils.isPropertyValidatable(self, "Name"); } } });
        self.ID = ko.observable();
        self.ID.extend({ editState : false, disableValidation : false, empty : true });
        self.include = ["_destroy", "Name", "ID"];
        self.validationProperties = ["Name"];
        self._create = [];
        self.ignore = ["observable", "validationProperties", "ignore", "include", "type", "mapping", "IsValidatable", "_create", "hasID"];
        self.type = "SMS.Data.Models.CoursesDetailsModel";
        ko.utils.makeComputeds(self);
        ko.utils.makeAsynCommands(self);
        ko.initModel(self);
        if (self.init) self.init();
        }
        
        CoursesDetailsModel.Mapping = function(){ return new CoursesDetailsModel(); }
        
    function ClassRoomDetailsModel() {
        var self = this;
        self.IsValidatable = ko.observable(true);
        self.ID = ko.observable();
        self.ID.extend({ editState : false, disableValidation : false, empty : true });
        self.Name = ko.observable();
        self.Name.extend({ editState : false, disableValidation : false, empty : true });
        self.include = ["_destroy", "ID", "Name"];
        self.validationProperties = [];
        self._create = [];
        self.ignore = ["observable", "validationProperties", "ignore", "include", "type", "mapping", "IsValidatable", "_create", "hasID"];
        self.type = "SMS.Data.Models.ClassRoomDetailsModel";
        ko.utils.makeComputeds(self);
        ko.utils.makeAsynCommands(self);
        ko.initModel(self);
        if (self.init) self.init();
        }
        
        ClassRoomDetailsModel.Mapping = function(){ return new ClassRoomDetailsModel(); }
        
    function CoursesModel() {
        var self = this;
        self.IsValidatable = ko.observable(true);
        self.ID = ko.observable();
        self.ID.extend({ editState : false, disableValidation : false, empty : true });
        self.Name = ko.observable();
        self.Name.extend({ editState : false, disableValidation : false, empty : true });
        self.include = ["_destroy", "ID", "Name"];
        self.validationProperties = [];
        self._create = [];
        self.ignore = ["observable", "validationProperties", "ignore", "include", "type", "mapping", "IsValidatable", "_create", "hasID"];
        self.type = "SMS.Data.Models.CoursesModel";
        ko.utils.makeComputeds(self);
        ko.utils.makeAsynCommands(self);
        ko.initModel(self);
        if (self.init) self.init();
        }
        
        CoursesModel.Mapping = function(){ return new CoursesModel(); }
        
    function ClassRoomModel() {
        var self = this;
        self.IsValidatable = ko.observable(true);
        self.ID = ko.observable();
        self.ID.extend({ editState : false, disableValidation : false, empty : true });
        self.Name = ko.observable();
        self.Name.extend({ editState : false, disableValidation : false, empty : true });
        self.include = ["_destroy", "ID", "Name"];
        self.validationProperties = [];
        self._create = [];
        self.ignore = ["observable", "validationProperties", "ignore", "include", "type", "mapping", "IsValidatable", "_create", "hasID"];
        self.type = "SMS.Data.Models.ClassRoomModel";
        ko.utils.makeComputeds(self);
        ko.utils.makeAsynCommands(self);
        ko.initModel(self);
        if (self.init) self.init();
        }
        
        ClassRoomModel.Mapping = function(){ return new ClassRoomModel(); }
        
    function RolesModel() {
        var self = this;
        self.IsValidatable = ko.observable(true);
        self.ID = ko.observable();
        self.ID.extend({ editState : false, disableValidation : false, empty : true });
        self.Name = ko.observable();
        self.Name.extend({ editState : false, disableValidation : false, empty : true }).extend({ required: { message: "The Name field is required.", onlyIf: function() { return ko.utils.isPropertyValidatable(self, "Name"); } } });
        self.Description = ko.observable();
        self.Description.extend({ editState : false, disableValidation : false, empty : true });
        self.include = ["_destroy", "ID", "Name", "Description"];
        self.validationProperties = ["Name"];
        self._create = [];
        self.ignore = ["observable", "validationProperties", "ignore", "include", "type", "mapping", "IsValidatable", "_create", "hasID"];
        self.type = "SMS.Data.Models.RolesModel";
        ko.utils.makeComputeds(self);
        ko.utils.makeAsynCommands(self);
        ko.initModel(self);
        if (self.init) self.init();
        }
        
        RolesModel.Mapping = function(){ return new RolesModel(); }
        
    function SessionDetailsModel() {
        var self = this;
        self.IsValidatable = ko.observable(true);
        self.ID = ko.observable();
        self.ID.extend({ editState : false, disableValidation : false, empty : true });
        self.StartDate = ko.observable();
        self.StartDate.extend({ editState : false, disableValidation : false, empty : true });
        self.EndDate = ko.observable();
        self.EndDate.extend({ editState : false, disableValidation : false, empty : true });
        self.include = ["_destroy", "ID", "StartDate", "EndDate"];
        self.validationProperties = [];
        self._create = [];
        self.ignore = ["observable", "validationProperties", "ignore", "include", "type", "mapping", "IsValidatable", "_create", "hasID"];
        self.type = "SMS.Data.Models.SessionDetailsModel";
        ko.utils.makeComputeds(self);
        ko.utils.makeAsynCommands(self);
        ko.initModel(self);
        if (self.init) self.init();
        }
        
        SessionDetailsModel.Mapping = function(){ return new SessionDetailsModel(); }
        
    function SessionModel() {
        var self = this;
        self.IsValidatable = ko.observable(true);
        self.ID = ko.observable();
        self.ID.extend({ editState : false, disableValidation : false, empty : true });
        self.StartDate = ko.observable();
        self.StartDate.extend({ editState : false, disableValidation : false, empty : true });
        self.EndDate = ko.observable();
        self.EndDate.extend({ editState : false, disableValidation : false, empty : true });
        self.include = ["_destroy", "ID", "StartDate", "EndDate"];
        self.validationProperties = [];
        self._create = [];
        self.ignore = ["observable", "validationProperties", "ignore", "include", "type", "mapping", "IsValidatable", "_create", "hasID"];
        self.type = "SMS.Data.Models.SessionModel";
        ko.utils.makeComputeds(self);
        ko.utils.makeAsynCommands(self);
        ko.initModel(self);
        if (self.init) self.init();
        }
        
        SessionModel.Mapping = function(){ return new SessionModel(); }
        
    function SessionStudentModel() {
        var self = this;
        self.IsValidatable = ko.observable(true);
        self.include = ["_destroy"];
        self.validationProperties = [];
        self._create = [];
        self.ignore = ["observable", "validationProperties", "ignore", "include", "type", "mapping", "IsValidatable", "_create", "hasID"];
        self.type = "SMS.Data.Models.SessionStudentModel";
        ko.utils.makeComputeds(self);
        ko.utils.makeAsynCommands(self);
        ko.initModel(self);
        if (self.init) self.init();
        }
        
        SessionStudentModel.Mapping = function(){ return new SessionStudentModel(); }
        
    function StudentDetailsModel() {
        var self = this;
        self.IsValidatable = ko.observable(true);
        self.ID = ko.observable();
        self.ID.extend({ editState : false, disableValidation : false, empty : true });
        self.FirstName = ko.observable();
        self.FirstName.extend({ editState : false, disableValidation : false, empty : true });
        self.LastName = ko.observable();
        self.LastName.extend({ editState : false, disableValidation : false, empty : true });
        self.DateOfBirth = ko.observable();
        self.DateOfBirth.extend({ editState : false, disableValidation : false, empty : true });
        self.FatherName = ko.observable();
        self.FatherName.extend({ editState : false, disableValidation : false, empty : true });
        self.MotherName = ko.observable();
        self.MotherName.extend({ editState : false, disableValidation : false, empty : true });
        self.Phone = ko.observable();
        self.Phone.extend({ editState : false, disableValidation : false, empty : true });
        self.FatherQualification = ko.observable();
        self.FatherQualification.extend({ editState : false, disableValidation : false, empty : true });
        self.MotherQualification = ko.observable();
        self.MotherQualification.extend({ editState : false, disableValidation : false, empty : true });
        self.Gender = ko.observable();
        self.Gender.extend({ editState : false, disableValidation : false, empty : true });
        self.Email = ko.observable();
        self.Email.extend({ editState : false, disableValidation : false, empty : true });
        self.DateOfJoining = ko.observable();
        self.DateOfJoining.extend({ editState : false, disableValidation : false, empty : true });
        self.FatherOccupation = ko.observable();
        self.FatherOccupation.extend({ editState : false, disableValidation : false, empty : true });
        self.Category = ko.observable();
        self.Category.extend({ editState : false, disableValidation : false, empty : true });
        self.Cast = ko.observable();
        self.Cast.extend({ editState : false, disableValidation : false, empty : true });
        self.Religion = ko.observable();
        self.Religion.extend({ editState : false, disableValidation : false, empty : true });
        self.DateOfLeaving = ko.observable();
        self.DateOfLeaving.extend({ editState : false, disableValidation : false, empty : true });
        self.LocalAddress = ko.observable(new LocalAddressModel());
        self.PermanentAddress = ko.observable(new PermanentAddressModel());
        self.include = ["_destroy", "ID", "FirstName", "LastName", "DateOfBirth", "FatherName", "MotherName", "Phone", "FatherQualification", "MotherQualification", "Gender", "Email", "DateOfJoining", "FatherOccupation", "Category", "Cast", "Religion", "DateOfLeaving", "LocalAddress", "PermanentAddress"];
        self.validationProperties = [];
        self._create = [];
        self.ignore = ["observable", "validationProperties", "ignore", "include", "type", "mapping", "IsValidatable", "_create", "hasID"];
        self.type = "SMS.Data.Models.StudentDetailsModel";
        ko.utils.makeComputeds(self);
        ko.utils.makeAsynCommands(self);
        ko.initModel(self);
        if (self.init) self.init();
        }
        
        StudentDetailsModel.Mapping = function(){ return new StudentDetailsModel(); }
        
    function StudentModel() {
        var self = this;
        self.IsValidatable = ko.observable(true);
        self.FirstName = ko.observable();
        self.FirstName.extend({ editState : false, disableValidation : false, empty : true });
        self.LastName = ko.observable();
        self.LastName.extend({ editState : false, disableValidation : false, empty : true });
        self.DateOfBirth = ko.observable();
        self.DateOfBirth.extend({ editState : false, disableValidation : false, empty : true });
        self.FatherName = ko.observable();
        self.FatherName.extend({ editState : false, disableValidation : false, empty : true });
        self.MotherName = ko.observable();
        self.MotherName.extend({ editState : false, disableValidation : false, empty : true });
        self.Phone = ko.observable();
        self.Phone.extend({ editState : false, disableValidation : false, empty : true });
        self.FatherQualification = ko.observable();
        self.FatherQualification.extend({ editState : false, disableValidation : false, empty : true });
        self.MotherQualification = ko.observable();
        self.MotherQualification.extend({ editState : false, disableValidation : false, empty : true });
        self.Gender = ko.observable();
        self.Gender.extend({ editState : false, disableValidation : false, empty : true });
        self.Email = ko.observable();
        self.Email.extend({ editState : false, disableValidation : false, empty : true });
        self.DateOfJoining = ko.observable();
        self.DateOfJoining.extend({ editState : false, disableValidation : false, empty : true });
        self.FatherOccupation = ko.observable();
        self.FatherOccupation.extend({ editState : false, disableValidation : false, empty : true });
        self.Category = ko.observable();
        self.Category.extend({ editState : false, disableValidation : false, empty : true });
        self.Cast = ko.observable();
        self.Cast.extend({ editState : false, disableValidation : false, empty : true });
        self.Religion = ko.observable();
        self.Religion.extend({ editState : false, disableValidation : false, empty : true });
        self.DateOfLeaving = ko.observable();
        self.DateOfLeaving.extend({ editState : false, disableValidation : false, empty : true });
        self.LocalAddress = ko.observable(new LocalAddressModel());
        self.PermanentAddress = ko.observable(new PermanentAddressModel());
        self.include = ["_destroy", "FirstName", "LastName", "DateOfBirth", "FatherName", "MotherName", "Phone", "FatherQualification", "MotherQualification", "Gender", "Email", "DateOfJoining", "FatherOccupation", "Category", "Cast", "Religion", "DateOfLeaving", "LocalAddress", "PermanentAddress"];
        self.validationProperties = [];
        self._create = [];
        self.ignore = ["observable", "validationProperties", "ignore", "include", "type", "mapping", "IsValidatable", "_create", "hasID"];
        self.type = "SMS.Data.Models.StudentModel";
        ko.utils.makeComputeds(self);
        ko.utils.makeAsynCommands(self);
        ko.initModel(self);
        if (self.init) self.init();
        }
        
        StudentModel.Mapping = function(){ return new StudentModel(); }
        
    function TeacherDetailsModel() {
        var self = this;
        self.IsValidatable = ko.observable(true);
        self.ID = ko.observable();
        self.ID.extend({ editState : false, disableValidation : false, empty : true });
        self.FirstName = ko.observable();
        self.FirstName.extend({ editState : false, disableValidation : false, empty : true });
        self.LastName = ko.observable();
        self.LastName.extend({ editState : false, disableValidation : false, empty : true });
        self.DateOfBirth = ko.observable();
        self.DateOfBirth.extend({ editState : false, disableValidation : false, empty : true });
        self.FatherName = ko.observable();
        self.FatherName.extend({ editState : false, disableValidation : false, empty : true });
        self.Phone = ko.observable();
        self.Phone.extend({ editState : false, disableValidation : false, empty : true });
        self.Qualification = ko.observable();
        self.Qualification.extend({ editState : false, disableValidation : false, empty : true });
        self.Gender = ko.observable();
        self.Gender.extend({ editState : false, disableValidation : false, empty : true });
        self.Email = ko.observable();
        self.Email.extend({ editState : false, disableValidation : false, empty : true });
        self.DateOfJoining = ko.observable();
        self.DateOfJoining.extend({ editState : false, disableValidation : false, empty : true });
        self.Category = ko.observable();
        self.Category.extend({ editState : false, disableValidation : false, empty : true });
        self.DateOfLeaving = ko.observable();
        self.DateOfLeaving.extend({ editState : false, disableValidation : false, empty : true });
        self.LocalAddress = ko.observable(new LocalAddressModel());
        self.PermanentAddress = ko.observable(new PermanentAddressModel());
        self.include = ["_destroy", "ID", "FirstName", "LastName", "DateOfBirth", "FatherName", "Phone", "Qualification", "Gender", "Email", "DateOfJoining", "Category", "DateOfLeaving", "LocalAddress", "PermanentAddress"];
        self.validationProperties = [];
        self._create = [];
        self.ignore = ["observable", "validationProperties", "ignore", "include", "type", "mapping", "IsValidatable", "_create", "hasID"];
        self.type = "SMS.Data.Models.TeacherDetailsModel";
        ko.utils.makeComputeds(self);
        ko.utils.makeAsynCommands(self);
        ko.initModel(self);
        if (self.init) self.init();
        }
        
        TeacherDetailsModel.Mapping = function(){ return new TeacherDetailsModel(); }
        
    function TeacherModel() {
        var self = this;
        self.IsValidatable = ko.observable(true);
        self.FirstName = ko.observable();
        self.FirstName.extend({ editState : false, disableValidation : false, empty : true });
        self.LastName = ko.observable();
        self.LastName.extend({ editState : false, disableValidation : false, empty : true });
        self.FatherName = ko.observable();
        self.FatherName.extend({ editState : false, disableValidation : false, empty : true });
        self.DateOfBirth = ko.observable();
        self.DateOfBirth.extend({ editState : false, disableValidation : false, empty : true });
        self.Qualification = ko.observable();
        self.Qualification.extend({ editState : false, disableValidation : false, empty : true });
        self.Gender = ko.observable();
        self.Gender.extend({ editState : false, disableValidation : false, empty : true });
        self.Phone = ko.observable();
        self.Phone.extend({ editState : false, disableValidation : false, empty : true });
        self.Email = ko.observable();
        self.Email.extend({ editState : false, disableValidation : false, empty : true });
        self.Category = ko.observable();
        self.Category.extend({ editState : false, disableValidation : false, empty : true });
        self.DateOfJoining = ko.observable();
        self.DateOfJoining.extend({ editState : false, disableValidation : false, empty : true });
        self.DateOfLeaving = ko.observable();
        self.DateOfLeaving.extend({ editState : false, disableValidation : false, empty : true });
        self.PermanentAddress = ko.observable(new PermanentAddressModel());
        self.LocalAddress = ko.observable(new LocalAddressModel());
        self.include = ["_destroy", "FirstName", "LastName", "FatherName", "DateOfBirth", "Qualification", "Gender", "Phone", "Email", "Category", "DateOfJoining", "DateOfLeaving", "PermanentAddress", "LocalAddress"];
        self.validationProperties = [];
        self._create = [];
        self.ignore = ["observable", "validationProperties", "ignore", "include", "type", "mapping", "IsValidatable", "_create", "hasID"];
        self.type = "SMS.Data.Models.TeacherModel";
        ko.utils.makeComputeds(self);
        ko.utils.makeAsynCommands(self);
        ko.initModel(self);
        if (self.init) self.init();
        }
        
        TeacherModel.Mapping = function(){ return new TeacherModel(); }
        
    function UserModel() {
        var self = this;
        self.IsValidatable = ko.observable(true);
        self.ID = ko.observable();
        self.ID.extend({ editState : false, disableValidation : false, empty : true });
        self.FirstName = ko.observable();
        self.FirstName.extend({ editState : false, disableValidation : false, empty : true });
        self.LastName = ko.observable();
        self.LastName.extend({ editState : false, disableValidation : false, empty : true });
        self.Email = ko.observable();
        self.Email.extend({ editState : false, disableValidation : false, empty : true });
        self.Phone = ko.observable();
        self.Phone.extend({ editState : false, disableValidation : false, empty : true });
        self.Address = ko.observable();
        self.Address.extend({ editState : false, disableValidation : false, empty : true });
        self.City = ko.observable();
        self.City.extend({ editState : false, disableValidation : false, empty : true });
        self.ZipCode = ko.observable();
        self.ZipCode.extend({ editState : false, disableValidation : false, empty : true });
        self.Password = ko.observable();
        self.Password.extend({ editState : false, disableValidation : false, empty : true });
        self.ConfirmPassword = ko.observable();
        self.ConfirmPassword.extend({ editState : false, disableValidation : false, empty : true });
        self.include = ["_destroy", "ID", "FirstName", "LastName", "Email", "Phone", "Address", "City", "ZipCode", "Password", "ConfirmPassword"];
        self.validationProperties = [];
        self._create = [];
        self.ignore = ["observable", "validationProperties", "ignore", "include", "type", "mapping", "IsValidatable", "_create", "hasID"];
        self.type = "SMS.Data.Models.UserModel";
        ko.utils.makeComputeds(self);
        ko.utils.makeAsynCommands(self);
        ko.initModel(self);
        if (self.init) self.init();
        }
        
        UserModel.Mapping = function(){ return new UserModel(); }
        
    function UserRolesModel() {
        var self = this;
        self.IsValidatable = ko.observable(true);
        self.ID = ko.observable();
        self.ID.extend({ editState : false, disableValidation : false, empty : true });
        self.Name = ko.observable();
        self.Name.extend({ editState : false, disableValidation : false, empty : true });
        self.Description = ko.observable();
        self.Description.extend({ editState : false, disableValidation : false, empty : true });
        self.include = ["_destroy", "ID", "Name", "Description"];
        self.validationProperties = [];
        self._create = [];
        self.ignore = ["observable", "validationProperties", "ignore", "include", "type", "mapping", "IsValidatable", "_create", "hasID"];
        self.type = "SMS.Data.Models.UserRolesModel";
        ko.utils.makeComputeds(self);
        ko.utils.makeAsynCommands(self);
        ko.initModel(self);
        if (self.init) self.init();
        }
        
        UserRolesModel.Mapping = function(){ return new UserRolesModel(); }
        
    function PagedListModel() {
        var self = this;
        self.IsValidatable = ko.observable(true);
        self.Items = ko.observableArray();
        self.Items.extend({ editState : false, disableValidation : false, empty : true });
        self.TotalCount = ko.observable();
        self.TotalCount.extend({ editState : false, disableValidation : false, empty : true });
        self.PageIndex = ko.observable();
        self.PageIndex.extend({ editState : false, disableValidation : false, empty : true });
        self.PageSize = ko.observable();
        self.PageSize.extend({ editState : false, disableValidation : false, empty : true });
        self.include = ["_destroy", "Items", "TotalCount", "PageIndex", "PageSize"];
        self.validationProperties = [];
        self._create = [];
        self.ignore = ["observable", "validationProperties", "ignore", "include", "type", "mapping", "IsValidatable", "_create", "hasID", "StatusCode", "ErrorMessage"];
        self.type = "Framework.Models.PagedListModel`1";
        ko.utils.makeComputeds(self);
        ko.utils.makeAsynCommands(self);
        ko.initModel(self);
        if (self.init) self.init();
        }
        
        PagedListModel.Mapping = function(){ return new PagedListModel(); }
        
    var PagingStyle = [
        { Text: "None", Value: "None", NumericValue: 0 },
        { Text: "Social", Value: "Social", NumericValue: 1 },
        { Text: "Bootstrap", Value: "Bootstrap", NumericValue: 2 },
        { Text: "More", Value: "More", NumericValue: 3 }
    ]
    
    
    PagingStyle.None = { Text: "None", Value: 0 };
    PagingStyle.Social = { Text: "Social", Value: 1 };
    PagingStyle.Bootstrap = { Text: "Bootstrap", Value: 2 };
    PagingStyle.More = { Text: "More", Value: 3 };
    
    
    function RouteModel() {
        var self = this;
        self.IsValidatable = ko.observable(true);
        self.Methods = ko.observableArray();
        self.Methods.extend({ editState : false, disableValidation : false, empty : true });
        self.Url = ko.observable();
        self.Url.extend({ editState : false, disableValidation : false, empty : true });
        self.include = ["_destroy", "Methods", "Url"];
        self.validationProperties = [];
        self._create = [];
        self.ignore = ["observable", "validationProperties", "ignore", "include", "type", "mapping", "IsValidatable", "_create", "hasID", "StatusCode", "ErrorMessage"];
        self.type = "Framework.Models.RouteModel";
        ko.utils.makeComputeds(self);
        ko.utils.makeAsynCommands(self);
        ko.initModel(self);
        if (self.init) self.init();
        }
        
        RouteModel.Mapping = function(){ return new RouteModel(); }
        
    function SystemLogGroupModel() {
        var self = this;
        self.IsValidatable = ko.observable(true);
        self.MachineName = ko.observable();
        self.MachineName.extend({ editState : false, disableValidation : false, empty : true });
        self.Timestamp = ko.observable();
        self.Timestamp.extend({ editState : false, disableValidation : false, empty : true });
        self.ApplicationName = ko.observable();
        self.ApplicationName.extend({ editState : false, disableValidation : false, empty : true });
        self.NoOfCount = ko.observable();
        self.NoOfCount.extend({ editState : false, disableValidation : false, empty : true });
        self.ID = ko.observable();
        self.ID.extend({ editState : false, disableValidation : false, empty : true });
        self.include = ["_destroy", "MachineName", "Timestamp", "ApplicationName", "NoOfCount", "ID"];
        self.validationProperties = [];
        self._create = [];
        self.ignore = ["observable", "validationProperties", "ignore", "include", "type", "mapping", "IsValidatable", "_create", "hasID", "StatusCode", "ErrorMessage"];
        self.type = "Framework.Models.SystemLogGroupModel";
        ko.utils.makeComputeds(self);
        ko.utils.makeAsynCommands(self);
        ko.initModel(self);
        if (self.init) self.init();
        }
        
        SystemLogGroupModel.Mapping = function(){ return new SystemLogGroupModel(); }
        
    function SystemLogModel() {
        var self = this;
        self.IsValidatable = ko.observable(true);
        self.Timestamp = ko.observable();
        self.Timestamp.extend({ editState : false, disableValidation : false, empty : true });
        self.MachineName = ko.observable();
        self.MachineName.extend({ editState : false, disableValidation : false, empty : true });
        self.Message = ko.observable();
        self.Message.extend({ editState : false, disableValidation : false, empty : true });
        self.User = ko.observable();
        self.User.extend({ editState : false, disableValidation : false, empty : true });
        self.Type = ko.observable();
        self.Type.extend({ editState : false, disableValidation : false, empty : true });
        self.ExceptionType = ko.observable();
        self.ExceptionType.extend({ editState : false, disableValidation : false, empty : true });
        self.ApplicationName = ko.observable();
        self.ApplicationName.extend({ editState : false, disableValidation : false, empty : true });
        self.SourceFile = ko.observable();
        self.SourceFile.extend({ editState : false, disableValidation : false, empty : true });
        self.LineNumber = ko.observable();
        self.LineNumber.extend({ editState : false, disableValidation : false, empty : true });
        self.MethodName = ko.observable();
        self.MethodName.extend({ editState : false, disableValidation : false, empty : true });
        self.Component = ko.observable();
        self.Component.extend({ editState : false, disableValidation : false, empty : true });
        self.include = ["_destroy", "Timestamp", "MachineName", "Message", "User", "Type", "ExceptionType", "ApplicationName", "SourceFile", "LineNumber", "MethodName", "Component"];
        self.validationProperties = [];
        self._create = [];
        self.ignore = ["observable", "validationProperties", "ignore", "include", "type", "mapping", "IsValidatable", "_create", "hasID", "StatusCode", "ErrorMessage"];
        self.type = "Framework.Models.SystemLogModel";
        ko.utils.makeComputeds(self);
        ko.utils.makeAsynCommands(self);
        ko.initModel(self);
        if (self.init) self.init();
        }
        
        SystemLogModel.Mapping = function(){ return new SystemLogModel(); }
        
    var GenderType = [
        { Text: "Male", Value: "Male", NumericValue: 1 },
        { Text: "Female", Value: "Female", NumericValue: 2 }
    ]
    
    
    GenderType.Male = { Text: "Male", Value: 1 };
    GenderType.Female = { Text: "Female", Value: 2 };
    
    
    var LogType = [
        { Text: "Debug", Value: "Debug", NumericValue: 0 },
        { Text: "Info", Value: "Info", NumericValue: 1 },
        { Text: "Fatal", Value: "Fatal", NumericValue: 2 },
        { Text: "Error", Value: "Error", NumericValue: 4 },
        { Text: "Warn", Value: "Warn", NumericValue: 3 }
    ]
    
    
    LogType.Debug = { Text: "Debug", Value: 0 };
    LogType.Info = { Text: "Info", Value: 1 };
    LogType.Fatal = { Text: "Fatal", Value: 2 };
    LogType.Error = { Text: "Error", Value: 4 };
    LogType.Warn = { Text: "Warn", Value: 3 };
    
    

