var EXPORTED_SYMBOLS = ["Logger"]

//TODO(): Make this cleaner javascript, and maybe not a single instance.

Logger = new function() {

  this.TYPE_CONTENT_ALLOW = 1; // accepted requests
  this.TYPE_CONTENT_BLOCK = 2; // blocked requests
  this.TYPE_META_REFRESH = 4; // info related to meta refresh
  this.TYPE_HEADER_REDIRECT = 8; // info related to header redirects
  this.TYPE_INTERNAL = 16; // internal happenings of the extension
  this.TYPE_ERROR = 32; // errors
  this.TYPE_ALL = 0x11111111111; // all

  this.LEVEL_OFF = Number.MAX_VALUE; // no logging
  this.LEVEL_SEVERE = 1000;
  this.LEVEL_WARNING = 900;
  this.LEVEL_INFO = 800;
  this.LEVEL_ALL = Number.MIN_VALUE; // log everything

  this.TYPE_NAMES = {};
  this.TYPE_NAMES[this.TYPE_CONTENT_ALLOW + ""] = "CONTENT_ALLOWED";
  this.TYPE_NAMES[this.TYPE_CONTENT_BLOCK + ""] = "CONTENT_BLOCKED";
  this.TYPE_NAMES[this.TYPE_META_REFRESH + ""] = "META_REFRESH";
  this.TYPE_NAMES[this.TYPE_HEADER_REDIRECT + ""] = "HEADER_REDIRECT";
  this.TYPE_NAMES[this.TYPE_INTERNAL + ""] = "INTERNAL";
  this.TYPE_NAMES[this.TYPE_ERROR + ""] = "ERROR";

  this.LEVEL_NAMES = {};
  this.LEVEL_NAMES[this.LEVEL_SEVERE + ""] = "SEVERE";
  this.LEVEL_NAMES[this.LEVEL_WARNING + ""] = "WARNING";
  this.LEVEL_NAMES[this.LEVEL_INFO + ""] = "INFO";

  this.logLevel = this.LEVEL_ALL;

  // var logTypes = Logger.TYPE_ERROR | Logger.TYPE_HEADER_REDIRECT
  // | Logger.TYPE_INTERNAL;

  this.logTypes = this.TYPE_ALL;
};

Logger._doLog = function(level, type, message) {
  if (level >= this.logLevel && this.logTypes & level) {
    var levelName = this.LEVEL_NAMES[level + ""];
    var typeName = this.TYPE_NAMES[type + ""];
    dump("[CSRPolicy] [" + levelName + "] [" + typeName + "] " + message + "\n");
  }
};

Logger.severe = function(type, message) {
  this._doLog(this.LEVEL_SEVERE, type, message);
};

Logger.warning = function(type, message) {
  this._doLog(this.LEVEL_WARNING, type, message);
};

Logger.info = function(type, message) {
  this._doLog(this.LEVEL_INFO, type, message);
};