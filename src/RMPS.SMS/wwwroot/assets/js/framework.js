
// ReSharper disable once NativeTypePrototypeExtending

/* Underscore Extensions */
_.isNullOrUndefined = function (object) {
    return _.isNull(object) || _.isUndefined(object);
};
_.isNullOrEmpty = function (value) {
    return _.isNull(value) || _.isUndefined(value) || value.length == 0;
};
_.findKeyValue = function (list, value) {
    return _.find(list, function (item) {
        return item.Value == value;
    });
};

_.findKeyValue = function (list, value) {
    return _.find(list, function (item) {
        return item.Value == value;
    });
};

var ArrayProto = Array.prototype;
var slice = ArrayProto.slice;
var oldDelay = _.delay;

// Delays a function for the given number of milliseconds, and then calls
// it with the arguments supplied.
_.delay = function (func, wait, context) {
    var args = context ? slice.call(arguments, 3) : slice.call(arguments, 2);
    return setTimeout(function () { return func.apply(context, args); }, wait);
};

var oldDefer = _.defer;

// Defers a function, scheduling it to run after the current call stack has
// cleared.
_.defer = function (func, context) {
    if (context) {
        return _.delay.apply(_, [func, 1, context].concat(slice.call(arguments, 2)));
    }
    return _.delay.apply(_, [func, 1, context].concat(slice.call(arguments, 1)));
};


/* Underscore Template Provider */
_.templateSettings = {
    interpolate: /\{\{(.+?)\}\}/g
};

var Underscore = {};

Underscore.compile = function (template) {
    return {
        compiledTemplate: _.template(template),
        render: function (context) {
            var html = this.compiledTemplate(context);
            return html;
        }
    };
};

Underscore.render = function (id, data, settings) {
    return _.template($("#" + id).html(), data, settings);
};


_.parseSize = function (value) {
    return parseInt(value, 10) || 0;
};

/* ArrayEnumerator Class*/
function ArrayEnumerator(array) {
    if (typeof array === "undefined") {
        array = null;
    }
    this.index = -1;
    this.current = null;
    this.array = array;
}

ArrayEnumerator.prototype.moveNext = function () {
    this.index++;
    this.current = this.array[this.index];
    return (this.index < this.array.length);
};
ArrayEnumerator.prototype.reset = function () {
    this.index = -1;
    this.current = null;
};
ArrayEnumerator.prototype.getCurrent = function () {
    return this.current;
};

/* Array Extensions */
// ReSharper disable once NativeTypePrototypeExtending
Array.prototype.getEnumerator = function () {
    return new ArrayEnumerator(this);
};
Array.prototype.add = function (item) {
    this[this.length] = item;
};
Array.prototype.addRange = function (items) {
    this.push.apply(this, items);
};
Array.prototype.insert = function (index, item) {
    this.splice(index, 0, item);
};
Array.prototype.remove = function (item) {
    var index = this.indexOf(item);
    if (index >= 0) {
        this.splice(index, 1);
        return true;
    }
    return false;
};
Array.prototype.removeAt = function (index) {
    this.splice(index, 1);
};

Array.prototype.removeAll = function () {
    this.splice(0, this.length);
};

Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time 
    if (this.length != array.length)
        return false;

    for (var i = 0, l = this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;
        }
        else if (this[i] != array[i]) {
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;
        }
    }
    return true;
}


/* StringBuilder */
function StringBuilder(s) {
    this.isEmpty = true;
    this.parts = _.isNullOrUndefined(s) || s === '' ? new Array() : [
        s
    ];
}

StringBuilder.prototype.append = function (s) {
    if (!_.isNullOrUndefined(s) && s !== '') {
        this.parts.add(s);
        this.isEmpty = false;
    }
    return this;
};
StringBuilder.prototype.appendLine = function (s) {
    if (!_.isNullOrUndefined(s) && s !== '') {
        this.parts.add(s);
        this.parts.add('\r\n');
        this.isEmpty = false;
    }
    return this;
};
StringBuilder.prototype.clear = function () {
    this.parts = new Array();
    this.isEmpty = true;
};
StringBuilder.prototype.toString = function (s) {
    return this.parts.join(s || '');
};

/* String Extensions*/
String.prototype.formatString = function () {
    var values = [];
    for (var i = 0; i < (arguments.length - 0) ; i++) {
        values[i] = arguments[i + 0];
    }
    return this.replace(/\{(\d+)\}/g, function (str, val) {
        var value = values[parseInt(val)];
        if (_.isNullOrUndefined(value)) {
            return '';
        }
        return value.toString();
    });
};

String.prototype.toSlug = function () {
    var slug = this.toLowerCase();
    // Replace characters specific fo croatian language
    // You don't need this part for english language
    // Also, you can replace other characters specific for other languages
    // e.g. ÃƒÂ© to e for French language etc.
    slug = slug.replace("Ã„Â", "c");
    slug = slug.replace("Ã„â€¡", "c");
    slug = slug.replace("Ã…Â¡", "s");
    slug = slug.replace("Ã…Â¾", "z");
    slug = slug.replace("Ã„â€˜", "dj");
    // Replace - with empty space
    slug = slug.replace("-", " ");
    // Replace unwanted characters with space
    slug = slug.replace(/[^a-z0-9\s-]/, " ");
    // Replace multple white spaces with single space
    slug = slug.replace(/\s+/, " ").trim();
    // Replace white space with -
    slug = slug.replace(" ", "-");
    return slug;
};

String.prototype.startsWith = function (value) {
    return this.indexOf(value) === 0;
};

String.prototype.endsWith = function (value) {
    return this.indexOf(value, this.length - value.length) !== -1;
};

String.prototype.isValidEmail = function () {
    return /^(?:^(?:[a-zA-Z0-9_'^&\/+-])+(?:\.(?:[a-zA-Z0-9_'^&\/+-])+)*@(?:(?:\[?(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))\.){3}(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\]?)|(?:[a-zA-Z0-9-]+\.)+(?:[a-zA-Z]){2,}\.?)$)$/.test(this);
};

String.prototype.lpad = function (length, padString) {
    var str = this;
    while (str.length < length)
        str = padString + str;
    return str;
};

//pads right
String.prototype.rpad = function (length, padString) {
    var str = this;
    while (str.length < length)
        str = str + padString;
    return str;
};

String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g, "");
};

//trimming space from left side of the string
String.prototype.ltrim = function () {
    return this.replace(/^\s+/, "");
};

//trimming space from right side of the string
String.prototype.rtrim = function () {
    return this.replace(/\s+$/, "");
};

Date.prototype.stdTimezoneOffset = function () {
    var jan = new Date(this.getFullYear(), 0, 1);
    var jul = new Date(this.getFullYear(), 6, 1);
    return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
};

Date.prototype.dst = function () {
    return this.getTimezoneOffset() < this.stdTimezoneOffset();
};

// adds .naturalWidth() and .naturalHeight() methods to jQuery
// for retreaving a normalized naturalWidth and naturalHeight.

var props = ['Width', 'Height'],
    prop;

while (prop = props.pop()) {
    (function (natural, prop) {
        $.fn[natural] = (natural in new Image()) ?
            function () {
                return this[0][natural];
            } :
            function () {
                var node = this[0],
                    img,
                    value;

                if (node.tagName.toLowerCase() === 'img') {
                    img = new Image();
                    img.src = node.src,
                        value = img[prop];
                }
                return value;
            };
    }('natural' + prop, prop.toLowerCase()));
}


// jQuery on an empty object, we are going to use this as our Queue
var ajaxInternalQueue = $({});

$.ajaxQueue = function (url, settings, complete) {
    var jqXhr;
    var dfd = $.Deferred();
    var promise = dfd.promise();
    // queue our ajax request
    ajaxInternalQueue.queue(doRequest);

    // run the actual query
    function doRequest(next) {
        jqXhr = $.ajax(settings).always(complete).done(dfd.resolve).fail(dfd.reject).then(next, next);
    }

    // add the abort method
    promise.abort = function (statusText) {
        // proxy abort to the jqXHR if it is active
        if (jqXhr) {
            return jqXhr.abort(statusText);
        }
        // if there wasn't already a jqXHR we need to remove from queue
        var queue = ajaxInternalQueue.queue(), index = $.inArray(doRequest, queue);
        if (index > -1) {
            queue.splice(index, 1);
        }
        // and then reject the deferred
        dfd.rejectWith(settings.context || settings, promise, statusText, "");
        return promise;
    };
    return promise;
};


if (typeof (Framework) === "undefined") {
    Framework = {};
    window._$ = Framework;
}

Framework.Utility = {};
_$.utils = Framework.Utility;
Framework.Utility.Date = {};
_$.utils.date = Framework.Utility.Date;


Framework.Utility.Date.formatDate = function (date, dateFormat, isUtc) {
    if (typeof isUtc === "undefined") {
        isUtc = true;
    }

    if (typeof dateFormat === "undefined") {
        dateFormat = 'M/D/YYYY h:mm a';
    }

    if (date) {
        if (isUtc) {
            if (moment.utc(date).year() > 1970) {
                return moment.utc(date).zone(new Date().getTimezoneOffset()).format(dateFormat);
            }
        } else {
            if (moment(date).year() > 1970) {
                return moment(date).format(dateFormat);
            }
        }
    }
    return "";
};

Framework.Utility.Date.fromNow = function (date, isUtc) {
    if (typeof isUtc === "undefined") {
        isUtc = true;
    }
    if (date) {
        if (isUtc) {
            return moment.utc(date).zone(new Date().getTimezoneOffset()).fromNow();
        } else {
            return moment(date).fromNow();
        }
    }
    return "";
};

Framework.Utility.Date.formatDuration = function (date, isUtc, withoutSuffix) {
    if (typeof isUtc === "undefined") {
        isUtc = true;
    }
    if (date) {
        if (isUtc) {
            if (moment.utc(date).year() > 1970) {
                return moment.utc(date).zone(new Date().getTimezoneOffset()).fromNow(withoutSuffix);
            }
        } else {
            if (moment(date).year() > 1970) {
                return moment(date).fromNow(withoutSuffix);
            }
        }
    }
    return "";
};

Framework.Utility.Date.humanize = function (date, isUtc, withoutSuffix) {
    if (typeof isUtc === "undefined") {
        isUtc = true;
    }
    if (date) {
        if (isUtc) {
            if (moment.utc(date).year() > 1970) {
                return moment.utc(date).zone(new Date().getTimezoneOffset()).month(0).from(moment.utc().month(0), withoutSuffix);
            }
        } else {
            if (moment(date).year() > 1970) {
                return moment(date).month(0).from(moment().month(0), withoutSuffix);
            }
        }
    }
    return "";
};


Framework.Utility.Data = {};
_$.utils.data = Framework.Utility.Data;

Framework.Utility.Data.feetOptions = ko.observableArray(['<3', '3', '4', '5', '6', '>6']);

