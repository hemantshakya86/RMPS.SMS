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
        self.type = "RMPS.SMS.ViewModel.ClassRoomDetailsModel";
        ko.utils.makeComputeds(self);
        ko.utils.makeAsynCommands(self);
        ko.initModel(self);
        if (self.init) self.init();
        }
        
        ClassRoomDetailsModel.Mapping = function(){ return new ClassRoomDetailsModel(); }
        
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
        self.type = "RMPS.SMS.ViewModel.ClassRoomModel";
        ko.utils.makeComputeds(self);
        ko.utils.makeAsynCommands(self);
        ko.initModel(self);
        if (self.init) self.init();
        }
        
        ClassRoomModel.Mapping = function(){ return new ClassRoomModel(); }
        
    function CoursesDetailsModel() {
        var self = this;
        self.IsValidatable = ko.observable(true);
        self.CourseName = ko.observable();
        self.CourseName.extend({ editState : false, disableValidation : false, empty : true });
        self.ID = ko.observable();
        self.ID.extend({ editState : false, disableValidation : false, empty : true });
        self.include = ["_destroy", "CourseName", "ID"];
        self.validationProperties = [];
        self._create = [];
        self.ignore = ["observable", "validationProperties", "ignore", "include", "type", "mapping", "IsValidatable", "_create", "hasID"];
        self.type = "RMPS.SMS.ViewModel.CoursesDetailsModel";
        ko.utils.makeComputeds(self);
        ko.utils.makeAsynCommands(self);
        ko.initModel(self);
        if (self.init) self.init();
        }
        
        CoursesDetailsModel.Mapping = function(){ return new CoursesDetailsModel(); }
        
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
        self.type = "RMPS.SMS.ViewModel.CoursesModel";
        ko.utils.makeComputeds(self);
        ko.utils.makeAsynCommands(self);
        ko.initModel(self);
        if (self.init) self.init();
        }
        
        CoursesModel.Mapping = function(){ return new CoursesModel(); }
        
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
        self.type = "RMPS.SMS.ViewModel.LocalAddressModel";
        ko.utils.makeComputeds(self);
        ko.utils.makeAsynCommands(self);
        ko.initModel(self);
        if (self.init) self.init();
        }
        
        LocalAddressModel.Mapping = function(){ return new LocalAddressModel(); }
        
    var PagingStyle = [
        { Text: "None", Value: "None", NumericValue: 0 },
        { Text: "Social", Value: "Social", NumericValue: 1 },
        { Text: "Bootstrap", Value: "Bootstrap", NumericValue: 2 },
        { Text: "More", Value: "More", NumericValue: 3 }
    ]
    
    
    PagingStyle.None = { Text: "None", Value: 0 }
    PagingStyle.Social = { Text: "Social", Value: 1 }
    PagingStyle.Bootstrap = { Text: "Bootstrap", Value: 2 }
    PagingStyle.More = { Text: "More", Value: 3 }
    
    
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
        self.type = "RMPS.SMS.ViewModel.PermanentAddressModel";
        ko.utils.makeComputeds(self);
        ko.utils.makeAsynCommands(self);
        ko.initModel(self);
        if (self.init) self.init();
        }
        
        PermanentAddressModel.Mapping = function(){ return new PermanentAddressModel(); }
        
    function RoomFeesModel() {
        var self = this;
        self.IsValidatable = ko.observable(true);
        self.RoomSessionID = ko.observable();
        self.RoomSessionID.extend({ editState : false, disableValidation : false, empty : true });
        self.ID = ko.observable();
        self.ID.extend({ editState : false, disableValidation : false, empty : true });
        self.AdmissionFee = ko.observable();
        self.AdmissionFee.extend({ editState : false, disableValidation : false, empty : true });
        self.ExamFee = ko.observable();
        self.ExamFee.extend({ editState : false, disableValidation : false, empty : true });
        self.TutionFee = ko.observable();
        self.TutionFee.extend({ editState : false, disableValidation : false, empty : true });
        self.DevelopmentFee = ko.observable();
        self.DevelopmentFee.extend({ editState : false, disableValidation : false, empty : true });
        self.UniformFee = ko.observable();
        self.UniformFee.extend({ editState : false, disableValidation : false, empty : true });
        self.StationaryFee = ko.observable();
        self.StationaryFee.extend({ editState : false, disableValidation : false, empty : true });
        self.OtherFee1 = ko.observable();
        self.OtherFee1.extend({ editState : false, disableValidation : false, empty : true });
        self.OtherFee2 = ko.observable();
        self.OtherFee2.extend({ editState : false, disableValidation : false, empty : true });
        self.DueDate = ko.observable();
        self.DueDate.extend({ editState : false, disableValidation : false, empty : true });
        self.include = ["_destroy", "RoomSessionID", "ID", "AdmissionFee", "ExamFee", "TutionFee", "DevelopmentFee", "UniformFee", "StationaryFee", "OtherFee1", "OtherFee2", "DueDate"];
        self.validationProperties = [];
        self._create = [];
        self.ignore = ["observable", "validationProperties", "ignore", "include", "type", "mapping", "IsValidatable", "_create", "hasID"];
        self.type = "RMPS.SMS.ViewModel.RoomFeesModel";
        ko.utils.makeComputeds(self);
        ko.utils.makeAsynCommands(self);
        ko.initModel(self);
        if (self.init) self.init();
        }
        
        RoomFeesModel.Mapping = function(){ return new RoomFeesModel(); }
        
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
        self.type = "RMPS.SMS.ViewModel.RoomSessionsDetailsModel";
        ko.utils.makeComputeds(self);
        ko.utils.makeAsynCommands(self);
        ko.initModel(self);
        if (self.init) self.init();
        }
        
        RoomSessionsDetailsModel.Mapping = function(){ return new RoomSessionsDetailsModel(); }
        
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
        self.type = "RMPS.SMS.ViewModel.RoomSessionsModel";
        ko.utils.makeComputeds(self);
        ko.utils.makeAsynCommands(self);
        ko.initModel(self);
        if (self.init) self.init();
        }
        
        RoomSessionsModel.Mapping = function(){ return new RoomSessionsModel(); }
        
    function SessionDetailsModel() {
        var self = this;
        self.IsValidatable = ko.observable(true);
        self.ID = ko.observable();
        self.ID.extend({ editState : false, disableValidation : false, empty : true });
        self.StartDate = ko.observable();
        self.StartDate.extend({ editState : false, disableValidation : false, empty : true });
        self.EndDate = ko.observable();
        self.EndDate.extend({ editState : false, disableValidation : false, empty : true });
        self.Session = ko.observable();
        self.Session.extend({ editState : false, disableValidation : false, empty : true });
        self.include = ["_destroy", "ID", "StartDate", "EndDate", "Session"];
        self.validationProperties = [];
        self._create = [];
        self.ignore = ["observable", "validationProperties", "ignore", "include", "type", "mapping", "IsValidatable", "_create", "hasID"];
        self.type = "RMPS.SMS.ViewModel.SessionDetailsModel";
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
        self.type = "RMPS.SMS.ViewModel.SessionModel";
        ko.utils.makeComputeds(self);
        ko.utils.makeAsynCommands(self);
        ko.initModel(self);
        if (self.init) self.init();
        }
        
        SessionModel.Mapping = function(){ return new SessionModel(); }
        
    function SessionStudentModel() {
        var self = this;
        self.IsValidatable = ko.observable(true);
        self.RoomSessionsID = ko.observable();
        self.RoomSessionsID.extend({ editState : false, disableValidation : false, empty : true });
        self.ClassID = ko.observable();
        self.ClassID.extend({ editState : false, disableValidation : false, empty : true });
        self.StudentID = ko.observable();
        self.StudentID.extend({ editState : false, disableValidation : false, empty : true });
        self.include = ["_destroy", "RoomSessionsID", "ClassID", "StudentID"];
        self.validationProperties = [];
        self._create = [];
        self.ignore = ["observable", "validationProperties", "ignore", "include", "type", "mapping", "IsValidatable", "_create", "hasID"];
        self.type = "RMPS.SMS.ViewModel.SessionStudentModel";
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
        self.include = ["_destroy", "ID", "FirstName", "LastName", "DateOfBirth", "FatherName", "MotherName", "Phone", "FatherQualification", "MotherQualification", "Email", "DateOfJoining", "FatherOccupation", "Category", "Cast", "Religion", "DateOfLeaving", "LocalAddress", "PermanentAddress"];
        self.validationProperties = [];
        self._create = [];
        self.ignore = ["observable", "validationProperties", "ignore", "include", "type", "mapping", "IsValidatable", "_create", "hasID"];
        self.type = "RMPS.SMS.ViewModel.StudentDetailsModel";
        ko.utils.makeComputeds(self);
        ko.utils.makeAsynCommands(self);
        ko.initModel(self);
        if (self.init) self.init();
        }
        
        StudentDetailsModel.Mapping = function(){ return new StudentDetailsModel(); }
        
    function StudentModel() {
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
        self.type = "RMPS.SMS.ViewModel.StudentModel";
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
        self.include = ["_destroy", "ID", "FirstName", "LastName", "DateOfBirth", "FatherName", "Phone", "Qualification", "Email", "DateOfJoining", "Category", "DateOfLeaving", "LocalAddress", "PermanentAddress"];
        self.validationProperties = [];
        self._create = [];
        self.ignore = ["observable", "validationProperties", "ignore", "include", "type", "mapping", "IsValidatable", "_create", "hasID"];
        self.type = "RMPS.SMS.ViewModel.TeacherDetailsModel";
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
        self.include = ["_destroy", "FirstName", "LastName", "FatherName", "DateOfBirth", "Qualification", "Phone", "Email", "Category", "DateOfJoining", "DateOfLeaving", "PermanentAddress", "LocalAddress"];
        self.validationProperties = [];
        self._create = [];
        self.ignore = ["observable", "validationProperties", "ignore", "include", "type", "mapping", "IsValidatable", "_create", "hasID"];
        self.type = "RMPS.SMS.ViewModel.TeacherModel";
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
        self.type = "RMPS.SMS.ViewModel.UserModel";
        ko.utils.makeComputeds(self);
        ko.utils.makeAsynCommands(self);
        ko.initModel(self);
        if (self.init) self.init();
        }
        
        UserModel.Mapping = function(){ return new UserModel(); }
        
    var GenderType = [
        { Text: "Male", Value: "Male", NumericValue: 1 },
        { Text: "Female", Value: "Female", NumericValue: 2 }
    ]
    
    
    GenderType.Male = { Text: "Male", Value: 1 }
    GenderType.Female = { Text: "Female", Value: 2 }
    
    