Framework.Utility.Data.inchesOptions = ko.observableArray(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11']);

Framework.Utility.Data.poundsOptions = ko.observableArray(['<100', '100-120', '120-140', '140-160', '160-180', '180-200', '200-220', '220-240', '240-260', '260-280', '280-300', '>300']);

Framework.Utility.Data.hours = ko.observableArray(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']);
Framework.Utility.Data.min = ko.observableArray(['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '59']);
Framework.Utility.Data.timeType = ko.observableArray(['am', 'pm']);

Framework.Utility.Data.allExperiences = ko.observableArray(['<1', '1-5', '5-10', '10-15', '15-20', '20-25', '25-30', '30-35', '35-40+']);
if (typeof (Framework) === "undefined") {
    Framework = {};
    window._$ = Framework;
}

Framework.Redirector = {};

_$.redirector = Framework.Redirector;

Framework.Redirector.Redirect = function (redirectUrl) {
    window.location.assign(redirectUrl);
};

_$.redirector.redirect = Framework.Redirector.Redirect;
if (typeof (Framework) === "undefined") {
    Framework = {};
    window._$ = Framework;
}

Framework.ActionLinkBuilder = function (attributes) {
    this.attributes = attributes;
    if (this.attributes) {
        this.href = this.attributes.href;
        this.css = this.attributes.css;
        this.text = this.attributes.text;
    }

};

Framework.ActionLinkBuilder.prototype.Build = function (id) {
    var sb = new StringBuilder();
    if (!_.isNullOrEmpty(this.text)) {
        sb.append('<a href="');

        if (_.isNullOrEmpty(this.href)) {
            sb.append("javascript:void(0)");

        } else {
            sb.append(this.href.formatString(id));
        }

        sb.append('"');
        if (!_.isNullOrEmpty(this.css)) {
            sb.append(' class="' + this.css.formatString(id) + '"');
        }

        if (this.attributes) {
            for (var prop in this.attributes) {

                if (prop != 'text' && prop != 'href' && prop != 'css') {
                    var val = this.attributes[prop];

                    if (!_.isNullOrEmpty(val)) {
                        sb.append(' {0}="{1}"'.formatString(prop, val.formatString(id)));
                    }
                }
            }
        }

        sb.append('>');
        sb.append(this.text);


        sb.append('</a>');
    }
    return sb.toString();
};

Framework.ActionLinkBuilder.prototype.build = Framework.ActionLinkBuilder.prototype.Build;

_$.actionLinkBuilder = Framework.ActionLinkBuilder;

if (typeof (Framework) === "undefined") {
    Framework = {};
    window._$ = Framework;
}

Framework.AjaxRequestInfo = function (requestUrl, successCallback, errorCallback) {
    this.disableCache = false;
    this.requestUrl = requestUrl;
    this.successCallback = successCallback;
    this.errorCallback = errorCallback;
};

Framework.AjaxRequestInfo.prototype.setParamData = function (model) {
    this.paramData = Framework.DataBinder.toObject(model);
};

Framework.AjaxRequestInfo.prototype.setJsonParamData = function (model) {
    this.paramData = model;
};


_$.ajaxRequest = Framework.AjaxRequestInfo;

if (typeof (Framework) === "undefined") {
    Framework = {};
    window._$ = Framework;
}

Framework.AjaxManager = {};
_$.ajax = Framework.AjaxManager;

Framework.AjaxManager.configureCallback = undefined;

Framework.AjaxManager.init = function () {
    $.ajaxPrefilter(function (options, originalOptions, jqXhr) {
        // Modify options, control originalOptions, store jqXHR, etc
        var headers = originalOptions.headers || {

        };

        if (Framework.AjaxManager.configureCallback) {
            Framework.AjaxManager.configureCallback(headers);
        }
        var xhrFields = originalOptions.xhrFields || {

        };
        xhrFields.withCredentials = true;

        options.headers = headers;
        options.xhrFields = xhrFields;
    });
    $(document).ajaxSend(function (event, jqxhr, settings) {
    });
};

Framework.AjaxManager._parseError = function (jqXhr) {
    switch (jqXhr.status) {
        case 200:
        case 500:
            return JSON.parse(jqXhr.responseText);
        default:
            return {
                StatusCode: jqXhr.status,
                ErrorMessage: jqXhr.statusText
            };
    }
};

Framework.AjaxManager.get = function (request, complete) {
    var options = {};
    options.beforeSend = request.sendingCallback;
    options.type = 'GET';
    options.url = request.requestUrl;


    if (request.disableCache) {
        options.cache = false;
    }
    options.converters = {
        'text jsonp': JSON.parse,
        'text json': JSON.parse
    };
    options.contentType = 'application/json; charset=utf-8';
    options.dataType = 'json';
    if (request.errorCallback) {
        options.error = function (jqXhr, textStatus, errorThrow) {
            var parseError = Framework.AjaxManager._parseError(jqXhr);
            if (parseError.StatusCode !== 0) {
                request.errorCallback(parseError, jqXhr, textStatus, errorThrow);
            }
        };
    }
    options.success = request.successCallback;
    $.ajaxQueue(request.requestUrl, options, complete);
};

Framework.AjaxManager.add = function (request, enableResponse, complete) {
    var options = {};
    options.beforeSend = request.sendingCallback;
    options.type = 'POST';
    options.url = request.requestUrl;
    options.contentType = 'application/json; charset=utf-8';
    options.dataType = enableResponse ? 'json' : 'text';
    if (request.errorCallback) {
        options.error = function (jqXhr, textStatus, errorThrow) {
            request.errorCallback(Framework.AjaxManager._parseError(jqXhr), jqXhr, textStatus, errorThrow);
        };
    }
    options.success = request.successCallback;
    options.data = JSON.stringify(request.paramData);
    $.ajaxQueue(request.requestUrl, options, complete);
};

Framework.AjaxManager.save = function (request, enableResponse, complete) {
    var options = {};
    options.beforeSend = request.sendingCallback;
    options.type = 'PUT';
    options.url = request.requestUrl;
    options.contentType = 'application/json; charset=utf-8';
    options.dataType = enableResponse ? 'json' : 'text';
    if (request.errorCallback) {
        options.error = function (jqXhr, textStatus, errorThrow) {
            request.errorCallback(Framework.AjaxManager._parseError(jqXhr), jqXhr, textStatus, errorThrow);
        };
    }
    options.success = request.successCallback;
    options.data = JSON.stringify(request.paramData);
    $.ajaxQueue(request.requestUrl, options, complete);
};

Framework.AjaxManager.remove = function (request, enableResponse, complete) {
    var options = {};
    options.beforeSend = request.sendingCallback;
    options.type = 'Delete';
    options.url = request.requestUrl;
    options.contentType = 'application/json; charset=utf-8';
    options.dataType = enableResponse ? 'json' : 'text';
    if (request.errorCallback) {
        options.error = function (jqXhr, textStatus, errorThrow) {
            request.errorCallback(Framework.AjaxManager._parseError(jqXhr), jqXhr, textStatus, errorThrow);
        };
    }
    options.success = request.successCallback;
    $.ajaxQueue(request.requestUrl, options, complete);
};


$(function () {
    Framework.AjaxManager.init();
});

if (typeof (Framework) === "undefined") {
    Framework = {};
    window._$ = Framework;
}

Framework.DataBinder = {};
_$.databinder = Framework.DataBinder;

Framework.DataBinder.buildModel = function (model, data) {
    if (!_.isNullOrUndefined(data)) {
        var mapping = {};
        if (!_.isNullOrUndefined(model)) {
            if (!_.isNullOrUndefined(model.ignore)) {
                mapping.ignore = model.ignore;
            }
            if (!_.isNullOrUndefined(model.include)) {
                mapping.include = model.include;
            }
            mapping.copy = _.difference(_.keys(data), mapping.include);

            if (!_.isNullOrUndefined(model._create)) {
                _.each(model._create, function (prop) {
                    if (model[prop].isDictionary) {
                        mapping[prop] = {
                            update: function (options) {
                                var result = [];
                                var dictionary = options.data;
                                _.each(_.keys(dictionary), function (key) {
                                    var value = dictionary[key];
                                    if (_.isArray(value)) {
                                        result.push({ Key: key, Value: value });
                                    } else {
                                        result.push(value);
                                    }
                                });
                                return result;
                            }
                        }
                    }
                });
            }
        }

        var retValue = ko.mapping.fromJS(data, mapping, model)
        return retValue;
    }

    return model;
};

Framework.DataBinder.toObject = function (model) {
    var mapping = {
        ignore: ko.mapping.defaultOptions().ignore,
        include: ko.mapping.defaultOptions().include
    };
    if (!_.isNullOrUndefined(model)) {
        if (!_.isNullOrUndefined(model.ignore)) {
            mapping.ignore = model.ignore;
        }
        if (!_.isNullOrUndefined(model.include)) {
            mapping.include = model.include;
        }
        mapping.ignore = _.union(mapping.ignore, _.difference(_.keys(model), mapping.include));
        return ko.mapping.toJS(model, mapping);
    }
};

Framework.DataBinder.cloneObject = function (model, mappingFunc) {
    var data = Framework.DataBinder.toObject(model);

    var newModel = !_.isNullOrUndefined(mappingFunc) ? mappingFunc() : undefined;

    return Framework.DataBinder.buildModel(newModel, data);

};

Framework.DataBinder.parseModel = function (data, observable, mappingFunc) {
    var mapping = {};
    if (!_.isNullOrUndefined(mappingFunc)) {
        mapping.create = function (options) {
            var viewModel = mappingFunc();
            var modelMapping = {

            };
            if (!_.isNullOrUndefined(viewModel.ignore)) {
                modelMapping.ignore = viewModel.ignore;
            }
            if (!_.isNullOrUndefined(viewModel.include)) {
                modelMapping.include = viewModel.include;
            }
            if (_.isObject(options.data)) {
                modelMapping.copy = _.difference(_.keys(options.data), viewModel.include);
            }
            var model = ko.mapping.fromJS(options.data, modelMapping, viewModel);
            return model;
        };
    }
    return ko.mapping.fromJS(data, mapping, observable);
};

Framework.DataBinder.applyBinding = function (model, id, data) {
    model = Framework.DataBinder.buildModel(model, data);
    if (!_.isNullOrUndefined(model)) {
        if (!_.isNullOrEmpty(id)) {
            var element = window.document.getElementById(id);
            if (element) {
                var isObservable = element.observable;
                if (!isObservable) {
                    ko.applyBindings(model, element);
                    element.observable = true;
                }
            }
        }
    }
};

Framework.DataBinder.removeBinding = function (model, id) {
    if (!_.isNullOrUndefined(model)) {
        if (!_.isNullOrEmpty(id)) {
            var element = window.document.getElementById(id);
            if (element) {
                var isObservable = (element).observable;
                if (isObservable) {
                    ko.cleanNode(element);
                    (element).observable = false;
                }
            }
        }
    }
};

Framework.DataBinder.Formatters = {};
_$.databinder.formatters = Framework.DataBinder.Formatters;

Framework.DataBinder.Formatters.fromNow = function (date) {
    return Framework.Utility.Date.fromNow(date, false);
};

Framework.DataBinder.Formatters.fromNow = function (date) {
    return Framework.Utility.Date.fromNow(date, false);
};

Framework.DataBinder.Formatters.formatDate = function (date, dateFormat, isUtc) {
    return Framework.Utility.Date.formatDate(date, dateFormat, isUtc);
};

Framework.DataBinder.Formatters.formatArray = function (values) {
    var sb = new StringBuilder();
    var $enum1 = values.getEnumerator();
    while ($enum1.moveNext()) {
        var value = $enum1.getCurrent();
        sb.append(value);
        sb.appendLine('<br/>');
    }
    return sb.toString();
};

var notify = window.notify = {
    log: function (message) {
        if (!_.isNullOrEmpty(message)) {
            console.log(message);
            this.show(message, { barType: "danger" });

        }
    },
    warn: function (message) {
        if (!_.isNullOrEmpty(message)) {
            console.warn(message);
            this.show(message, { barType: "warning" });
        }
    },
    info: function (message) {
        if (!_.isNullOrEmpty(message)) {
            console.info(message);
            this.show(message, { barType: "info" });
        }
    },
    error: function (message) {
        if (!_.isNullOrEmpty(message)) {
            console.error(message);
            this.show(message, { barType: "danger" });
        }
    },
    success: function (message) {
        if (!_.isNullOrEmpty(message)) {
            console.log(message);
            this.show(message, { barType: "success" });
        }
    },
    show: function (message, options) {


        var alertTypes = ["info", "warning", "danger", "success"];

        var defaults = {
            autoDismiss: true,
            autoLinkClass: true,
            barType: alertTypes[0],
            dismissTimeout: 3000,
            dismissEffect: "slide",
            dismissSpeed: "fast"
        };

        var settings = $.extend({}, defaults, options || {});

        if (notify._element && notify._element.length > 0) {
            notify.Logger(settings.barType, message);
            return;
        }

        var iconTemplate;

        switch (settings.barType) {
            case "info":
                iconTemplate = '<span><i class="fa fa-info"></i></span>';
                break;
            case "warning":
                iconTemplate = '<span><i class="fa fa-exclamation-triangle"></i></span>';
                break;
            case "danger":
                iconTemplate = '<span><i class="fa fa-times"></i></span>';
                break;
            case "success":
                iconTemplate = '<span><i class="fa fa-check"></i></span>';
                break;
            default:
                iconTemplate = '<span><i class="fa fa-info"></i></span>';
                break;
        }


        var template = $("<div class=\"alert alert-dismissable notify-messages\">" + iconTemplate +
            "<button type=\"button\" class=\"close fa fa-times-circle\" aria-hidden=\"true\"></button>" +
            "</div>");

        template.addClass("alert-" + settings.barType);
        template.append(message);

        if (settings.autoLinkClass) {
            template.find("a").addClass("alert-link");
        }

        function triggerClick() {
            $(template).find(".close").trigger("click");
        }

        $("body").prepend(template).animate({ paddingTop: "42px" });

        template.slideDown(300);
        console.log(settings.barType);
        if (settings.barType == 'success' && settings.autoDismiss) {
            setTimeout(triggerClick, settings.dismissTimeout);
        }

        $(template).find(".close").unbind("click");

        $(template.find(".close")).on("click", function () {
            $("body").animate({ paddingTop: "42px" });
            if (settings.dismissEffect === "slide") {
                $(template).slideUp(settings.dismissSpeed, function () {
                    $(template).remove();

                });

            } else {
                $(template).fadeOut(settings.dismissSpeed, function () {
                    $(template).remove();

                });
            }


        });
    },
    clear: function (clearConsole) {
        if (clearConsole) {
            console.clear();
        }

        if (notify._element) {
            notify._element.empty();
        }
        //$.noty.closeAll();
    },
    assert: function (expression, message, object) {
        console.assert(expression, message, object);
    },
    dir: function (object) {
        console.dir(object);
    }
};

notify._delay = 5000;
notify._pulse = [];
notify._pulse["alert-success"] = "#b8df92";
notify._pulse["alert-info"] = "#84d8ed";
notify._pulse["alert-danger"] = "#f29797";
notify._pulse["alert-warning"] = "#f7dc6f";


notify._element = undefined;
notify._template = "<div class=\"alert alert-dismissable\">{0}</div>";

notify.Logger = function (type, message) {
    var alertClass;
    switch (type) {
        case 'success':
            alertClass = 'alert-success';
            break;
        case 'info':
            alertClass = 'alert-info';
            break;
        case 'danger':
            alertClass = 'alert-danger';
            break;
        case 'warning':
            alertClass = 'alert-warning';
            break;
        default:
            alertClass = 'alert-info';
            break;
    }

    if (!notify._element) {
        notify._element = $("#notify").empty();
    }

    if (notify._element && notify._element.length > 0) {
        notify._element.empty();

        var iconTemplate;

        switch (type) {
            case "info":
                iconTemplate = '<span><i class="fa fa-info"></i></span>';
                break;
            case "warning":
                iconTemplate = '<span><i class="fa fa-exclamation-triangle"></i></span>';
                break;
            case "danger":
                iconTemplate = '<span><i class="fa fa-times"></i></span>';
                break;
            case "success":
                iconTemplate = '<span><i class="fa fa-check"></i></span>';
                break;
            default:
                iconTemplate = '<span><i class="fa fa-info"></i></span>';
                break;
        }

        notify._element.append($(notify._template.formatString(iconTemplate)));

        var alertBox = $(".alert", notify._element);

        alertBox.addClass(alertClass).append(message);

        var alert = $(alertBox).alert().show();
    }
};


$(function () {
    notify._element = $("#notify").empty();
});



ko.extenders.DOMElement = function (target, element) {
    target.DOMElement = element;
    return target;
};

ko.utils.isPropertyValidatable = function (model, property) {
    return model.IsValidatable() && model[property] && model[property].DisableValidation && (model[property].DisableValidation() === false)
}

ko.utils.isValid = function (viewModel, validationLog) {
    var valid = true;
    if (viewModel.Items) {
        _.each(viewModel.Items(), function (item) {
            valid = valid && ko.utils.isValid(item);
        });
    } else {
        _.each(viewModel.validationProperties, function (name) {
            var obsv = viewModel[name];

            if (ko.utils.isValidatable(obsv)) {
                valid = valid && obsv.isValid();


                if (validationLog) {
                    if (console && console.log) {
                        var val = ko.unwrap(obsv);

                        if (!valid) {
                            console.log(name + " Property, Value: {0}, Validation: Failed ".formatString(val ? val : 'undefined'), obsv);
                        }
                    }
                }

                if (!valid && obsv.DOMElement) {
                    var errorMessage = ko.unwrap(obsv.error);

                    if (!_.isNullOrEmpty(errorMessage)) {
                        var isVisible = $(obsv.DOMElement).is(':visible') || $(obsv.DOMElement).is(':hidden');
                        if (isVisible === true) {
                            $(obsv.DOMElement)
                                .addClass('validation-error')
                                .attr('data-original-title', errorMessage)
                                .tooltip('fixTitle')
                                .tooltip('show');
                        } else {
                            notify.warn(name + ":" + errorMessage);
                        }

                    } else {
                        $(obsv.DOMElement).removeClass('validation-error').attr('data-original-title', '').tooltip('fixTitle').tooltip('hide');
                    }


                } else {
                    $(obsv.DOMElement).removeClass('validation-error').attr('data-original-title', '').tooltip('fixTitle').tooltip('hide');
                }
            } else {
                var childObj = obsv();
                if (childObj && _.isObject(childObj)) {
                    valid = valid && ko.utils.isValid(childObj);
                }
            }
        });
    }

    return valid;
};


ko.buildAsyncCommand = function (cmd) {
    cmd.isAsyncCommand = true;
    return cmd;
};

ko.buildComputed = function (value) {
    value.isComputed = true;
    return value;
};

ko.utils.makeComputeds = function (obj) {
    // console.dir(obj);

    for (var prop in obj) {
        if (obj[prop] && obj[prop].isComputed) {
            if (_.isFunction(obj[prop])) {
                obj[prop] = ko.computed(obj[prop], obj, {
                    deferEvaluation: true
                });
            } else if (_.isObject(obj[prop])) {
                var options = obj[prop];
                options.owner = obj;
                options.deferEvaluation = true;
                obj[prop] = ko.computed(options);
            }
        }
    }
};

ko.utils.makeAsynCommands = function (obj) {
    for (var prop in obj) {
        if (obj[prop] && obj[prop].isAsyncCommand) {
            if (_.isObject(obj[prop])) {
                obj[prop] = ko.asyncCommand(obj[prop], obj);
            }
        }
    }
};

ko.isUpdated = function () {
    var updated = ko.observable(0);

    var result = ko.computed(
    {
        read: updated,
        write: function (value) {
            updated(value);
        }
    });

    for (var index in arguments) {
        var obs = arguments[index];


        if (ko.isObservable(obs)) {
            obs.subscribe(function () {
                result(result() + 1);
            });
        } else {

            if (obs.Items && ko.isObservable(obs.Items)) {
                obs.Items.subscribe(function () {
                    result(result() + 1);
                });
            }
        }
    }

    return result;
};

ko.command = function (options, context) {
    var self = function () {
        return self.execute.apply(this, arguments);
    },
        canExecuteDelegate = options.canExecute,
        validateDelegate = options.validate,
        executeDelegate = options.execute;

    self.canExecute = ko.computed(function () {
        return canExecuteDelegate ? canExecuteDelegate.call(context) : true;
    });

    self.execute = function () {
        // Needed for anchors since they don't support the disabled state
        if (!self.canExecute()) return;
        var args = _.toArray(arguments); // Allow for these arguments to be passed on to execute delegate

        return executeDelegate.apply(context, args);
    };

    self.validate = function () {
        // Needed for anchors since they don't support the disabled state
        if (!self.canExecute()) return;
        return validateDelegate ? validateDelegate.apply(context) : true;
    };

    return self;
};

ko.asyncCommand = function (options, context) {
    var self = function () {
        return self.execute.apply(this, arguments);
    },
        canExecuteDelegate = options.canExecute,
        executeDelegate = options.execute,
        validateDelegate = options.validate,
        completeCallback = function () {
            self.isExecuting(false);
        };

    self.isExecuting = ko.observable();

    self.canExecute = ko.computed(function () {
        return canExecuteDelegate ? canExecuteDelegate.call(context, self.isExecuting()) : !self.isExecuting();
    }, this);

    self.execute = function () {
        // Needed for anchors since they don't support the disabled state
        if (!self.canExecute()) return;

        var args = _.toArray(arguments); // Allow for these arguments to be passed on to execute delegate

        args.push(completeCallback);
        self.isExecuting(true);
        return executeDelegate.apply(context, args);
    };

    self.validate = function () {
        // Needed for anchors since they don't support the disabled state
        if (!self.canExecute()) return;
        return validateDelegate ? validateDelegate.apply(context) : true;
    };

    return self;
};

ko.simulatedObservable = (function () {

    var timer = null;
    var items = [];

    var check = function () {
        items = items.filter(function (item) {
            return !!item.elem.parents('html').length;
        });
        if (items.length === 0) {
            clearInterval(timer);
            timer = null;
            return;
        }
        items.forEach(function (item) {
            item.obs(item.getter());
        });
    };

    return function (elem, getter) {
        var result = ko.observable(getter());
        items.push({ obs: result, getter: getter, elem: $(elem) });
        if (timer === null) {
            timer = setInterval(check, 100);
        }
        return result;
    };
})();

ko.onDemandObservable = function (callback, mapping, owner) {
    var currentValue = ko.observable({

    }); //private observable

    var result = ko.computed({
        read: function () {
            //if it has not been loaded, execute the supplied function
            if (!result.loaded()) {
                callback.apply(owner, result, mapping);
            }
            //always return the current value
            return currentValue();
        },
        write: function (newValue) {
            //indicate that the value is now loaded and set it
            result.loaded(true);
            currentValue(newValue);
        },
        deferEvaluation: true
    });
    //do not evaluate immediately when created
    //expose the current state, which can be bound against
    result.loaded = ko.observable(false);

    result.actual = currentValue;

    //load it again
    result.refresh = function () {
        result.loaded(false);
    };
    result.subscribe = _.bind(currentValue.subscribe, currentValue);
    result.notifySubscribers = _.bind(currentValue.notifySubscribers, currentValue);
    return result;
};

ko.subscribable.fn.formatted = function (formatter) {
    var target = this;
    var args = _.toArray(arguments).slice(2);
    target.formatted = ko.computed(function () {
        return formatter.apply(null, _.toArray(args).insert(0, ko.utils.unwrapObservable(target)));
    });

    return target;
};

ko.onDemandObservableArray = function (callback, mapping, owner) {
    var currentValue = ko.observableArray([]); //private observable

    var result = ko.computed({
        read: function () {
            //if it has not been loaded, execute the supplied function
            if (!result.loaded()) {
                callback.call(owner, result, mapping);
            }
            //always return the current value
            return currentValue();
        },
        write: function (newValue) {
            //indicate that the value is now loaded and set it
            result.loaded(true);
            currentValue(newValue);
        },
        deferEvaluation: true
    });
    //do not evaluate immediately when created
    //expose the current state, which can be bound against
    result.loaded = ko.observable(false);

    //expose the actual observableArray in case you need to operate on it
    result.actual = currentValue;

    //load it again
    result.refresh = function () {
        result([]);
        result.loaded(false);
    };
    result.subscribe = _.bind(currentValue.subscribe, currentValue);
    result.notifySubscribers = _.bind(currentValue.notifySubscribers, currentValue);
    result.indexOf = _.bind(currentValue.indexOf, currentValue);
    result.slice = _.bind(currentValue.slice, currentValue);
    result.splice = _.bind(currentValue.splice, currentValue);
    result.pop = _.bind(currentValue.pop, currentValue);
    result.push = _.bind(currentValue.push, currentValue);
    result.shift = _.bind(currentValue.shift, currentValue);
    result.unshift = _.bind(currentValue.unshift, currentValue);
    result.reverse = _.bind(currentValue.reverse, currentValue);
    result.sort = _.bind(currentValue.sort, currentValue);
    result.replace = _.bind(currentValue.replace, currentValue);
    result.remove = _.bind(currentValue.remove, currentValue);
    result.removeAll = _.bind(currentValue.removeAll, currentValue);
    result.destroy = _.bind(currentValue.destroy, currentValue);
    result.destroyAll = _.bind(currentValue.destroyAll, currentValue);

    return result;
};

Function.prototype.computed = function () {
    this.isComputed = true;
    return this;
};

ko.utils.isValidatable = function (o) {
    return o && o.rules && o.isValid && o.isModified;
};

ko.utils.isArray = function (o) {
    return o.isArray || Object.prototype.toString.call(o) === '[object Array]';
};

ko.utils._days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];

ko.utils.getDate = function (daysObservable, monthObservable, yearObservable, max, skipYears) {
    if (!max) {
        max = 80;
    }

    if (!skipYears) {
        skipYears = 0;
    }
    var currentDay = daysObservable();
    var currentMonth = monthObservable();
    var currentYear = yearObservable();

    var days = ko.observableArray(getDays());

    yearObservable.subscribe(function (newValue) {
        currentYear = newValue;
        currentDay = daysObservable();
        updateDay();
    });

    monthObservable.subscribe(function (newValue) {
        currentMonth = newValue;
        currentDay = daysObservable();
        updateDay();
    });

    function updateDay() {
        var newDays = getDays();

        if (newDays.indexOf(currentDay) == -1) {
            currentDay = '';
        }

        daysObservable(currentDay);
        days(newDays);
    }


    function isLeapYear() {
        return (currentYear === "" || ((currentYear % 4 === 0) && (currentYear % 100 !== 0)) || (currentYear % 400 === 0));
    }

    function getDays() {
        var allDays = [];

        if (currentMonth && currentYear) {
            switch (currentMonth) {
                case 1:
                case 3:
                case 5:
                case 7:
                case 8:
                case 10:
                case 12:
                    for (ii = 0; ii < 31; ii++) {
                        allDays[ii] = ko.utils._days[ii];
                    }
                    break;
                case 2:
                    var febDays = 0;
                    if (isLeapYear(currentYear)) {
                        febDays = 29;
                    } else {
                        febDays = 28;
                    }
                    for (ii = 0; ii < febDays; ii++) {
                        allDays[ii] = ko.utils._days[ii];
                    }
                    break;
                case 4:
                case 6:
                case 9:
                case 11:
                    for (ii = 0; ii < 30; ii++) {
                        allDays[ii] = ko.utils._days[ii];
                    }
                    break;
            }

            return allDays;
        }

        return ko.utils._days;
    }

    function getMonth() {

        return ko.observableArray(MonthType);
    }

    function getYears() {
        var year = parseInt(new Date().getFullYear()) - skipYears;

        var yearsList = [];

        for (var i = 0; i < max; i++) {
            yearsList.push(year--);
        }

        return ko.observableArray(yearsList);
    }


    return {
        days: days,

        months: getMonth(),
        years: getYears()
    };
};

ko.observable.fn.mapping = function (mappingFunc) {
    var target = this;
    var result = ko.computed({
        read: target,
        write: //always return the original observables value
            function (newValue) {
                Framework.DataBinder.parseModel(newValue, target, mappingFunc);
            }
    });
    //initialize with current value
    result(target());
    result.subscribe = _.bind(target.subscribe, target);
    result.invalidate = function () {
        target.valueHasMutated();
    };
    var value = target.peek();
    if (_.isArray(value)) {
        var targetArray = target;
        result.indexOf = _.bind(targetArray.indexOf, targetArray);
        result.slice = _.bind(targetArray.slice, targetArray);
        result.splice = _.bind(targetArray.splice, targetArray);
        result.pop = _.bind(targetArray.pop, targetArray);
        result.push = _.bind(targetArray.push, targetArray);
        result.shift = _.bind(targetArray.shift, targetArray);
        result.unshift = _.bind(targetArray.unshift, targetArray);
        result.reverse = _.bind(targetArray.reverse, targetArray);
        result.sort = _.bind(targetArray.sort, targetArray);
        result.replace = _.bind(targetArray.replace, targetArray);
        result.remove = _.bind(targetArray.remove, targetArray);
        result.removeAll = _.bind(targetArray.removeAll, targetArray);
        result.destroy = _.bind(targetArray.destroy, targetArray);
        result.destroyAll = _.bind(targetArray.destroyAll, targetArray);
    }
    //return the new computed observable
    return result;
};

ko.validatedObservable = function (initialValue) {
    if (!ko.validation.utils.isObject(initialValue)) {
        return ko.observable(initialValue).extend({ validatable: true });
    }

    var obsv = ko.observable(initialValue);
    obsv.lastErrors = ko.observable(ko.validation.group(initialValue));
    obsv.subscribe(function (newValue) {
        obsv.lastErrors(ko.validation.group(newValue));
    });

    obsv.errors = function () {
        return obsv.lastErrors()();
    };

    obsv.isValid = ko.computed(function () {
        return obsv.errors().length === 0;
    });

    return obsv;
};

ko.utils.wrapAccessor = function (accessor) {
    return function () {
        return accessor;
    };
};

var origsetOptionNodeSelectionState = ko.utils.setOptionNodeSelectionState;

ko.utils.setOptionNodeSelectionState = function (optionNode, isSelected) {
    origsetOptionNodeSelectionState(optionNode, isSelected);

    if (isSelected) {
        $(optionNode).attr("selected", "selected");
    } else {
        $(optionNode).removeAttr("selected");
    }
};

ko.observable.fn.toString = function () {
    return "observable: " + ko.toJSON(this(), null, 2);
};

ko.computed.fn.toString = function () {
    return "computed: " + ko.toJSON(this(), null, 2);
};


var existing = ko.bindingProvider.instance;

ko.bindingProvider.instance = {
    nodeHasBindings: existing.nodeHasBindings,
    getBindings: function (node, bindingContext) {
        var bindings;
        try {
            bindings = existing.getBindings(node, bindingContext);
        } catch (ex) {
            if (console && console.error) {
                console.error("binding error", ex.message, node, bindingContext);
            }
        }

        return bindings;
    }
};

ko.validation.init({
    decorateElement: true,
    registerExtenders: true,
    messagesOnModified: true,
    insertMessages: false,
    parseInputAttributes: true,
    messageTemplate: null,
    errorClass: 'validation-error',
    errorElementClass: 'validation-error',
    grouping: { deep: true, observable: true }
});

ko.extenders.numeric = function (target, precision) {
    target.Precision = ko.observable(precision);
    return target;
};

ko.extenders.editState = function (target, defaultState) {
    target.EditState = ko.observable(defaultState);
    target.EditState.Toggle = function () {
        target.EditState(!target.EditState());
    };
    return target;
};

ko.extenders.disableValidation = function (target, defaultState) {
    target.DisableValidation = ko.observable(defaultState);
    return target;
};

ko.extenders.empty = function (target) {
    target.Empty = function () {
        target(undefined);
    };
    return target;
};

ko.observableArray.fn.toCsv = function ($enum) {
    return ko.computed(function () {
        var allItems = this();
        if ($enum) {
            var $enumArray = ko.utils.unwrapObservable($enum);
            var newItems = [];
            _.each(allItems, function (data) {
                var $enumValue = ko.utils.unwrapObservable(data);

                var $selectedEnum = _.find($enumArray, function (value) {
                    return value.Value == $enumValue;
                });

                if (!_.isNullOrUndefined($selectedEnum)) {
                    newItems.push($selectedEnum.Text);
                }
            });

            return newItems.join(", ");
        }

        return _.map(allItems, function (data) {
            return ko.utils.unwrapObservable(data);
        }).join(", ");

    }, this);
};

ko.computed.fn.toCsv = ko.observableArray.fn.toCsv;

ko.observableArray.fn.getRows = function ($length) {
    return ko.computed(function () {
        var allItems = this();
        if ($length) {
            var result = [],
                colLength = parseInt($length, 10),
                row;

            _.each(allItems, function (data, i) {
                if (i % colLength === 0) {
                    if (row) {
                        result.push(row);
                    }
                    row = [];
                }
                row.push(data);
            });

            //push the final row  
            if (row) {
                result.push(row);
            }

            return result;
        }

        return allItems;

    }, this);
};

ko.computed.fn.getRows = ko.observableArray.fn.getRows;

ko.observableDictionary = function (value) {
    var result = ko.observableArray(value);
    result.isDictionary = true;
    return result;
};




// Templates used to render the grid
ko._templateEngine = new ko.nativeTemplateEngine();

ko._templateEngine.addTemplate = function (templateName, templateMarkup) {
    document.write("<script type='text/html' id='" + templateName + "'>" + templateMarkup + "<" + "/script>");
};


ko.bindingHandlers.hidden = {
    update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var value = ko.utils.unwrapObservable(valueAccessor());
        ko.bindingHandlers.visible.update(element, function () {
            return !value;
        }, allBindingsAccessor, viewModel, bindingContext);
    }
};


ko.bindingHandlers.wysihtml5 = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        if (ko.utils.tagNameLower(element) === "textarea") {
            var wysihtml5Editor;
            that = $(element);
            var id = _.uniqueId('wysihtml5-');
            var pauseNotifications = false;
            var options = valueAccessor();
            var valueObservable = options.on;
            var that;
            var defaultOptions = {
                name: id,
                "events": {
                    load: function () {
                        wysihtml5Editor = that.data("wysihtml5").editor;
                        $('.' + id).contents().find('body').on("keyup", function () {
                            if (ko.isWriteableObservable(valueObservable)) {
                                pauseNotifications = true;
                                valueObservable(wysihtml5Editor.getValue());
                                _.delay(function () { pauseNotifications = false; }, 10);
                            }
                        });
                    },
                    change: function () {
                        if (wysihtml5Editor) {
                            if (ko.isWriteableObservable(valueObservable)) {
                                pauseNotifications = true;
                                valueObservable(wysihtml5Editor.getValue());
                                _.delay(function () { pauseNotifications = false; }, 10);
                            }
                        }
                    }
                }
            };
            options = $.extend(true, {}, defaultOptions, _.omit(options, 'on'));
        }

        // allow inner elements' bindings to finish before initializing the widget
        ko.applyBindingsToDescendants(bindingContext, element);

        that.wysihtml5(options);

        if (ko.isObservable(valueObservable)) {
            var value = ko.unwrap(valueObservable);

            if (value) {
                if (wysihtml5Editor) {
                    wysihtml5Editor.setValue(value);
                }
            }

            var subscription = valueObservable.subscribe(function (newValue) {
                if (wysihtml5Editor) {
                    if (pauseNotifications === false) {
                        wysihtml5Editor.setValue(newValue);
                    }
                }
            });

            ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                subscription.dispose();
            });
        }


        ko.utils.domNodeDisposal.addDisposeCallback(element, function () {

        });

        // the inner elements have already been taken care of
        return { controlsDescendantBindings: true };
    }
};


ko.bindingHandlers.tagsinput = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var options = valueAccessor();
        var valueObservable = options.on;
        var that = $(element);

        var id = that.attr('id') || _.uniqueId('tagsinput-');
        that.attr('id', id);
        var defaultOptions = {

        };
        options = $.extend(true, {}, defaultOptions, _.omit(options, 'on'));

        var inSync = false;
        if (ko.isObservable(valueObservable) && valueObservable.push) {
            options.onAddTag = function (value) {
                if (!inSync) {
                    valueObservable.push(value);
                }
            }

            options.onRemoveTag = function (value) {
                if (!inSync) {
                    valueObservable.remove(value);
                }
            }
            valueObservable.subscribe(function (newValue) {
                inSync = true;
                that.importTags('');

                _.each(newValue, function (item) {

                    if (!_.isNullOrEmpty(item)) {
                        that.addTag(item);
                    }
                });

                setTimeout(function () {
                    $('#' + id + '_tag').focus();
                }, 100);
                inSync = false;
            });
        }


        that.tagsInput(options);

    }
};


ko._templateEngine.addTemplate("_ko_pager", "\
              <ul class=\"pagination\" data-bind=\"visible: Pages().length > 1\">\
                    <!-- ko if: IsFirstPage -->\
                    <li class=\"disabled\"><span>&laquo;&laquo;</span></li>\
                    <!-- /ko -->\
                    <!-- ko ifnot: IsFirstPage -->\
                    <li><a href=\"javascript:void(0)\" data-bind=\"click: function(){ gotoPage(0); }\">&laquo;</a></li>\
                    <!-- /ko -->\
                    <!-- ko if: HasPreviousPage -->\
                    <li><a href=\"javascript:void(0)\" data-bind=\"click: function(){ previousPage(); }\">&laquo;</a></li>\
                    <!-- /ko -->\
                    <!-- ko ifnot: HasPreviousPage -->\
                    <li class=\"disabled\"><span>&laquo;</span></li>\
                    <!-- /ko -->\
                    <!-- ko foreach: Pages -->\
                    <!-- ko if: isFinite($data) -->\
                    <!-- ko if: $data === $parent.PageNumber() -->\
                    <li class=\"active\"><span data-bind=\"text: $data\"></span></li>\
                    <!-- /ko -->\
                    <!-- ko if: $data !== $parent.PageNumber() -->\
                    <li><a href=\"javascript:void(0)\" data-bind=\"text: $data, click: function(){ $parent.gotoPage($data - 1); }\"></a></li>\
                    <!-- /ko -->\
                    <!-- /ko -->\
                    <!-- ko if: isNaN($data) -->\
                    <li><span data-bind=\"text: $data\"></span></li>\
                    <!-- /ko -->\
                    <!-- /ko -->\
                    <!-- ko if: HasNextPage -->\
                    <li><a href=\"javascript:void(0)\" data-bind=\"click: function(){ nextPage(); }\">&raquo;</a></li>\
                    <!-- /ko -->\
                    <!-- ko ifnot: HasNextPage -->\
                    <li class=\"disabled\"><span>&raquo;</span></li>\
                    <!-- /ko -->\
                    <!-- ko if: IsLastPage -->\
                    <li class=\"disabled\"><span>&raquo;&raquo;</span></li>\
                    <!-- /ko -->\
                    <!-- ko ifnot: IsLastPage -->\
                    <li><a href=\"javascript:void(0)\" data-bind=\"click: function(){ gotoPage(PageCount() - 1); }\">&raquo;&raquo;</a></li>\
                    <!-- /ko -->\
              </ul>");

ko.bindingHandlers.paging = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        if (viewModel.Pages) {
            ko.renderTemplate('_ko_pager', viewModel, {
                templateEngine: ko._templateEngine
            }, element, "replaceChildren");
        }

        return {
            'controlsDescendantBindings': true
        };
    },
    update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        /* if (viewModel.Pages) {
             ko.renderTemplate('_ko_pager', viewModel, {
                 templateEngine: ko._templateEngine
             }, element, "replaceNode");
         }*/
    }
};


ko.bindingHandlers.bdropdownHover = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        var value = valueAccessor();

        var valueUnwrapped;
        if (ko.isObservable(value)) {
            value.subscribe(function () {
                _.delay(function () {
                    $(element).dropdownHover('refresh');
                }, 2);

            });
            valueUnwrapped = value();
        } else {
            valueUnwrapped = value;
        }

        var defaultOptions = {
            delay: 500,
            instantlyCloseOthers: true
        };

        ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
            $(element).dropdownHover('destroy');
        });


        var options = {};
        if (_.isObject(valueUnwrapped)) {
            options = valueUnwrapped;
        }

        options = $.extend(true, {}, defaultOptions, options);
        $(element).dropdownHover(options);
    }
};


ko.bindingHandlers.bPopover = {
    $allPopovers: [],
    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var that = $(element);
        var options = ko.utils.unwrapObservable(valueAccessor());

        var defaultOptions = {
            placement: 'left',
            trigger: 'click',
            container: 'body',
            hideOthers: true,
            hideOnOutsideClick: false,
        };
        options = $.extend(true, {}, defaultOptions, options);
        var prefix = ko.bindingHandlers.bPopover._prefix;

        var value = ko.bindingHandlers.bPopover._values[prefix];
        if (!value) {
            value = 0;
        }

        options._containerID = prefix + "-" + value;
        options.html = true;


        ko.bindingHandlers.bPopover._values[prefix] = ++value;

        options._oldContent = options.content;
        options.content = function () {
            var htmlContent = (typeof options._oldContent == 'function' ? options._oldContent.call(element) : options._oldContent) || that.attr('data-content');

            if (options.htmlContentID) {
                htmlContent = $("#" + options.htmlContentID).html();
            }

            if (htmlContent) {
                return "<div id='" + options._containerID + "'>" + htmlContent + "</div>";
            }
        };

        if (options.offsetX || options.offsetY || options.class || options.width || options.autoSize) {
            var placement = options.placement;
            options.placement = function (tip, triggerElement) {
                _.delay(function () {

                    if (options.offsetX) {
                        //console.dir($(tip).position().left + options.offsetX);
                        $(tip).css('left', $(tip).position().left + options.offsetX);
                    }

                    if (options.offsetY) {
                        $(tip).css('top', $(tip).position().left + options.offsetY);
                    }

                    if (options.class) {
                        $(tip).addClass(options.class);
                    }

                    if (options.width) {
                        $(tip).width(options.width).css('max-width', options.width);
                    }

                    /*                       if (options.autoSize) {
                                               $(tip).width($('#' + options._containerID).width());
                                           }*/

                }, 20);

                return placement;
            };
        }

        that.popover(options);
        var childBindingContext = bindingContext.createChildContext(viewModel);

        if (_.indexOf(ko.bindingHandlers.bPopover.$allPopovers, that) == -1) {
            ko.bindingHandlers.bPopover.$allPopovers.push(that);
        }

        that.on('show.bs.popover', function (e) {
            if (options.hideOthers) {
                _.each(ko.bindingHandlers.bPopover.$allPopovers, function (item) {
                    item.not(that).popover('hide');
                })
            }

            if (options.onShow) {
                options.onShow.call(childBindingContext.$root, childBindingContext.$data, childBindingContext.$index)
            }
        });

        that.on('hide.bs.popover', function (e) {
            if (that.data('ko-popover-shown') == true) {
                that.data('ko-popover-shown', false);
                if (options.onHide) {
                    options.onHide.call(childBindingContext.$root, childBindingContext.$data, childBindingContext.$index)
                }
            }
        });


        $('body').on('click', function (e) {
            if (options.hideOnOutsideClick) {
                _.each(ko.bindingHandlers.bPopover.$allPopovers, function (item) {
                    //the 'is' for buttons that trigger popups
                    //the 'has' for icons within a button that triggers a popup

                    if (!item.is(e.target) && item.has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
                        item.popover('hide');
                    }
                });
            }
        });

        that.on('shown.bs.popover', function (e) {
            var thePopover = document.getElementById(options._containerID);
            if (thePopover) {
                // create correct binding context

                if ($(thePopover).is(':visible')) {
                    ko.applyBindingsToDescendants(childBindingContext, thePopover);

                    that.data('ko-popover-shown', true);
                }
            }
        });

        $(document).on('click', '#' + options._containerID + ' [data-dismiss="popover"]', function (e) {
            if (that.data('ko-popover-shown') == true) {
                that.data('ko-popover-shown', false);
                if (options.onHide) {
                    options.onHide.call(childBindingContext.$root, childBindingContext.$data, childBindingContext.$index)
                }
            }
            that.popover('hide');
            e.preventDefault();
        });

        ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
            that.popover('hide');
            var dataPopover = that.data('bs.popover');

            if (dataPopover) {
                $(dataPopover.$tip).remove();
            }
            that.popover('destroy');
            ko.bindingHandlers.bPopover.$allPopovers = _.without(ko.bindingHandlers.bPopover.$allPopovers, that);
        });
    },
    _values: [],
    _prefix: "ko-popover"

};


ko.bindingHandlers.bTooltip = {
    init: function (element, valueAccessor, allBindings, viewModel) {
        if (!allBindings['has']('options') && !allBindings['has']('value')) {
            var options = valueAccessor();
            var that = $(element);
            var defaultOptions = {
                placement: 'right',
                trigger: 'hover'
            };
            options = ko.utils.extend(defaultOptions, options);
            if (options.offsetX || options.offsetY || options.class || options.width || options.autoSize) {
                var placement = options.placement;
                options.placement = function (tip, triggerElement) {
                    _.delay(function () {
                        if (options.offsetX) {
                            $(tip).css('left', $(tip).position().left + options.offsetX);
                        }
                        if (options.offsetY) {
                            $(tip).css('top', $(tip).position().left + options.offsetY);
                        }
                        if (options.class) {
                            $(tip).addClass(options.class);
                        }
                        if (options.width) {
                            $(tip).find('.tooltip-inner').css('max-width', options.width).width(options.width);
                        }

                        if (options.autoSize) {
                            $(tip).find('.tooltip-inner').css('max-width', '').width('auto');
                        }
                    }, 1);
                    return placement;
                };
            }
            that.tooltip(options);

            ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                that.tooltip('destroy');
            });
        }
    }
};


/*bootstrap buttons radio*/
ko.bindingHandlers.buttonsradio = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        if (typeof valueAccessor != "function") {
            throw new Error("The value for a buttonsradio binding must be a function");
        }

        var that = $(element);
        var wrap = valueAccessor();
        that.addClass('btn-group').attr('data-toggle', 'buttons-radio').empty();
        var options = ko.utils.unwrapObservable(wrap.options);
        var optionText = ko.utils.unwrapObservable(wrap.optionsText);
        var optionValue = ko.utils.unwrapObservable(wrap.optionsValue);
        var cssClass = ko.utils.unwrapObservable(wrap.css);
        var optionsWidth = ko.utils.unwrapObservable(wrap.optionsWidth);
        var valueSetter = wrap.value;
        if (!ko.isObservable(valueSetter)) {
            throw new Error("The value property for a buttonsradio binding must be a observable");
        }

        valueSetter.extend({
            DOMElement: element
        });


        var minWidth = 0;
        _.each(options, function (item) {
            var button = $('<button class="btn" type="button"></button>').appendTo(that);
            var text = optionText ? item[optionText] : item;
            var value = optionValue ? item[optionValue] : item;
            button.data('value', item).text(text);

            if (cssClass) {
                button.addClass(cssClass);
            }

            if (optionsWidth) {
                var width = button.width();

                if (minWidth < width) {
                    minWidth = width;
                }


            }

            ko.utils.registerEventHandler(button, "click", function (event) {
                event.preventDefault();

                valueSetter(value);


            });
        });

        if (optionsWidth) {
            that.find('button').width(minWidth);
        }

        that.button();

    },

    update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        if (typeof valueAccessor != "function") {
            throw new Error("The value for a buttonsradio binding must be a function");
        }

        var that = $(element);
        var wrap = valueAccessor();
        var optionValue = ko.utils.unwrapObservable(wrap.optionsValue);

        var valueSetter = wrap.value;
        if (!ko.isObservable(valueSetter)) {
            throw new Error("The value property for a buttonsradio binding must be a observable");
        }

        var tooltipOptions = ko.utils.unwrapObservable(allBindingsAccessor['get']('bTooltip'));
        if (!tooltipOptions) {
            tooltipOptions = {
                placement: 'right',
                trigger: 'manual',
                animation: false
            };
        }

        var currentVal = valueSetter();

        if (!_.isNullOrUndefined(currentVal)) {
            that.find('button').each(function () {
                var button = $(this).removeClass('active');
                var item = button.data('value');
                var value = optionValue ? item[optionValue] : item;

                if (currentVal == value) {
                    button.addClass('active');
                }
            });
        }

        if (ko.utils.isValidatable(valueSetter) && valueSetter.DOMElement) {
            var valid = valueSetter.isValid();
            if (valid) {
                $(valueSetter.DOMElement).removeClass('validation-error');

                if ($(valueSetter.DOMElement).attr('data-original-title') != undefined) {
                    $(valueSetter.DOMElement).attr('data-original-title', '').tooltip('fixTitle').tooltip('hide');

                } else {
                    ko.bindingHandlers._errorTooltip.init($(valueSetter.DOMElement).get(0), function () { return tooltipOptions; }, allBindingsAccessor, viewModel, bindingContext);
                }
            }
        }
    }
};

function detectIE() {
    var ua = window.navigator.userAgent;
    if (ua.indexOf('MSIE') > 0 ||
        ua.indexOf('Trident/') > 0 ||
        ua.indexOf('Edge') > 0) {
        return true;
    }

    // other browser
    return false;
}

ko.bindingHandlers.datePicker = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var options = valueAccessor();
        var valueObservable = options.on;
        var isUtc = ko.utils.unwrapObservable(allBindingsAccessor['get']('isUtc')) || false;
        var that;
        var defaultOptions = {
            //dateFormat: "mm/dd/yy",

        };

        options = $.extend(true, {}, defaultOptions, _.omit(options, 'on'));

        var dateFormat = ko.utils.unwrapObservable(allBindingsAccessor['get']('dateFormat')) || "MM/DD/YYYY";
        options.fixFocusIE = false;

        var _beforeShow = options.beforeShow;

        options.beforeShow = function (input, instance) {

            if (_beforeShow) {
                _beforeShow(input, instance);
            }

            instance.dpDiv.css({
                marginTop: (element.offsetHeight) + 'px',
            });
            var result = detectIE() ? !options.fixFocusIE : true;
            options.fixFocusIE = false;
            return result;
        };

        var _onClose = options.onClose;
        options.onClose = function (input, instance) {

            if (_onClose) {
                _onClose(input, instance);
            }
            options.fixFocusIE = true;
        };


        if (ko.utils.tagNameLower(element) === "input") {
            that = $(element);
        } else {
            that = $(element).before('<input type="hidden" />').prev('input[type="hidden"]');
            var origbeforeShow = options.beforeShow;
            options.beforeShow = function (textbox, instance) {
                instance.dpDiv.css({
                    marginTop: (element.offsetHeight) + 'px',
                    //marginLeft: (element.offsetWidth) + 'px'
                });

                if (typeof origbeforeShow === 'function') {
                    origbeforeShow.apply(this, Array.prototype.slice.call(arguments));
                }
            }
            ko.utils.registerEventHandler(element, 'click', function () {
                $(that).datepicker('show');
            });
        }

        // trigger validation system
        var tooltipOptions = ko.utils.unwrapObservable(allBindingsAccessor['get']('bTooltip'));

        if (ko.utils.isValidatable(valueObservable) && !valueObservable.DOMElement) {
            valueObservable.extend({
                DOMElement: element
            });

            if (!tooltipOptions) {
                tooltipOptions = {
                    placement: 'right',
                    trigger: 'manual',
                    animation: false
                };
            }

            if (that.is("input") || that.is("textarea")) {
                if (typeof (Placeholders) !== 'undefined') {
                    if (!Placeholders.nativeSupport) {
                        Placeholders.enable(element);

                        ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                            Placeholders.disable(element);
                        });

                    }
                }
            }


            ko.bindingHandlers._errorTooltip.init(element, function () { return tooltipOptions; }, ko.bindingHandlers.value.makeAllBindingsAccessor(allBindingsAccessor), viewModel, bindingContext);
        }

        // update validation
        function updateValidation() {
            if (that.is("input") || that.is("textarea")) {
                if (typeof (Placeholders) !== 'undefined') {
                    if (!Placeholders.nativeSupport) {
                        Placeholders.disable(element);
                        Placeholders.enable(element);
                    }
                }
            }

            if (ko.utils.isValidatable(valueObservable) && valueObservable.DOMElement) {
                var valid = valueObservable.isValid();
                if (valid) {
                    $(valueObservable.DOMElement).removeClass('validation-error');

                    if ($(valueObservable.DOMElement).attr('data-original-title') != undefined) {
                        $(valueObservable.DOMElement).attr('data-original-title', '').tooltip('fixTitle').tooltip('hide');

                    } else {
                        ko.bindingHandlers._errorTooltip.init(element, function () { return tooltipOptions; }, ko.bindingHandlers.value.makeAllBindingsAccessor(allBindingsAccessor), viewModel, bindingContext);
                    }
                }
            }
        }


        // allow inner elements' bindings to finish before initializing the widget
        //ko.applyBindingsToDescendants(bindingContext, element);

        that.datepicker(options);

        if (ko.isObservable(valueObservable)) {
            var value = ko.unwrap(valueObservable);

            if (value) {
                var d = Framework.Utility.Date.formatDate(value, dateFormat, isUtc);

                that.datepicker('setDate', d);
                updateValidation();
               
                if (d !== value) {
                    valueObservable(d);
                }

                that.blur(function () {
                    options.fixFocusIE = false;
                });
            }

            var subscription = valueObservable.subscribe(function (newValue) {
                if (newValue) {
                    that.datepicker('setDate', Framework.Utility.Date.formatDate(newValue, dateFormat, isUtc));
                } else {
                    that.datepicker('setDate', '');
                }
                updateValidation();
                that.blur(function () {
                    options.fixFocusIE = false;
                });
            });

            ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                subscription.dispose();
            });
        }

        if (ko.isWriteableObservable(valueObservable)) {
            var origOnSelect = that.datepicker('option', 'onSelect');
            that.datepicker('option', 'onSelect', function (selectedText) {
                //var format = that.datepicker('option', 'dateFormat');
                //var date = $.datepicker.parseDate(format, selectedText);
                valueObservable(selectedText);
                updateValidation();

                if (typeof origOnSelect === 'function') {
                    origOnSelect.apply(this, Array.prototype.slice.call(arguments));
                }
                that.blur(function () {
                    options.fixFocusIE = false;
                });
            });
        }

        // handle disposal
        ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
            that.datepicker('destroy');
        });
        // the inner elements have already been taken care of
        //return { controlsDescendantBindings: true };
    }
};

/* Date Text Binding*/
ko.bindingHandlers.dateText = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        ko.bindingHandlers.dateText.update(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext);
    },
    update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var value = valueAccessor();
        var dateFormat = ko.utils.unwrapObservable(allBindingsAccessor['get']('dateFormat')) || "M/D/YYYY h:mm a";
        var isUtc = ko.utils.unwrapObservable(allBindingsAccessor['get']('isUtc'));

        if (_.isNullOrUndefined(isUtc)) {
            isUtc = true;
        }

        var strDate = ko.utils.unwrapObservable(value);
        $(element).text(Framework.Utility.Date.formatDate(strDate, dateFormat, isUtc));
    }
};

ko.bindingHandlers.datetimepicker = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var obsv = valueAccessor();
        //initialize datepicker with some optional options
        var options = ko.utils.unwrapObservable(allBindingsAccessor['get']('datetimepickerOptions')) || {};
        var tooltipOptions = ko.utils.unwrapObservable(allBindingsAccessor['get']('bTooltip'));
        $(element).datetimepicker(options);

        if (ko.utils.isValidatable(obsv) && !obsv.DOMElement) {
            obsv.extend({
                DOMElement: element
            });

            if (!tooltipOptions) {
                tooltipOptions = {
                    placement: 'right',
                    trigger: 'manual',
                    animation: false
                };
            }


            ko.bindingHandlers._errorTooltip.init(element, function () { return tooltipOptions; }, ko.bindingHandlers.value.makeAllBindingsAccessor(allBindingsAccessor), viewModel, bindingContext);
        }

        //handle the field changing
        ko.utils.registerEventHandler(element, "change", function () {
            obsv($(element).datetimepicker("getDate"));
        });

        //handle disposal (if KO removes by the template binding)
        ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
            $(element).datetimepicker("destroy");
        });

    },
    update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var obsv = valueAccessor();
        var value = ko.utils.unwrapObservable(obsv),
            current = $(element).datetimepicker("getDate");
        var tooltipOptions = ko.utils.unwrapObservable(allBindingsAccessor['get']('bTooltip'));
        if (!tooltipOptions) {
            tooltipOptions = {
                placement: 'right',
                trigger: 'manual',
                animation: false
            };
        }

        if (value) {
            $(element).datetimepicker("setDate", value);
        }

        if (ko.utils.isValidatable(obsv) && obsv.DOMElement) {
            var valid = obsv.isValid();
            if (valid) {
                $(obsv.DOMElement).removeClass('validation-error');

                if ($(obsv.DOMElement).attr('data-original-title') != undefined) {
                    $(obsv.DOMElement).attr('data-original-title', '').tooltip('fixTitle').tooltip('hide');

                } else {
                    ko.bindingHandlers._errorTooltip.init($(obsv.DOMElement).get(0), function () { return tooltipOptions; }, ko.bindingHandlers.value.makeAllBindingsAccessor(allBindingsAccessor), viewModel, bindingContext);
                }
            }
        }
    }
};

ko.bindingHandlers.dateValue = {
    makeDateValueAccessor: function (valueAccessor, dateFormat, isUtc) {

        var interceptor = ko.computed({
            read: function () {
                var value = valueAccessor();
                var strDate = ko.utils.unwrapObservable(value);
                return Framework.Utility.Date.formatDate(strDate, dateFormat, isUtc);
            },

            write: function (newValue) {
                valueAccessor(newValue);
            }
        });


        return function () {
            return interceptor;
        };
    },
    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var dateFormat = ko.utils.unwrapObservable(allBindingsAccessor['get']('dateFormat')) || "M/D/YYYY h:mm a";
        var isUtc = ko.utils.unwrapObservable(allBindingsAccessor['get']('isUtc')) || true;

        return ko.bindingHandlers.value.init(element, ko.bindingHandlers.dateValue.makeDateValueAccessor(valueAccessor, dateFormat, isUtc), allBindingsAccessor, viewModel, bindingContext);
    },
    update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var dateFormat = ko.utils.unwrapObservable(allBindingsAccessor['get']('dateFormat')) || "M/D/YYYY h:mm a";
        var isUtc = ko.utils.unwrapObservable(allBindingsAccessor['get']('isUtc')) || true;
        return ko.bindingHandlers.value.update(element, ko.bindingHandlers.dateValue.makeDateValueAccessor(valueAccessor, dateFormat, isUtc), allBindingsAccessor, viewModel, bindingContext);
    }
};

/* DurationText Binding */
ko.bindingHandlers.durationText = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        ko.bindingHandlers.durationText.update(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext);
    },
    update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var value = valueAccessor();
        var isUtc = ko.utils.unwrapObservable(allBindingsAccessor['get']('isUtc')) || true;
        var withoutSuffix = ko.utils.unwrapObservable(allBindingsAccessor['get']('withoutSuffix')) || false;
        var strDate = ko.utils.unwrapObservable(value);
        $(element).text(Framework.Utility.Date.formatDuration(strDate, isUtc, withoutSuffix));
    }
};

ko.bindingHandlers.humanizeText = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        ko.bindingHandlers.durationText.update(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext);
    },
    update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var value = valueAccessor();
        var isUtc = ko.utils.unwrapObservable(allBindingsAccessor['get']('isUtc')) || true;
        var withoutSuffix = ko.utils.unwrapObservable(allBindingsAccessor['get']('withoutSuffix')) || false;
        var strDate = ko.utils.unwrapObservable(value);
        $(element).text(Framework.Utility.Date.humanize(strDate, isUtc, withoutSuffix));
    }
};

ko.bindingHandlers.timePicker = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        var that = $(element);
        var options = valueAccessor();
        var valueObsv = allBindingsAccessor['get']('value');

        var relatedTimePicker = options.relatedTimePicker;


        var defaultOptions = {
            disableTextInput: true,
            step: 30,
            minTime: '12:00am',
            timeFormat: 'g:i A'
        };
        options = $.extend(true, {}, defaultOptions, options);

        that.timepicker(options).on('changeTime', function () {
            if (ko.isObservable(valueObsv)) {
                valueObsv($(this).val());
            }
        });

        ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
            that.timepicker('remove');
        });

        if (ko.isObservable(valueObsv)) {
            valueObsv.subscribe(function (newValue) {

                if (newValue) {
                    _.delay(function () {
                        that.timepicker('setTime', newValue);
                    }, 2);

                }
            });
        }

        if (relatedTimePicker) {
            var selector = ko.utils.unwrapObservable(relatedTimePicker).toString();

            if (selector.indexOf('.') == -1) {
                if (selector.indexOf('#') == -1) {
                    selector = "#" + selector;
                }
            }

            $(selector).on('changeTime', function () {
                that.timepicker('setTime', '');
                that.timepicker('option', { disableTimeRanges: [[options.minTime, $(this).val()]] });
            });
        }
    }
};


ko.bindingHandlers.delayedClickEvent = {
    makeAllBindingsAccessor: function (allBindingsAccessor) {

        var unwrappedValue = allBindingsAccessor();

        var newAllBindings = function () {

            newAllBindings = ko.utils.extend(unwrappedValue, { clickBubble: false });

            // for backwards compatibility w/ knockout  < 3.0
            return unwrappedValue;
        };

        newAllBindings.get = function (a) {
            if (a === 'clickBubble') {
                return false;
            }

            return allBindingsAccessor.get(a);
        };

        newAllBindings.has = function (a) {
            if (a === 'clickBubble') {
                return true;
            }
            return allBindingsAccessor.has(a);
        };

        return newAllBindings;

    },

    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var delay = allBindingsAccessor['get']('delay') || 500;

        //wrap the handler with a check for the enter key
        var wrappedHandler = function () {
            _.delay(function () {
                valueAccessor().apply(this, arguments);
            }, delay, this);
            return false;
        };

        //call the real event binding for 'keyup' with our wrapped handler
        ko.bindingHandlers.event.init(element, function () { return { click: wrappedHandler }; }, ko.bindingHandlers.delayedClickEvent.makeAllBindingsAccessor(allBindingsAccessor), viewModel, bindingContext);

    }
};


ko.bindingHandlers.delayedKeyUpEvent = {
    makeAllBindingsAccessor: function (allBindingsAccessor) {
        var unwrappedValue = allBindingsAccessor();

        var newAllBindings = function () {

            newAllBindings = ko.utils.extend(unwrappedValue, { clickBubble: false });

            // for backwards compatibility w/ knockout  < 3.0
            return unwrappedValue;
        };

        newAllBindings.get = function (a) {
            if (a === 'keyupBubble') {
                return false;
            }

            return allBindingsAccessor.get(a);
        };

        newAllBindings.has = function (a) {
            if (a === 'keyupBubble') {
                return true;
            }
            return allBindingsAccessor.has(a);
        };

        return newAllBindings;
    },
    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var delay = allBindingsAccessor['get']('delay') || 500;

        //wrap the handler with a check for the enter key
        var wrappedHandler = function () {
            _.delay(function () {
                valueAccessor().apply(this, arguments);
            }, delay, this);
            return false;
        };

        //call the real event binding for 'keyup' with our wrapped handler
        ko.bindingHandlers.event.init(element, function () { return { keyup: wrappedHandler }; }, ko.bindingHandlers.delayedKeyUpEvent.makeAllBindingsAccessor(allBindingsAccessor), viewModel, bindingContext);

    }
};


//delegated Events
ko.actions = {};

var delegatedEventPrefix = "ko_delegated_";
var createDelegatedHandler = function (eventName, root) {
    return function (event) {
        var data,
            method,
            action,
            owner,
            matchingParent,
            command,
            result,
            el = event.target || event.srcElement,
            context = ko.contextFor(el),
            attr = "data-" + eventName,
            key = delegatedEventPrefix + eventName;

        if (context) {
            //loop until we either find an action, run out of elements, or hit the root element that has our delegated handler
            while (!method && el) {
                method = el.getAttribute(attr) || ko.utils.domData.get(el, key);
                if (!method) {
                    el = el !== root ? el.parentNode : null;
                }
            }

            if (method) {
                //get context of the element that actually held the action
                context = ko.contextFor(el);

                if (context) {
                    data = context.$data;

                    if (typeof method === "string") {
                        //check defined actions
                        if (method in actions) {
                            command = actions[method];
                            if (command) {
                                action = typeof command === "function" ? command : command.action;
                                owner = command.owner || data;
                            }
                        }
                            //search for the action
                        else if (data && data[method] && typeof data[method] === "function") {
                            action = data[method];
                            owner = data;
                        }

                        //search parents for the action
                        if (!action) {
                            matchingParent = ko.utils.arrayFirst(context.$parents, function (parent) {
                                return parent[method] && typeof parent[method] === "function";
                            });

                            action = matchingParent && matchingParent[method];
                            owner = matchingParent;
                        }
                    }
                        //a binding handler was used to associate the element with a function
                    else if (typeof method === "function") {
                        action = method;
                        owner = data;
                    }
                }

                //execute the action as KO normally would
                if (action) {
                    result = action.call(owner, data, event);

                    //prevent default action, if handler returns true
                    if (result !== true) {
                        event.preventDefault();
                    }
                }
            }
        }
    };
};

//create a binding for an event to associate a function with the element
var createDelegatedBinding = function (event) {
    var bindingName;
    if (event) {
        //capitalize first letter
        bindingName = "delegated" + event.substr(0, 1).toUpperCase() + event.slice(1);
    }

    //create the binding, if it does not exist
    if (!ko.bindingHandlers[bindingName]) {
        ko.bindingHandlers[bindingName] = {
            init: function (element, valueAccessor) {
                var action = valueAccessor();
                ko.utils.domData.set(element, delegatedEventPrefix + event, action);
            }
        };
    }
};

//add a handler on a parent element that responds to events from the children
ko.bindingHandlers.delegatedHandler = {
    init: function (element, valueAccessor) {
        var events = ko.utils.unwrapObservable(valueAccessor()) || [];

        if (typeof events === "string") {
            events = [events];
        }

        ko.utils.arrayForEach(events, function (event) {
            createDelegatedBinding(event);
            ko.utils.registerEventHandler(element, event, createDelegatedHandler(event, element));
        });
    }
};


ko.bindingHandlers.enumText = {
    'update': function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        // First get the latest data that we're bound to
        var value = valueAccessor();
        // Next, whether or not the supplied model property is observable, get its current value
        var valueUnwrapped = ko.utils.unwrapObservable(value);
        var $enumValue = ko.utils.unwrapObservable(valueUnwrapped.text);
        var $enum = ko.utils.unwrapObservable(valueUnwrapped.$enum);
        if (!_.isNullOrEmpty($enumValue)) {
            var $selectedEnum = _.find($enum, function (value) {
                return value.Value == $enumValue;
            });
            if (!_.isNullOrUndefined($selectedEnum)) {
                ko.utils.setTextContent(element, $selectedEnum.Text);
            }
        }
    }
};


/* FancyBox */
ko.bindingHandlers.fancybox = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        var $element = $(element);
        var options = valueAccessor() || {

        };
        options.live = false;
        ($element).fancybox(options);
    }
};


ko.bindingHandlers.focusToggle = {
    init: function (element, valueAccessor) {
        var value = valueAccessor();

        if (!ko.isObservable(value)) {
            throw new Error("The value property for a hoverToggle binding must be a observable");
        }

        ko.utils.registerEventHandler(element, "focus", function () {
            var that = $(element);

            that.data('focus', true);
            value(true);
        });

        ko.utils.registerEventHandler(element, "blur", function () {
            var that = $(element);

            that.data('focus', false);
            _.delay(function () {
                if (that.data('focus') === false) {
                    value(false);
                }

            }, 1000, this);
        });
    }
};


ko.bindingHandlers.focusToggleClass = {
    init: function (element, valueAccessor) {
        var css = valueAccessor();

        ko.utils.registerEventHandler(element, "focus", function () {
            var that = $(element);

            that.data('focus', true);
            ko.utils.toggleDomNodeCssClass(element, ko.utils.unwrapObservable(css), true);
        });

        ko.utils.registerEventHandler(element, "blur", function () {
            var that = $(element);

            that.data('focus', false);
            _.delay(function () {
                if (that.data('focus') === false) {
                    ko.utils.toggleDomNodeCssClass(element, ko.utils.unwrapObservable(css), false);
                }

            }, 1000, this);
        });
    }
};


var origforeach = ko.bindingHandlers.foreach;

/*nice scroll*/
ko.bindingHandlers.foreachWithScroll = {
    makeValueAccessor: function (element, valueAccessor, options) {
        var that = $(element);
        var height = that.data('nsb-height');
        var unwrappedValue = valueAccessor();

        if (ko.isObservable(unwrappedValue)) {
            unwrappedValue.subscribe(function (newValue) {

                if (newValue) {
                    updateNiceScrollBar();
                }
            });
            unwrappedValue = { 'data': unwrappedValue };
        } else if (_.isFunction(unwrappedValue)) {
            unwrappedValue = unwrappedValue();
        }

        if (options.animate) {

            unwrappedValue._afterAdd = unwrappedValue.afterAdd;

            unwrappedValue.afterAdd = function (elem) {
                if (elem.nodeType === 1) $(elem).hide().slideDown();
                if (unwrappedValue._afterAdd) {
                    unwrappedValue._afterAdd.apply(this, arguments);
                }
            };
        }

        function updateNiceScrollBar() {
            _.delay(function () {
                var totalHeight = 0;
                that.children().each(function () {
                    totalHeight += $(this).outerHeight(true); // true = include margins
                });


                if (totalHeight > 0 && totalHeight < height) {
                    that.css('height', 'auto');
                } else {
                    that.height(height);
                }

                that.getNiceScroll().resize();

            }, 100);
        }

        if (options.nsb) {

            unwrappedValue._oldAfterRender = unwrappedValue.afterRender;
            unwrappedValue.afterRender = function () {
                if (unwrappedValue._oldAfterRender) {
                    unwrappedValue._oldAfterRender.apply(this, arguments);
                }

                //updateNiceScrollBar();
            };
        }

        return function () {
            return unwrappedValue;
        };
    },
    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var that = $(element);
        var defaults = {
            cursorcolor: "#858585",
            cursorborder: "1px solid #e8e8e8",
        };
        var niceScrollOptions = allBindingsAccessor['get']('niceScroll');
        var config = {
            nsb: false,
            animate: false
        };
        if (niceScrollOptions) {
            config.nsb = true;
            var minHeight = 'auto';
            var height = 400;

            var options = {};

            if (typeof niceScrollOptions == "object") {
                options = niceScrollOptions;

            }
            options = $.extend({}, defaults, options);

            if (options.height) {
                height = options.height;
                minHeight = options.minHeight;
            }

            that.data('nsb-height', height);
            that.css({ 'overflow': 'hidden', 'position': 'relative', 'minHeight': minHeight });

            that.niceScroll(options);

            ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                that.getNiceScroll().remove();
            });
        }

        return ko.bindingHandlers.template.init(element, ko.bindingHandlers.foreach.makeTemplateValueAccessor(ko.bindingHandlers.foreachWithScroll.makeValueAccessor(element, valueAccessor, config)), allBindingsAccessor, viewModel, bindingContext);
    },

    update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var niceScrollOptions = allBindingsAccessor['get']('niceScroll');
        var config = {
            nsb: false,
            animate: false
        };
        if (niceScrollOptions) {
            config.nsb = true;

        }
        return ko.bindingHandlers.template.update(element, ko.bindingHandlers.foreach.makeTemplateValueAccessor(ko.bindingHandlers.foreachWithScroll.makeValueAccessor(element, valueAccessor, config)), allBindingsAccessor, viewModel, bindingContext);
    }
};

ko.bindingHandlers.foreach = {
    makeTemplateValueAccessor: origforeach.makeTemplateValueAccessor,
    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        if (allBindingsAccessor['get']('niceScroll')) {
            return ko.bindingHandlers.foreachWithScroll.init(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext);
        } else {
            return origforeach.init(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext);
        }

    },

    update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        if (allBindingsAccessor['get']('niceScroll')) {
            return ko.bindingHandlers.foreachWithScroll.update(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext);
        } else {
            return origforeach.update(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext);
        }
    }
};


ko.bindingHandlers.highCharts = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        var options = valueAccessor();
        var defaultOptions = {
            credits: {
                enabled: false
            },
            loading: {
                labelStyle: {
                    top: '45%'
                }
            },
        };
        options = $.extend(true, {

        }, defaultOptions, options);

        $(element).highcharts(options);

        if (viewModel.XAxisCategories) {
            if (ko.isObservable(viewModel.XAxisCategories)) {
                viewModel.XAxisCategories.subscribe(function (newValue) {
                    _.delay(function () {
                        var chart = $(element).highcharts();
                        chart.xAxis[0].setCategories(newValue, true);
                    }, 2);
                });
            }
        }

        /*console.dir(viewModel);*/

        if (viewModel.Series) {
            if (ko.isObservable(viewModel.Series)) {
                viewModel.Series.subscribe(function (newValue) {
                    var chart = $(element).highcharts();
                    if (newValue && _.isArray(newValue) && newValue.length > 0) {
                        chart.showLoading();

                        /*   while (chart.series.length > 0)
                               chart.series[0].remove(false);*/
                        var length = chart.series.length - 1;
                        var currentIndex;
                        _.each(newValue, function (series, index) {
                            var currentSeries = chart.series[index];
                            if (currentSeries) {
                                currentSeries.update({
                                    name: series.Name(),
                                    showInLegend: series.ShowInLegend(),
                                    color: series.Color(),
                                    data: series.Data()
                                }, false);
                            } else {
                                chart.addSeries({
                                    name: series.Name(),
                                    showInLegend: series.ShowInLegend(),
                                    color: series.Color(),
                                    data: series.Data()
                                }, false);
                            }

                            currentIndex = index;
                        });

                        while (length > currentIndex)
                            chart.series[currentIndex++].remove(false);

                        chart.redraw();
                        chart.hideLoading();
                    } else {
                        while (chart.series.length > 0)
                            chart.series[0].remove(false);

                        chart.redraw();

                    }
                });
            }
        }

        if (viewModel.loading) {
            if (ko.isObservable(viewModel.loading)) {
                viewModel.loading.subscribe(function (newValue) {
                    _.delay(function () {
                        var chart = $(element).highcharts();
                        if (newValue) {
                            chart.showLoading();
                        } else {
                            chart.hideLoading();
                        }
                    }, 1);

                });
            }
        }
    }
};


ko.bindingHandlers.ckEditor = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        if (ko.utils.tagNameLower(element) === "textarea") {
            var that = $(element);

            var id = that.attr('id') || _.uniqueId('ckEditor-');
            that.attr('id', id);

            var options = valueAccessor();
            var valueObservable = options.on;

            var defaultOptions = {
                toolbar_Full: [
                    ['Source', '-', 'Format', 'Font', 'FontSize', 'TextColor', 'BGColor', '-', 'Bold', 'Italic', 'Underline', 'SpellChecker'],
                    ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl'],
                    ['Link', 'Unlink', 'Image', 'Table']
                ]
            };
            options = $.extend(true, {}, defaultOptions, _.omit(options, 'on'));
        }

        // allow inner elements' bindings to finish before initializing the widget
        ko.applyBindingsToDescendants(bindingContext, element);

        CKEDITOR.replace(id, options);


        if (ko.isObservable(valueObservable)) {
            var editor = CKEDITOR.instances[id];

            var value = ko.unwrap(valueObservable);

            if (!value) {
                value = "";
            }
            that.html(value);
            CKEDITOR.instances[id].setData(value);

            var updating = false;

            var subscription = valueObservable.subscribe(function (newValue) {
                if (newValue) {
                    if (!updating) {
                        that.html(newValue);
                        editor.setData(newValue)
                    }

                }
            });

            ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                subscription.dispose();
            });


            if (editor) {
                var changed = function () {
                    updating = true;
                    that.val(editor.getData());
                    valueObservable(editor.getData());
                    updating = false;
                };
                editor.on('key', changed);
                editor.on('paste', changed);
                editor.on('afterCommandExec', changed);

                editor.on('change', changed);
            }

            // wire up the blur event to ensure our observable is properly updated
            editor.focusManager.blur = function () {
                //valueObservable(that.val());
            };
        }

        ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
            if (CKEDITOR.instances[id]) {
                CKEDITOR.remove(CKEDITOR.instances[id]);
            }
        });

        // the inner elements have already been taken care of
        return { controlsDescendantBindings: true };
    },
    update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        if (ko.utils.tagNameLower(element) === "textarea") {
            var val = ko.utils.unwrapObservable(valueAccessor());
            $(element).val(val);
        }
    }
}

/* holderjs */
ko.bindingHandlers.holderjs = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        var that = $(element);
        var id = that.attr('id') || _.uniqueId('holderjs-');
        that.attr('id', id);
        ko.bindingHandlers.holderjs.update(element, valueAccessor, allBindingsAccessor, viewModel);
    },
    update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var that = $(element);
        var id = that.attr('id');

        var value = valueAccessor();
        var src = '';
        var width = that.width();
        var height = that.height();

        if (value) {
            if (ko.isObservable(value)) {
                src = ko.utils.unwrapObservable(value);
            } else {
                src = ko.utils.unwrapObservable(value.src);
            }
        }

        if (!_.isNullOrEmpty(src) && src.indexOf('holder.js') == -1) {
            that.removeAttr('data-src').attr('src', src);
        } else {
            that.removeAttr('src').attr('data-src', 'holder.js/' + width + "x" + height + '/social');
            Holder.run({
                images: '#' + id
            });
        }

    }
};


ko.bindingHandlers.hoverToggle = {
    init: function (element, valueAccessor) {
        var value = valueAccessor();

        if (!ko.isObservable(value)) {
            throw new Error("The value property for a hoverToggle binding must be a observable");
        }

        ko.utils.registerEventHandler(element, "mouseover", function () {
            var that = $(element);

            value(true);
            that.data('mouseover', true);
        });

        ko.utils.registerEventHandler(element, "mouseout", function () {
            var that = $(element);

            that.data('mouseover', false);
            _.delay(function () {
                if (that.data('mouseover') === false) {
                    value(false);
                }

            }, 1000, this);
        });
    }
};


ko.bindingHandlers.hoverToggleClass = {
    init: function (element, valueAccessor) {
        var css = valueAccessor();

        ko.utils.registerEventHandler(element, "mouseover", function () {
            var that = $(element);

            that.data('mouseover', true);
            ko.utils.toggleDomNodeCssClass(element, ko.utils.unwrapObservable(css), true);
        });

        ko.utils.registerEventHandler(element, "mouseout", function () {
            var that = $(element);

            that.data('mouseover', false);
            _.delay(function () {
                if (that.data('mouseover') === false) {
                    ko.utils.toggleDomNodeCssClass(element, ko.utils.unwrapObservable(css), false);
                }

            }, 1000, this);
        });
    }
};


/*Loading Progress Binding*/
ko.bindingHandlers.loadingWhen = {
    updatePosition: function (element, show) {
        var that = $(element);

        if (show) {
            //that.animate({paddingBottom:"+=100px"});
            $(that.data('ko-spinner')).css({
                position: "absolute",
                width: '40px',
                height: '40px',
                //top: (that.height() - 40) + 'px',
                bottom: '5px',
                left: ((that.width() / 2) - 20) + 'px',
                "z-index": 10000,
            }).fadeIn();
        } else {
            //that.animate({ paddingBottom: "-=100px" });
            $(that.data('ko-spinner')).fadeOut();
        }
    },
    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var id = _.uniqueId('ko-spinner');
        var that = $(element), currentPosition = that.css("position");
        that.data('ko-spinner', "#" + id);
        var $loader = $("<div>").addClass("ko-spinner").attr('id', id);

        //make sure that we can absolutely position the loader against the original element
        if (currentPosition == "auto" || currentPosition == "static") {
            that.css("position", "relative");
        }

        that.css("min-height", '40px');
        //add the loader
        that.append($loader);
        ko.bindingHandlers.loadingWhen.update(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext);
    },
    update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var that = $(element),
            $loader = $(that.data('ko-spinner'));
        var value = valueAccessor();
        var isLoading;
        if (ko.isObservable(value)) {
            isLoading = value();
        } else {
            isLoading = value.on();
        }

        ko.bindingHandlers.loadingWhen.updatePosition(element, isLoading);
    }
};


ko.bindingHandlers.logger = {
    update: function (element, valueAccessor, allBindings) {
        //store a counter with this element
        var count = ko.utils.domData.get(element, "_ko_logger") || 0,
            data = ko.toJS(valueAccessor() || allBindings());

        ko.utils.domData.set(element, "_ko_logger", ++count);

        if (console && console.log) {
            console.log(count, element, data);
        }
    }
};

ko.virtualElements.allowedBindings.logger = true;


ko.bindingHandlers.niceScroll = {
    resizeScroll: function (that) {
        var height = that.data('nsb-height');
        _.delay(function () {
            var totalHeight = 0;
            that.children().each(function () {
                totalHeight += $(this).outerHeight(true); // true = include margins
            });

            if (totalHeight < height) {
                that.css('height', 'auto');
            } else {
                that.height(height);
            }

            that.getNiceScroll().resize();

        }, 100);
    },

    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var containsforeach = allBindingsAccessor['has']('foreach');
        if (!containsforeach) {
            var that = $(element);
            var defaults = {
                cursorcolor: "#858585",
                cursorborder: "1px solid #e8e8e8",
            };

            var niceScrollOptions = valueAccessor();

            var on = niceScrollOptions.on;

            if (on) {
                var minHeight = 'auto';
                var height = 400;

                var options = {};

                if (typeof niceScrollOptions == "object") {
                    options = niceScrollOptions;

                }
                options = $.extend({}, defaults, options);

                if (options.height) {
                    height = options.height;
                    minHeight = options.minHeight;
                }

                that.data('nsb-height', height);
                that.css({ 'overflow': 'hidden', 'position': 'relative', 'minHeight': minHeight });

                that.niceScroll(options);

                ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                    that.getNiceScroll().remove();
                });

                on.subscribe(function (newValue) {
                    if (newValue) {
                        ko.bindingHandlers.niceScroll.resizeScroll(that);
                        _.delay(function () {
                            on(false);
                        }, 250);
                    }
                });
            }


        }
    }
};


/*selectboxit*/
var origOptions = ko.bindingHandlers.options;

ko.bindingHandlers.selectBoxOptions = {
    makeValueAccessor: function (valueAccessor, allBindingsAccessor) {
        var formatter = allBindingsAccessor['get']('formatter');
        var unwrappedValue = valueAccessor();
        /*if (formatter === true && unwrappedValue.formatted) {
            console.dir(unwrappedValue);
            unwrappedValue = unwrappedValue.formatted;
        }*/

        return function () {
            return unwrappedValue;
        };
    },
    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var retValue = origOptions.init(element, ko.bindingHandlers.selectBoxOptions.makeValueAccessor(valueAccessor, allBindingsAccessor), allBindingsAccessor, viewModel, bindingContext);
        var that = $(element);
        var selectBoxItOptions = allBindingsAccessor['get']('selectBoxIt');
        var defaultsScrollOptions = {
            cursorcolor: "#858585",
            cursorborder: "1px solid #e8e8e8",
        };
        var niceScrollOptions = allBindingsAccessor['get']('niceScroll');

        var width = that.width();
        var id = $(element).attr("id");

        if (!id) {
            id = _.uniqueId('selectBoxIt-') + "-";
            that.attr('id', id);
        }
        var tooltipOptions = ko.utils.unwrapObservable(allBindingsAccessor['get']('bTooltip'));
        if (!tooltipOptions) {
            tooltipOptions = {
                placement: 'right',
                trigger: 'manual',
                animation: false
            };
        }
        var options = {
            size: that.data('size') || 7,
            // Uses the jQuery 'fadeIn' effect when opening the drop down
            showEffect: "fadeIn",

            // Sets the jQuery 'fadeIn' effect speed to 400 milleseconds
            showEffectSpeed: 400,

            // Uses the jQuery 'fadeOut' effect when closing the drop down
            hideEffect: "fadeOut",

            // Sets the jQuery 'fadeOut' effect speed to 400 milleseconds
            hideEffectSpeed: 400,

            downArrowIcon: "fa fa-chevron-down",

            downArrowHoverIcon: "fa fa-chevron-up"
        };

        if (typeof selectBoxItOptions == "object") {
            options = _.extend(options, selectBoxItOptions);

        }

        //defaultsScrollOptions = _.extend(defaultsScrollOptions, niceScrollOptions);

        that.attr('data-size', options.size);

        options['theme'] = "bootstrap";
        options['autoWidth'] = true;
        options['copyClasses'] = 'container';
        var caption = ko.utils.unwrapObservable(allBindingsAccessor['get']('optionsCaption'));

        if (!_.isNullOrEmpty(caption)) {
            options['defaultText'] = caption;
            options['showFirstOption'] = false;
        }
        var valueObsv = allBindingsAccessor['get']('value');
        var loaded;


        that.selectBoxIt(options).bind('changed refresh', function () {

            $('#' + id + "SelectBoxItContainer > .selectboxit-options").css({
                //'min-width': width + 2,
                //'overflow': 'hidden'

            }); //.getNiceScroll().resize();


        }).bind('refresh', function () {
            var value = ko.utils.unwrapObservable(valueObsv);
            if (value) {
                that.selectBoxIt('selectOption', value.toString());


            } else {
                that.selectBoxIt('selectOption', value);
            }

            if (ko.utils.isValidatable(valueObsv) && valueObsv.DOMElement) {
                var valid = valueObsv.isValid();
                if (valid) {
                    $(valueObsv.DOMElement).removeClass('validation-error');

                    if ($(valueObsv.DOMElement).attr('data-original-title') != undefined) {
                        $(valueObsv.DOMElement).attr('data-original-title', '').tooltip('fixTitle').tooltip('hide');

                    } else {
                        ko.bindingHandlers._errorTooltip.init($(valueObsv.DOMElement).get(0), function () { return tooltipOptions; }, allBindingsAccessor, viewModel, bindingContext);
                    }
                }
            }

        }).bind('create', function () {
            loaded = true;

            $('#' + id + "SelectBoxItContainer").removeClass('validation-error');
            ko.bindingHandlers._errorTooltip.init($('#' + id + "SelectBoxItContainer").get(0), function () { return tooltipOptions; }, allBindingsAccessor, viewModel, bindingContext);

            $('#' + id + "SelectBoxItContainer > .selectboxit").width(width);
            $('#' + id + "SelectBoxItContainer > .selectboxit > .selectboxit-text").css({
                'max-width': width - $('#' + id + "SelectBoxItContainer > .selectboxit > .selectboxit-arrow-container").width() - 2,
            });

            $('#' + id + "SelectBoxItContainer > .selectboxit-options").css({
                'min-width': width + 2,
                //'overflow': 'hidden'
            });
        }).bind('close', function () {
            $('#' + id + "SelectBoxItContainer .selectboxit-arrow-container .selectboxit-arrow").removeClass(options.downArrowHoverIcon).addClass(options.downArrowIcon);
        }).bind('open', function () {
            $('#' + id + "SelectBoxItContainer .selectboxit-arrow-container .selectboxit-arrow").removeClass(options.downArrowIcon).addClass(options.downArrowHoverIcon);

        });

        if (ko.isObservable(valueObsv)) {
            valueObsv.subscribe(function (newValue) {
                if (newValue) {
                    _.delay(function () {
                        //if ($(that).data("selectBox-selectBoxIt"))

                        //    that.selectBoxIt('refresh');
                    }, 1000);

                }
            });

            valueObsv.extend({
                DOMElement: '#' + id + 'SelectBoxItContainer'
            });
        }

        ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
            that.selectBoxIt('destroy');
        });
        return retValue;
    },

    update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var retValue = origOptions.update(element, ko.bindingHandlers.selectBoxOptions.makeValueAccessor(valueAccessor, allBindingsAccessor), allBindingsAccessor, viewModel, bindingContext);
        var that = $(element);

        var valueObsv = allBindingsAccessor['get']('value');

        if ($(valueObsv.DOMElement).attr('data-original-title') != undefined) {
            $(valueObsv.DOMElement).tooltip('destroy');
        }

        that.selectBoxIt('refresh');

        return retValue;
    }
};


ko.bindingHandlers.multiselect = {};
ko.bindingHandlers.multiselectOptions = {
    'init': function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var that = $(element);
        var multiselectOptions = allBindingsAccessor['get']('multiselect');

        var options = {

        };

        var caption = ko.utils.unwrapObservable(allBindingsAccessor['get']('optionsCaption'));
        var unwrappedValue = allBindingsAccessor();
        var newAllBindingsAccessor = function () {
            return unwrappedValue;
        };

        newAllBindingsAccessor.get = function (a) {
            if (a === 'optionsCaption') {
                return undefined;
            }

            return allBindingsAccessor.get(a);
        };

        newAllBindingsAccessor.has = function (a) {
            if (a === 'optionsCaption') {
                return false;
            }
            return allBindingsAccessor.has(a);
        };


        var retValue = origOptions.init(element, valueAccessor, newAllBindingsAccessor, viewModel, bindingContext);

        if (!_.isNullOrEmpty(caption)) {
        }

        var selectedOptionsObsv = newAllBindingsAccessor['get']('selectedOptions');

        options = _.extend(options, multiselectOptions);

        that.multiselect(options);

        if (selectedOptionsObsv && ko.isObservable(selectedOptionsObsv)) {
            selectedOptionsObsv.subscribe(function () {
                _.delay(function () {
                    var ms = that.data('multiselect');
                    var opt = ko.unwrap(allBindingsAccessor['get']('options'));

                    if (opt && opt.length !== ms.originalOptions.length) {
                        ms.updateOriginalOptions();
                        that.multiselect('rebuild');
                    } else {
                        ms.refresh();
                    }
                }, 2);

                /*console.dir(changes);
                var addedArray = [], deletedArray = [];
                changes.forEach(function (change) {
                    switch (change.status) {
                        case 'added':
                            addedArray.push(change.value);
                            break;
                        case 'deleted':
                            deletedArray.push(change.value);
                            break;
                    }
                });
                if (addedArray.length > 0) {
                    that.multiselect('select', addedArray);
                };
                if (deletedArray.length > 0) {
                    that.multiselect('deselect', deletedArray);
                };*/

                /*    ;
 */
            });
        }

        return retValue;
    },
    update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var retValue = origOptions.update(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext);
        var that = $(element);

        var ms = that.data('multiselect');

        var opt = ko.unwrap(allBindingsAccessor['get']('options'));

        if (opt && opt.length !== ms.originalOptions.length) {
            ms.updateOriginalOptions();
            that.multiselect('rebuild');
        } else {
            ms.refresh();
        }

        return retValue;
    }
};



(function ($, _, ko) {

    ko.bindingHandlers.slick = {
        init: function (element, valueAccessor) {

            var options = valueAccessor() || {
            };

            console.dir(options);

            setTimeout(function () {
                $(element).slick(options);
            }, 100);


            $('window').on('resize.toggle', function () {

            });

            ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                $(element).unslick();
            });
        }
    };

})(jQuery, _, ko);


ko.bindingHandlers.chosenOptions = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var that = $(element);

        var chosenOptions = allBindingsAccessor['get']('chosen');

        var options = {
            display_selected_options: false
        };

        var caption = ko.utils.unwrapObservable(allBindingsAccessor['get']('optionsCaption'));

        var unwrappedValue = allBindingsAccessor();
        var newAllBindingsAccessor = function () {
            return unwrappedValue;
        };

        newAllBindingsAccessor.get = function (a) {
            if (a === 'optionsCaption') {
                return undefined;
            }

            return allBindingsAccessor.get(a);
        };

        newAllBindingsAccessor.has = function (a) {
            if (a === 'optionsCaption') {
                return false;
            }
            return allBindingsAccessor.has(a);
        };

        var retValue = origOptions.init(element, valueAccessor, newAllBindingsAccessor, viewModel, bindingContext);

        if (!_.isNullOrEmpty(caption)) {
            options['placeholder_text_single'] = caption;
            options['placeholder_text_multiple'] = caption;
        }
        options = _.extend(options, chosenOptions);

        var valueObsv = newAllBindingsAccessor['get']('value');

        if (valueObsv && ko.isObservable(valueObsv)) {

            valueObsv.subscribe(function () {
                _.delay(function () {
                    that.trigger('chosen:updated');
                }, 2);
            });
        }

        var selectedOptionsObsv = newAllBindingsAccessor['get']('selectedOptions');

        if (selectedOptionsObsv && ko.isObservable(selectedOptionsObsv)) {

            selectedOptionsObsv.subscribe(function (newValue) {
                _.delay(function () {
                    that.trigger('chosen:updated');
                }, 2);
            });
        }

        that.addClass('chosen-select').chosen(options);

        return retValue;
    },

    update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var retValue = origOptions.update(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext);
        var that = $(element);
        that.trigger("chosen:updated");
        return retValue;
    }
};

ko.bindingHandlers.options = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var optionsMode = allBindingsAccessor['get']('optionsMode') || '';

        switch (optionsMode) {
            case 'selectBoxIt':
                return ko.bindingHandlers.selectBoxOptions.init(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext);

            case 'chosen':
                return ko.bindingHandlers.chosenOptions.init(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext);
            case 'multiselect':
                return ko.bindingHandlers.multiselectOptions.init(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext);

            default:
                var retValue = origOptions.init(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext);

                return retValue;
        }

    },

    update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var optionsMode = allBindingsAccessor['get']('optionsMode') || '';

        switch (optionsMode) {
            case 'selectBoxIt':
                return ko.bindingHandlers.selectBoxOptions.update(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext);
            case 'chosen':
                return ko.bindingHandlers.chosenOptions.update(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext);
            case 'multiselect':
                return ko.bindingHandlers.multiselectOptions.update(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext);

            default:
                var retValue = origOptions.update(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext);

                return retValue;
        }
    }
};


/* jQuery Raty Plugin Binding */
ko.bindingHandlers.raty = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var $element = $(element);
        var value = valueAccessor();
        var valueSetter = value;
        var readOnly = false;
        var score;
        if (ko.isObservable(value)) {
            score = ko.utils.unwrapObservable(value);
        } else {
            score = ko.utils.unwrapObservable(value.score);
            valueSetter = value.score;
            readOnly = ko.utils.unwrapObservable(value.readOnly) || false;
        }

        var options = _.omit(value, ['readOnly', 'score']);

        ko.utils.extend(options, {
            readOnly: readOnly,
            score: score,
            click: function (newScore, evt) {
                valueSetter(newScore);
            }
        });

        ($element).raty(options);
    },
    update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var $element = $(element);
        var value = valueAccessor();
        var readOnly = false;
        var score;
        if (ko.isObservable(value)) {
            score = ko.utils.unwrapObservable(value);
        } else {
            score = ko.utils.unwrapObservable(value.score);
            readOnly = ko.utils.unwrapObservable(value.readOnly) || false;
        }
        ($element).raty('set', {
            readOnly: readOnly,
            score: score
        });
    }
};


/* returnKey */
ko.bindingHandlers.returnKey = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        //wrap the handler with a check for the enter key
        var wrappedHandler = function (viewModel, event) {
            var keyCode = event.which || event.keyCode;
            if (keyCode === 13) {
                if (event.which === 13) {
                    valueAccessor().apply(this, arguments);

                    return false;
                }
            }

            return true;
        };

        //call the real event binding for 'keyup' with our wrapped handler
        ko.bindingHandlers.event.init(element, function () { return { keydown: wrappedHandler }; }, ko.bindingHandlers.delayedKeyUpEvent.makeAllBindingsAccessor(allBindingsAccessor), viewModel, bindingContext);

    }
};

ko.bindingHandlers.stickyTable = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        function createStickyTable() {
            if ($(this).find('thead').length > 0 && $(this).find('th').length > 0) {
                // Clone <thead>
                var $w = $(window),
                    $t = $(this),
                    $thead = $t.find('thead').clone(),
                    $col = $t.find('thead, tbody').clone(),
                    $class = $t.attr('class');
                ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                    ko.cleanNode($thead);
                    ko.cleanNode(tbody);
                });
                // Add class, remove margins, reset width and wrap table
                $t
                    .addClass('sticky-enabled')
                    .css({
                        margin: 0,
                        width: '100%'
                    }).wrap('<div class="sticky-wrap" />');
                if ($t.hasClass('overflow-y')) $t.removeClass('overflow-y').parent().addClass('overflow-y');
                // Create new sticky table head (basic)
                $t.after('<table class="sticky-thead" />');
                var thCount = $thead.find('th').length;
                // If <tbody> contains <th>, then we create sticky column and intersect (advanced)
                if ($t.find('tbody th').length > 0) {
                    //$t.after('<table class="sticky-col" />');
                    $t.after('<table class="sticky-col" /><table class="sticky-intersect" />');
                }
                // Create shorthand for things
                var $stickyHead = $(this).siblings('.sticky-thead'),
                    $stickyCol = $(this).siblings('.sticky-col'),
                    $stickyInsct = $(this).siblings('.sticky-intersect').addClass($class),
                    $stickyWrap = $(this).parent('.sticky-wrap');
                $stickyHead.append($thead).addClass($class);
                var childBindingContext = bindingContext.createChildContext(viewModel);
                ko.applyBindingsToDescendants(childBindingContext, $stickyHead.get(0));
                $stickyCol
                    .append($col).addClass($class)
                    .find('thead th:gt(0)').remove()
                    .end()
                    .find('thead th').empty()
                    .end()
                    .find('tbody td').remove();
                if ($stickyCol.length > 0) {
                    ko.applyBindingsToDescendants(childBindingContext, $stickyCol.get(0));
                }
                $stickyInsct.html('<thead></thead>');
                // Set widths
                var setWidths = function () {
                    $t
                        .find('thead th').each(function (i) {
                            $stickyHead.find('th').eq(i).width($(this).width());
                        })
                        .end()
                        .find('tr').each(function (i) {
                            $stickyCol.find('tr').eq(i).height($(this).height());
                        });
                    // Set width of sticky table head
                    $stickyHead.width($t.width());
                    // Set width of sticky table col
                    $stickyCol.find('th').add($stickyInsct.find('th')).width($t.find('thead th').width())
                },
                    repositionStickyHead = function () {
                        // Return value of calculated allowance
                        var allowance = calcAllowance();
                        // Check if wrapper parent is overflowing along the y-axis
                        if ($t.height() > $stickyWrap.height()) {
                            // If it is overflowing (advanced layout)
                            // Position sticky header based on wrapper scrollTop()
                            if ($stickyWrap.scrollTop() > 0) {
                                // When top of wrapping parent is out of view
                                $stickyHead.add($stickyInsct).css({
                                    opacity: 1,
                                    top: $stickyWrap.scrollTop()
                                });
                            } else {
                                // When top of wrapping parent is in view
                                $stickyHead.add($stickyInsct).css({
                                    opacity: 1,
                                    top: 0
                                });
                            }
                        } else {
                            // If it is not overflowing (basic layout)
                            // Position sticky header based on viewport scrollTop
                            if ($w.scrollTop() > $t.offset().top && $w.scrollTop() < $t.offset().top + $t.outerHeight() - allowance) {
                                // When top of viewport is in the table itself
                                $stickyHead.add($stickyInsct).css({
                                    opacity: 1,
                                    top: $w.scrollTop() - $t.offset().top
                                });
                            } else {
                                // When top of viewport is above or below table
                                $stickyHead.add($stickyInsct).css({
                                    opacity: 1,
                                    top: 0
                                });
                            }
                        }
                    },
                    repositionStickyCol = function () {
                        if ($stickyWrap.scrollLeft() > 0) {
                            // When left of wrapping parent is out of view
                            $stickyCol.add($stickyInsct).css({
                                opacity: 1,
                                left: $stickyWrap.scrollLeft()
                            });
                        } else {
                            // When left of wrapping parent is in view
                            $stickyCol
                                .css({ opacity: 0 })
                                .add($stickyInsct).css({ left: 0 });
                        }
                    },
                    calcAllowance = function () {
                        var a = 0;
                        // Calculate allowance
                        $t.find('tbody tr:lt(3)').each(function () {
                            a += $(this).height();
                        });
                        // Set fail safe limit (last three row might be too tall)
                        // Set arbitrary limit at 0.25 of viewport height, or you can use an arbitrary pixel value
                        if (a > $w.height() * 0.25) {
                            a = $w.height() * 0.25;
                        }
                        // Add the height of sticky header
                        a += $stickyHead.height();
                        return a;
                    };
                setWidths();
                $t.parent('.sticky-wrap').scroll($.throttle(50, function () {
                    repositionStickyHead();
                    repositionStickyCol();
                }));
                $w
                    .load(setWidths)
                    .resize($.debounce(50, function () {
                        setWidths();
                        repositionStickyHead();
                        repositionStickyCol();
                    }))
                    .scroll($.throttle(50, repositionStickyHead));
            }
        }

        createStickyTable.call(element);
    }
};


/* stop Bindings*/
ko.bindingHandlers.stopBindings = {
    init: function () {
        return { controlsDescendantBindings: true };
    }
};
ko.virtualElements.allowedBindings.stopBindings = true;


var origText = ko.bindingHandlers.text;

ko.bindingHandlers.text = {
    update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var trimLength = allBindingsAccessor['get']('trimLength') || 0;
        if (trimLength > 5) {
            var untrimmedText = ko.utils.unwrapObservable(valueAccessor());
            var text = untrimmedText ? (untrimmedText.length > trimLength ? untrimmedText.substring(0, trimLength - 3) + '...' : untrimmedText) : '';
            ko.utils.setTextContent(element, text);
        } else {
            origText.update(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext);
        }

        var shortenOptions = allBindingsAccessor['get']('shorten');

        if (shortenOptions) {
            $(element).shorten(shortenOptions);
        }
    }
};


/* Unique ID*/
ko.bindingHandlers.uniqueID = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        var that = $(element);
        var prefix = allBindingsAccessor['get']('uniquePrefix') || ko.bindingHandlers.uniqueID._prefix;
        var value = ko.bindingHandlers.uniqueID._values[prefix];

        if (!value) {
            value = 0;
        }

        ko.bindingHandlers.uniqueID._values[prefix] = ++value;
        that.attr("id", prefix + value);
    },
    _values: [],
    _prefix: "ko-uniqueid"
};

/* Unique For*/
ko.bindingHandlers.uniqueFor = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        var that = $(element);
        var prefix = allBindingsAccessor['get']('uniquePrefix') || ko.bindingHandlers.uniqueID._prefix;
        var value = ko.bindingHandlers.uniqueID._values[prefix];

        if (!value) {
            value = 0;
            ko.bindingHandlers.uniqueID._values[prefix] = ++value;
        }

        that.attr("for", prefix + value);
    }
};

ko.bindingHandlers.fadeVisible = {
    init: function (element, valueAccessor) {
        // Initially set the element to be instantly visible/hidden depending on the value
        var value = valueAccessor();
        $(element).hide(); // Use "unwrapObservable" so we can handle values that may or may not be observable
    },
    update: function (element, valueAccessor, allBindingsAccessor) {
        // Whenever the value subsequently changes, slowly fade the element in or out
        var value = valueAccessor();

        var delay = allBindingsAccessor['get']('delay') || 600;

        _.delay(function () {
            ko.unwrap(value) ? $(element).fadeIn(1000) : $(element).fadeOut(1000);
        }, delay);


    }
};

ko.bindingHandlers.slideVisible = {
    init: function (element, valueAccessor) {
        // Initially set the element to be instantly visible/hidden depending on the value
        var value = valueAccessor();
        $(element).toggle(ko.unwrap(value)); // Use "unwrapObservable" so we can handle values that may or may not be observable
    },
    update: function (element, valueAccessor) {
        // Whenever the value subsequently changes, slowly fade the element in or out
        var value = valueAccessor();
        ko.unwrap(value) ? $(element).slideDown() : $(element).slideUp();
    }
};


ko.bindingHandlers._errorTooltip = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel) {

        var options = valueAccessor();
        var that = $(element);
        var defaultOptions = {
            placement: 'right',
            trigger: 'manual',
            animation: false
        };
        options = $.extend(true, {}, defaultOptions, options);

        if (options.offsetX || options.offsetY || options.class || options.width || options.autoSize) {
            var placement = options.placement;
            options.placement = function (tip, triggerElement) {
                _.delay(function () {
                    if (options.offsetX) {
                        $(tip).css('left', $(tip).position().left + options.offsetX);
                    }
                    if (options.offsetY) {
                        $(tip).css('top', $(tip).position().left + options.offsetY);
                    }
                    if (options.class) {
                        $(tip).addClass(options.class);
                    }
                    if (options.width) {
                        $(tip).find('.tooltip-inner').css('max-width', options.width).width(options.width);
                    }
                    if (options.autoSize) {
                        $(tip).find('.tooltip-inner').css('max-width', '').width('auto');
                    }
                }, 1);
                return placement;
            };
        }

        that.tooltip(options);

        ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
            that.tooltip('destroy');
        });
    }
};

/* returnKey */
ko.bindingHandlers.returnKeySubmit = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var selector = ko.unwrap(valueAccessor()).toString();

        if (selector.indexOf('.') == -1) {
            if (selector.indexOf('#') == -1) {
                selector = "#" + selector;
            }
        }

        //wrap the handler with a check for the enter key
        var wrappedHandler = function (viewModel, event) {
            var keyCode = event.which || event.keyCode;
            if (keyCode === 13) {
                var target = event.target;
                target.blur();
                $(selector).trigger('click');
                event.cancelBubble = true;
                if (event.stopPropagation) event.stopPropagation();
                return false;
            }

            return true;
        };

        //call the real event binding for 'keyup' with our wrapped handler
        ko.bindingHandlers.event.init(element, function () { return { keydown: wrappedHandler }; }, ko.bindingHandlers.delayedKeyUpEvent.makeAllBindingsAccessor(allBindingsAccessor), viewModel, bindingContext);

    }
};


/*ajax Submit*/
ko.bindingHandlers.ajaxSubmit = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var delay = allBindingsAccessor['get']('delay') || 50;
        var activity = allBindingsAccessor['get']('activity') || false;
        var validationLog = allBindingsAccessor['get']('validationLog') || false;
        var that = $(element);
        var value = valueAccessor(),
            command = value.execute || value;
        var canExecute = value.canExecute || false;
        var validateDelegate = value.validate || function () { return true; };
        var tooltipOptions = ko.utils.unwrapObservable(allBindingsAccessor['get']('bTooltip'));
        if (!tooltipOptions) {
            tooltipOptions = {
                placement: 'right',
                animation: false
            };
        }
        tooltipOptions.trigger = 'hover';

        if (ko.utils.tagNameLower(element) === "a") {
            that.attr('href', 'javscript:void(0)').addClass('disabled');
        }

        if (activity) {
            that.append('<span class="action-progress hide"><i class="icon-refresh icon-spin fa fa-refresh fa-spin"></i></span>');
            ko.bindingHandlers._errorTooltip.init(element, function () { return tooltipOptions; }, allBindingsAccessor, viewModel, bindingContext);

            if (canExecute) {
                canExecute.subscribe(function (newValue) {

                    if (newValue) {
                        _.delay(function () {
                            $(".action-progress", that).hide();
                        }, 2);
                        $(element).removeClass('disabled').tooltip('disable');
                    } else {
                        $(element).addClass('disabled').tooltip('enable');
                    }
                });
            }
        }

        var wrappedHandler = function () {
            if (validateDelegate() && ko.utils.isValid(viewModel, validationLog)) {
                if (activity && canExecute) {
                    $(".action-progress", that).show();
                }

                _.delay(function () {
                    command.apply(this, arguments);
                }, delay, this);
            }

            return false;
        };


        //call the real event binding for 'keyup' with our wrapped handler
        ko.bindingHandlers.event.init(element, function () { return { click: wrappedHandler }; }, ko.bindingHandlers.delayedClickEvent.makeAllBindingsAccessor(allBindingsAccessor), viewModel, bindingContext);
    },
    update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var value = valueAccessor();
        var canExecute = value.canExecute || false;

        if (!canExecute) {
            return;
        }

        ko.bindingHandlers.enable.update(element, canExecute, allBindingsAccessor, viewModel, bindingContext);

    }
};


ko.bindingHandlers.validateTo = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var obj = ko.utils.unwrapObservable(valueAccessor());

        var obsv = obj.source;

        var placement = obj.placement || 'right';
        var selector = ko.utils.unwrapObservable(obj.target).toString();

        if (selector.indexOf('.') == -1) {
            if (selector.indexOf('#') == -1) {
                selector = "#" + selector;
            }
        }
        var targetElement = $(selector).get(0);

        if (targetElement && ko.utils.isValidatable(obsv)) {
            obsv.extend({
                DOMElement: targetElement
            });

            var tooltipOptions = {
                placement: placement,
                trigger: 'manual',
                animation: false
            };


            ko.bindingHandlers._errorTooltip.init(targetElement, function () { return tooltipOptions; }, allBindingsAccessor, viewModel, bindingContext);


            obsv.subscribe(function () {
                _.delay(function () {
                    var valid = obsv.isValid();
                    if (valid) {
                        $(obsv.DOMElement).removeClass('validation-error');

                        if ($(obsv.DOMElement).attr('data-original-title') != undefined) {
                            $(obsv.DOMElement).attr('data-original-title', '').tooltip('fixTitle').tooltip('hide');

                        } else {
                            ko.bindingHandlers._errorTooltip.init($(obsv.DOMElement).get(0), function () { return tooltipOptions; }, allBindingsAccessor, viewModel, bindingContext);
                        }
                    }
                }, 2);

            });
        }

    }
};

ko.bindingHandlers.validateToInternal = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var obj = ko.utils.unwrapObservable(valueAccessor());

        var obsv = obj.source;

        var placement = obj.placement || 'top';
        var tooltipOptions = ko.utils.unwrapObservable(allBindingsAccessor['get']('bTooltip'));
        var targetElement = obj.target;

        if (targetElement && ko.utils.isValidatable(obsv)) {
            obsv.extend({
                DOMElement: targetElement
            });

            var tooltipOptionsDefault = {
                placement: placement,
                trigger: 'manual',
                animation: false,
                container: 'body',
                viewport: { "selector": "body", "padding-bottom": '10px' },
                delay: { "show": 500, "hide": 100 }
            };

            tooltipOptions = $.extend({}, tooltipOptionsDefault, tooltipOptions || {});

            ko.bindingHandlers._errorTooltip.init(targetElement, function () { return tooltipOptions; }, allBindingsAccessor, viewModel, bindingContext);


            obsv.subscribe(function () {
                _.delay(function () {
                    var valid = obsv.isValid();
                    if (valid) {
                        $(obsv.DOMElement).removeClass('validation-error');

                        if ($(obsv.DOMElement).attr('data-original-title') != undefined) {
                            $(obsv.DOMElement).attr('data-original-title', '').tooltip('fixTitle').tooltip('hide');

                        } else {
                            ko.bindingHandlers._errorTooltip.init($(obsv.DOMElement).get(0), function () { return tooltipOptions; }, allBindingsAccessor, viewModel, bindingContext);
                        }
                    }
                }, 2);

            });
        }

    }
};


/* Value Binding override*/
var origValue = ko.bindingHandlers.value;
ko.bindingHandlers.value = {
    makeAllBindingsAccessor: function (allBindingsAccessor) {
        var unwrappedValue = allBindingsAccessor();

        var newAllBindings = function () {


            if (unwrappedValue.returnKey || unwrappedValue.delayedKeyUpEvent) {
                newAllBindings = ko.utils.extend(unwrappedValue, { valueUpdate: 'afterkeydown' });
            }
            // for backwards compatibility w/ knockout  < 3.0
            return unwrappedValue;
        };

        newAllBindings.get = function (a) {
            if (a === 'valueupdate' && (unwrappedValue.returnKey || unwrappedValue.delayedKeyUpEvent)) {
                return 'afterkeydown';
            }

            return allBindingsAccessor.get(a);
        };

        newAllBindings.has = function (a) {
            if (a === 'valueupdate' && (unwrappedValue.returnKey || unwrappedValue.delayedKeyUpEvent)) {
                return true;
            }
            return allBindingsAccessor.has(a);
        };

        return newAllBindings;
    },

    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var that = $(element);
        origValue.init(element, valueAccessor, ko.bindingHandlers.value.makeAllBindingsAccessor(allBindingsAccessor), viewModel, bindingContext);
        var obsv = valueAccessor();
        var tooltipOptions = ko.utils.unwrapObservable(allBindingsAccessor['get']('bTooltip'));

        if (allBindingsAccessor['has']('mask')) {
            var mask = allBindingsAccessor['get']('mask') || {};
            $(element).mask(mask);
        }


        if (ko.utils.isValidatable(obsv) && !obsv.DOMElement) {
            obsv.extend({
                DOMElement: element
            });

            if (!tooltipOptions) {
                tooltipOptions = {
                    placement: 'right',
                    trigger: 'manual',
                    animation: false
                };
            }

            if (that.is("input") || that.is("textarea")) {
                if (typeof (Placeholders) !== 'undefined') {
                    if (!Placeholders.nativeSupport) {
                        Placeholders.enable(element);

                        ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                            Placeholders.disable(element);
                        });

                    }
                }
            }


            ko.bindingHandlers._errorTooltip.init(element, function () { return tooltipOptions; }, ko.bindingHandlers.value.makeAllBindingsAccessor(allBindingsAccessor), viewModel, bindingContext);
        }
    },
    update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        origValue.update(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext);
        var obsv = valueAccessor();
        var that = $(element);

        var tooltipOptions = ko.utils.unwrapObservable(allBindingsAccessor['get']('bTooltip'));
        if (!tooltipOptions) {
            tooltipOptions = {
                placement: 'right',
                trigger: 'manual',
                animation: false
            };
        }

        if (that.is("input") || that.is("textarea")) {
            if (typeof (Placeholders) !== 'undefined') {
                if (!Placeholders.nativeSupport) {
                    Placeholders.disable(element);
                    Placeholders.enable(element);
                }
            }
        }

        if (ko.utils.isValidatable(obsv) && obsv.DOMElement) {
            var valid = obsv.isValid();
            if (valid) {
                $(obsv.DOMElement).removeClass('validation-error');

                if ($(obsv.DOMElement).attr('data-original-title') != undefined) {
                    $(obsv.DOMElement).attr('data-original-title', '').tooltip('fixTitle').tooltip('hide');

                } else {
                    ko.bindingHandlers._errorTooltip.init($(obsv.DOMElement).get(0), function () { return tooltipOptions; }, ko.bindingHandlers.value.makeAllBindingsAccessor(allBindingsAccessor), viewModel, bindingContext);
                }
            }
        }
    }
};


ko.initModel = function (model) {
    ko.utils.extend(model, {
        hasID: ko.computed(function () {
            return this.ID && !_.isNullOrUndefined(this.ID());

        }, model, {
            deferEvaluation: true
        }),

        emptyAll: function () {
            if (this.include) {
                var obj = this;
                _.each(this.include, function (prop) {

                    if (prop !== '_destroy') {
                        var property = obj[prop];

                        if (property.Empty) {
                            property.Empty();
                        }
                    }

                });
            }
        }
    })
};


ko.buildAjaxModel = function (requestUrl, mapping, onComplete, callback, isArray, paging, pageSize, maxPagingItems) {
    /// <summary>Build Ajax Model.</summary>
    /// <param name="requestUrl" type="String"></param>
    /// <param name="mapping" type="Function"></param>
    /// <param name="onComplete" type="Function"></param>
    /// <param name="callback" type="Function"></param>
    /// <param name="isArray" type="Boolean"></param>
    /// <param name="paging" type="Number" integer="true"></param>
    /// <param name="pageSize" type="Number" integer="true"></param>

    var options, onGetError;
    if (arguments.length == 1 && _.isObject(arguments[0])) {
        options = arguments[0];
    }

    if (options) {
        requestUrl = options.getUrl; // url to get data
        mapping = options.mapping; // model mapping
        onComplete = options.onGet; // model serialization callback
        callback = options.itemCallback; // model item serialization callback if array
        isArray = options.isArray; // data is array
        pageSize = options.pageSize; // paging size of array
        maxPagingItems = options.maxPagingItems; // no of pages to show in pager    
        paging = options.pagingMode;
    }


    if (typeof isArray === "undefined") {
        isArray = false;
    }

    if (typeof paging === "undefined") {
        paging = PagingStyle.None.Text;
    }

    if (paging === true) {
        paging = PagingStyle.Social.Text;
    }

    if (typeof pageSize === "undefined") {
        pageSize = 10;
    }


    var info = {
        RequestUrl: requestUrl,
        Mapping: mapping,
        OnComplete: onComplete,
        Callback: callback,
        PagingType: paging,
        isArray: isArray,
        maxPagingItems: maxPagingItems || 5,
        lastValues: [],
        BuildRequestUrl: function (values) {
            var returnUrl = this.RequestUrl;
            if (!_.isNullOrUndefined(values) && values.length > 0) {
                this.lastValues = values;
            }

            returnUrl = this.RequestUrl.formatString.apply(this.RequestUrl, this.lastValues);

            if (this.isArray && this.PagingType !== PagingStyle.None.Text) {
                if (returnUrl.indexOf("?") == -1) {
                    returnUrl = returnUrl + "?";
                }

                returnUrl = returnUrl + "&page=" + model.PageIndex() + "&size=" + model.PageSize();
            }

            return returnUrl;
        }

    };


    var model;

    if (isArray) {
        model = {

        };
    } else {
        model = mapping();
    }

    /// <var type="Boolean">Model Loading Progress.</var>
    model.loading = ko.observable(false);
    model.setRequestUrl = function (newRequestUrl) {
        if (!_.isNullOrEmpty(newRequestUrl)) {
            info.RequestUrl = newRequestUrl;
        }
    };

    model.setCompleteCallback = function (onCompleteFunc) {
        info.OnComplete = onCompleteFunc;
    };

    model.setCallback = function (callbackFunc) {
        info.Callback = callbackFunc;
    };

    if (options) {
        if (options.extend) {
            ko.utils.extend(model, options.extend);
        }

        if (!_.isNullOrEmpty(options.postUrl)) { // postURl
            model.post = ko.asyncCommand({
                execute: function (complete) {
                    if (options.onBeforePost && options.onBeforePost.call(model) === false) {
                        complete();
                        return;
                    }

                    var saveRequest = new Framework.AjaxRequestInfo(options.postUrl,
                        function (response) {
                            if (options.onPost) {
                                options.onPost.call(model, response);
                            }

                            complete();
                        }, function (response) {
                            if (response.StatusCode == 401) {
                                if (window.parent && window.parent.$.fancybox && window.parent.$.fancybox.isOpen) {
                                    window.location = "/UnauthorisedRequest";
                                } else {
                                    window.location.href = "/UnauthorisedUrl";
                                }
                            } else {
                                if (options.onPostError) {
                                    options.onPostError.call(model, response);

                                } else {
                                    //console.log("error 401 : post");
                                    notify.error(response.ErrorMessage || response.ExceptionMessage);
                                }
                            }


                            complete();
                        });
                    saveRequest.setParamData(model);
                    Framework.AjaxManager.add(saveRequest, options.postResponse);
                },
                canExecute: function (isExecuting) {
                    var postValid = true;

                    if (options.postValidator) {
                        postValid = options.postValidator.call(model);
                    }

                    return !isExecuting && postValid;
                }
            }, model);
        }

        if (!_.isNullOrEmpty(options.putUrl)) { // putUrl
            model.put = ko.asyncCommand({
                execute: function (complete) {
                    if (options.onBeforePut && options.onBeforePut.call(model) === false) {
                        complete();
                        return;
                    }

                    var saveRequest = new Framework.AjaxRequestInfo(options.putUrl,
                        function (response) {
                            if (options.onPut) {
                                options.onPut.call(model, response);
                            }
                            complete();
                        }, function (response) {
                            if (response.StatusCode == 401) {
                                if (window.parent && window.parent.$.fancybox && window.parent.$.fancybox.isOpen) {
                                    window.location = "/UnauthorisedRequest";
                                } else {
                                    window.location.href = "/UnauthorisedUrl";
                                }
                            } else {
                                if (options.onPutError) {
                                    options.onPutError.call(model, response);
                                } else {
                                    //console.log("error 401 : post");
                                    notify.error(response.ErrorMessage || response.ExceptionMessage);
                                }
                            }


                            complete();

                        });
                    saveRequest.setParamData(model);
                    Framework.AjaxManager.save(saveRequest, options.putResponse);
                },
                canExecute: function (isExecuting) {
                    var putValid = true;

                    if (options.putValidator) {
                        putValid = options.putValidator.call(model);
                    }

                    return !isExecuting && putValid;
                }
            }, model);
        }

        if (!_.isNullOrEmpty(options.deleteUrl)) { // deleteUrl
            model.delete = ko.asyncCommand({
                execute: function (complete) {
                    if (options.onBeforeDelete && options.onBeforeDelete.call(model) === false) {
                        complete();
                        return;
                    }

                    var request = new Framework.AjaxRequestInfo(options.deleteUrl,
                        function (response) {
                            if (options.onDelete) {
                                options.onDelete.call(model, response);
                            }
                            complete();
                        }, function (response) {
                            if (response.StatusCode == 401) {
                                if (window.parent && window.parent.$.fancybox && window.parent.$.fancybox.isOpen) {
                                    window.location = "/UnauthorisedRequest";
                                } else {
                                    window.location.href = "/UnauthorisedUrl";
                                }
                            } else {
                                if (options.onDeleteError) {
                                    options.onDeleteError.call(model, response);
                                } else {
                                    //console.log("error 401 : post");
                                    notify.error(response.ErrorMessage || response.ExceptionMessage);
                                }
                            }


                            complete();

                        });
                    Framework.AjaxManager.remove(request, options.deleteResponse);
                },
                canExecute: function (isExecuting) {
                    var deleteValid = true;

                    if (options.deleteValidator) {
                        deleteValid = options.deleteValidator.call(model);
                    }

                    return !isExecuting && deleteValid;
                }
            }, model);
        }
    }

    if (isArray) {
        /// <field  type="Array">Model Items.</field>
        model.Items = ko.observableArray([]).mapping(info.Mapping);
        model.PageSize = ko.observable(pageSize);
        model.TotalCount = ko.observable(0);
        model.PageIndex = ko.observable(0);
    }

    var loadingPaging = false;

    var pagingDone = false;

    model.getWith = function () {
        var params = [];
        for (var i = 0; i < (arguments.length - 0) ; i++) {
            params[i] = arguments[i + 0];
        }
        params.insert(0, false);
        params.insert(1, true);
        model.get.apply(this, params);
    };


    model.get = function (skipCallback, reset) {
        if (typeof skipCallback === "undefined") {
            skipCallback = false;
        }

        if (typeof reset === "undefined") {
            reset = true;
            if (isArray) {
                if (info.PagingType === PagingStyle.None.Text) {
                    model.PageIndex(0);
                    pagingDone = false;
                }
            }

        }

        var params = [];
        for (var i = 0; i < (arguments.length - 2) ; i++) {
            params[i] = arguments[i + 2];
        }

        if (_.isNullOrEmpty(info.RequestUrl)) {
            return;
        }

        model.loading(true);

        var request = new Framework.AjaxRequestInfo(info.BuildRequestUrl(params), function (data) {

            if (isArray && reset) {
                model.Items.removeAll();
            }

            if (_.isNullOrUndefined(data)) {
                if (!skipCallback && !_.isNullOrUndefined(onComplete)) {
                    onComplete.call(model, data);
                }
                model.loading(false);
                return;
            }

            var isPagedItems = false;
            if (data.Items) {
                model.PageSize(data.PageSize || 10);
                model.TotalCount(data.TotalCount || 0);
                model.PageIndex(data.PageIndex || 0);
                data = data.Items;
                isPagedItems = true;
            }

            if (_.isNullOrUndefined(data)) {
                if (!skipCallback && !_.isNullOrUndefined(onComplete)) {
                    onComplete.call(model, data);
                }
                model.loading(false);
                return;
            }
            if (isArray && info.PagingType) {
                if (!skipCallback && !_.isNullOrUndefined(onComplete)) {
                    onComplete.call(model, data);
                }
                model.loading(false);
                loadingPaging = false;

                if (isPagedItems) {
                    var total = (model.PageIndex() + 1) * model.PageSize();

                    if (total >= model.TotalCount()) {
                        pagingDone = true;

                        if (model.MoreAvailable) {
                            model.MoreAvailable(false);
                        }

                        loadingPaging = false;

                    } else {
                        pagingDone = false;
                        if (model.MoreAvailable) {
                            model.MoreAvailable(true);
                        }
                    }
                } else {
                    if (data.length == 0) {
                        pagingDone = true;

                        if (model.MoreAvailable) {
                            model.MoreAvailable(false);
                        }

                        return;
                    }
                }

            }

            if (isArray) {
                var items = model.Items();
                _.each(data, function (item) {
                    if (!skipCallback && !_.isNullOrUndefined(callback)) {
                        callback.call(model, item);
                    }
                    var newItem = mapping();
                    Framework.DataBinder.buildModel(newItem, item);
                    items.push(newItem);
                });

                model.Items.invalidate();
            } else {
                if (!skipCallback && !_.isNullOrUndefined(callback)) {
                    callback.call(model, data);
                }

                Framework.DataBinder.buildModel(model, data);
            }

            if (!skipCallback && !_.isNullOrUndefined(onComplete)) {
                onComplete.call(model);
            }
            loadingPaging = false;

            model.loading(false);
        }, function (response) {
            if (response.StatusCode == 401) {
                if (window.parent && window.parent.$.fancybox && window.parent.$.fancybox.isOpen) {
                    window.location = "/UnauthorisedRequest";
                } else {
                    window.location.href = "/UnauthorisedUrl";
                }
            } else {
                if (options.onGetError) {
                    options.onGetError.call(model, response);
                } else {
                    //console.log("error 401 : post");
                    notify.error(response.ErrorMessage || response.ExceptionMessage);
                }
            }
        });

        Framework.AjaxManager.get(request);
    };

    if (info.PagingType == PagingStyle.Social.Text) {

        model.getMore = function () {

            loadingPaging = true;
            model.PageIndex(model.PageIndex() + 1);
            model.get.call(model, false, false);
        };

        model.MoreAvailable = ko.observable(true);


        $(window).scroll(function () {
            if ($(window).scrollTop() == $(document).height() - $(window).height()) {

                if (loadingPaging) {
                    return;
                }

                if (pagingDone) {
                    return;
                }

                model.getMore();
            }
        });
    } else if (info.PagingType == PagingStyle.More.Text) {

        model.getMore = function () {
            if (loadingPaging) {
                return;
            }

            if (pagingDone) {
                return;
            }

            loadingPaging = true;
            model.PageIndex(model.PageIndex() + 1);
            model.get.call(model, false, false);
        };

        model.MoreAvailable = ko.observable(true);

        model.MoreAvailable.subscribe(function (newValue) {
            if (newValue === true) {
                pagingDone = false;
            }
        });
    } else if (info.PagingType == PagingStyle.Bootstrap.Text) {
        model.PageCount = ko.computed(function () {
            return Math.ceil(model.TotalCount() / model.PageSize());
        });

        model.ItemCount = ko.computed(function () {
            return model.Items().length;
        });

        model.PageNumber = ko.computed(function () {
            return model.PageIndex() + 1;
        });

        model.StartIndex = ko.computed(function () {
            return Math.ceil(model.PageIndex() * model.PageSize()) + 1;
        });

        model.DisplayIndex = ko.computed(function () {
            var index = Math.ceil(model.PageIndex() * model.PageSize()) + model.PageSize();
            return index > model.TotalCount() ? model.TotalCount() : index;
        });

        model.HasPreviousPage = ko.computed(function () {
            return model.PageIndex() > 0;
        });

        model.HasNextPage = ko.computed(function () {
            return model.PageIndex() < (model.PageCount() - 1);
        });

        model.IsFirstPage = ko.computed(function () {
            return model.PageIndex() === 0;
        });

        model.IsLastPage = ko.computed(function () {
            return model.PageIndex() === (model.PageCount() - 1);
        });

        model.gotoPage = function (page) {
            loadingPaging = true;
            model.PageIndex(page);
            model.get.call(model, false, true);
        };

        model.nextPage = function () {
            if (model.HasNextPage()) {
                model.gotoPage(model.PageIndex() + 1);
            }
        };

        model.previousPage = function () {
            if (model.HasPreviousPage()) {
                model.gotoPage(model.PageIndex() - 1);
            }
        };

        model.Pages = ko.computed(function () {
            var start = 0;

            var end = 0;

            var page = model.PageNumber();

            var maxPagingItems = info.maxPagingItems;
            var pages = [];

            var totalPages = model.PageCount();

            var middleFactor = maxPagingItems / 2;

            if (totalPages <= maxPagingItems) {

                start = 1;

                end = totalPages;
            } else {
                start = Math.ceil(page === totalPages ? totalPages - (maxPagingItems - 1) : page - middleFactor);
                end = page === totalPages ? totalPages : page + middleFactor;
                end = end > totalPages ? totalPages : end;

                if (start < 1) {
                    start = 1;
                    end = Math.ceil(start + maxPagingItems - 1);
                }
            }

            if (start > middleFactor) {
                pages.push('...');
            }

            for (var i = start; i <= end; i++) {
                pages.push(i);
            }

            return pages;
        });
    }

    return model;
};


ko.getModel = function (requestUrl, observable, mapping, callback, onComplete, context) {
    if (_.isNullOrUndefined(context)) {
        context = observable;
    }
    var request = new Framework.AjaxRequestInfo(requestUrl, function (data) {
        if (!_.isNullOrUndefined(data) && !_.isNullOrUndefined(callback)) {
            if (_.isArray(data)) {
                _.each(data, function (item) {
                    callback.call(context, item);
                });
            } else {
                callback.call(context, data);
            }
        }
        if (_.isArray(data)) {
            Framework.DataBinder.parseModel(data, observable, mapping);
        } else {
            observable(Framework.DataBinder.buildModel(mapping(), data));
        }
        if (!_.isNullOrUndefined(onComplete)) {
            onComplete.call(context);
        }
    });
    Framework.AjaxManager.get(request);
};


ko.loadModel = function (requestUrl, model, onComplete) {
    var request = new Framework.AjaxRequestInfo(requestUrl, function (data) {
        Framework.DataBinder.buildModel(model, data);
        if (!_.isNullOrUndefined(onComplete)) {
            onComplete.call(model);
        }
    });
    Framework.AjaxManager.get(request);
};

var inject_binding = function (allBindings, key, value) {
    //https://github.com/knockout/knockout/pull/932#issuecomment-26547528
    return {
        has: function (bindingKey) {
            return (bindingKey == key) || allBindings.has(bindingKey);
        },
        get: function (bindingKey) {
            var binding = allBindings.get(bindingKey);
            if (bindingKey == key) {
                binding = binding ? [].concat(binding, value) : value;
            }
            return binding;
        }
    };
}

ko.bindingHandlers.selectize = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        if (!allBindingsAccessor.has('optionsText'))
            allBindingsAccessor = inject_binding(allBindingsAccessor, 'optionsText', 'name');
        if (!allBindingsAccessor.has('optionsValue'))
            allBindingsAccessor = inject_binding(allBindingsAccessor, 'optionsValue', 'id');
/*
        if (typeof allBindingsAccessor.get('optionsCaption') == 'undefined')
            allBindingsAccessor = inject_binding(allBindingsAccessor, 'optionsCaption', 'Select...');
*/

        ko.bindingHandlers.options.update(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext);
        var options = {
            valueField: ko.unwrap(allBindingsAccessor.get('optionsValue')),
            labelField: ko.unwrap(allBindingsAccessor.get('optionsText')),
            searchField: ko.unwrap(allBindingsAccessor.get('optionsText')),
            create: false
        }

        function buildOption(item) {
            var obj = {};
            obj[options.valueField] = ko.unwrap(item[options.valueField]);
            obj[options.labelField] = ko.unwrap(item[options.labelField]);
            return obj;
        }

        if (allBindingsAccessor.has('selectizeOptions')) {
            var passed_options = allBindingsAccessor.get('selectizeOptions');
            for (var attr_name in passed_options) {
                options[attr_name] = passed_options[attr_name];
            }
        }

        var $select = $(element).selectize(options)[0].selectize;

        ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
            $select.destroy();
        });

 

        var $wrapper = $select.$control_input.get(0);

        if (typeof valueAccessor().subscribe == 'function') {
            valueAccessor().subscribe(function (changes) {
                if (changes == null || changes == undefined || changes.length == 0 || (changes.length == 1) && changes[0].status == 'deleted') {
                    $select.clearOptions();
                    return;
                }
                // To avoid having duplicate keys, all delete operations will go first
                var addedItems = new Array();
                changes.forEach(function (change) {
                    switch (change.status) {
                        case 'added':
                            addedItems.push(buildOption(change.value));
                            break;
                        case 'deleted':
                            var itemId = ko.unwrap(change.value[options.valueField]);
                            if (itemId != null) $select.removeOption(itemId);
                    }
                });
                addedItems.forEach(function (item) {
                    $select.addOption(item);
                });



            }, null, "arrayChange");
        }

        if (typeof allBindingsAccessor.get('value') == 'function') {
            
            $select.setValue(ko.unwrap(allBindingsAccessor.get('value')), true);
            allBindingsAccessor.get('value').subscribe(function (new_val) {
                if (new_val) {
                    var val = $select.getValue();

                    if (val !== new_val) {
                        $select.setValue(new_val);
                    }
                   
                } else {
                    $select.clear();
                }
            });
           // $select.addItem(ko.unwrap(allBindingsAccessor.get('value')));
            var validateToFunction = function () {
                return function () {
                    return {
                        source: allBindingsAccessor.get('value'),
                        target: $wrapper
                    };
                };
            }

            ko.bindingHandlers.validateToInternal.init(element, validateToFunction(), allBindingsAccessor, viewModel, bindingContext);
        }

        if (typeof allBindingsAccessor.get('selectedOptions') == 'function') {
            $select.setValue(ko.unwrap(allBindingsAccessor.get('selectedOptions')));
            allBindingsAccessor.get('selectedOptions').subscribe(function (new_val) {
                // Removing items which are not in new value
              

                if (!new_val || new_val.length == 0) {

                    $select.clear();

                    return;
                } else {
                    var val = $select.getValue();

                    if (!val.equals(new_val)) {
                        $select.setValue(new_val);
                    }
                }

              
            });
            
       
            var validateOptionsToFunction = function () {
                return function () {
                    return {
                        source: allBindingsAccessor.get('selectedOptions'),
                        target: $wrapper
                    };
                };
            }

            ko.bindingHandlers.validateToInternal.init(element, validateOptionsToFunction(), allBindingsAccessor, viewModel, bindingContext);
        }

        //console.dir($select);
        if (typeof init_selectize == 'function') {
            
            init_selectize($select, $wrapper);
        }

        $(element).bind('DOMAttrModified propertychange change', function () {
            //$select.refreshOptions();
        });

       



    },
    update: function (element, valueAccessor, allBindingsAccessor) {

        if (allBindingsAccessor.has('object')) {
            var optionsValue = allBindingsAccessor.get('optionsValue') || 'id';
            var value_accessor = valueAccessor();
            var selected_obj = $.grep(value_accessor(), function (i) {
                if (typeof i[optionsValue] == 'function')
                    var id = i[optionsValue]
                else
                    var id = i[optionsValue]
                return id == allBindingsAccessor.get('value')();
            })[0];

            if (selected_obj) {
                allBindingsAccessor.get('object')(selected_obj);
            }
        }
    }
}


ko.bindingHandlers.highCharts = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        var options = valueAccessor();
        var defaultOptions = {
            credits: {
                enabled: false
            },
            loading: {
                labelStyle: {
                    top: '45%'
                }
            },
        };
        options = $.extend(true, {

        }, defaultOptions, options);


        $(element).highcharts(options);

        if (viewModel.XAxisCategories) {
            if (ko.isObservable(viewModel.XAxisCategories)) {
                viewModel.XAxisCategories.subscribe(function (newValue) {
                    if (newValue) {
                        _.delay(function () {
                            var chart = $(element).highcharts();
                            chart.xAxis[0].setCategories(newValue, false);
                        }, 2);
                    }
                });
            }
        }

        if (viewModel.Series) {
            if (ko.isObservable(viewModel.Series)) {
                viewModel.Series.subscribe(function (newValue) {
                    if (newValue) {

                        var chart = $(element).highcharts();


                        chart.showLoading();

                        /*   while (chart.series.length > 0)
                               chart.series[0].remove(false);*/
                        var length = chart.series.length - 1;
                        var currentIndex;
                        _.each(newValue, function (series, index) {
                            var currentSeries = chart.series[index];
                            if (currentSeries) {
                                currentSeries.update({
                                    name: series.Name(),
                                    showInLegend: series.ShowInLegend(),
                                    color: series.Color(),
                                    data: series.Data()
                                }, false);
                            } else {
                                chart.addSeries({
                                    name: series.Name(),
                                    showInLegend: series.ShowInLegend(),
                                    color: series.Color(),
                                    data: series.Data()
                                }, false);
                            }

                            currentIndex = index;
                        });

                        while (length > currentIndex)
                            chart.series[currentIndex++].remove(false);

                        chart.redraw();
                        chart.hideLoading();
                    }
                });
            }
        }

        if (viewModel.loading) {
            if (ko.isObservable(viewModel.loading)) {
                viewModel.loading.subscribe(function (newValue) {
                    _.delay(function () {
                        var chart = $(element).highcharts();
                        if (newValue) {
                            chart.showLoading();
                        } else {
                            chart.hideLoading();
                        }
                    }, 1);

                });
            }
        }
    }
};

var formatCurrency = function (value, symbol) {
    if (!symbol) {
        symbol = '';
    }
    if (value) {
        var num = parseFloat(value);

        if (num && isFinite(num)) {
            var toks = num.toFixed(2).replace('-', '').split('.');
            var display = $.map(toks[0].split('').reverse(), function (elm, i) {
                return [(i % 3 === 0 && i > 0 ? ',' : ''), elm];
            }).reverse().join('') + '.' + toks[1];

            return value < 0 ? '-' + symbol + display : symbol + display;
        }
    }

    return symbol + '0.00';
};

ko.subscribable.fn.money = function () {
    var target = this;

    var writeTarget = function (value) {
        if (value) {
            var stripped = value.toString()
                .replace(/[^0-9.-]/g, '');

            target(parseFloat(stripped));
        } else {
            target(undefined);
        }
        
    };

    var result = ko.computed({
        read: function() {
            return target();
        },
        write: writeTarget
    });

    result.Symbol = ko.observable('');

    result.formatted = ko.computed({
        read: function () {
            return formatCurrency(target(), result.Symbol());
        },
        write: writeTarget
    });

    result.isNegative = ko.computed(function () {
        return target() < 0;
    });

    return result;
};