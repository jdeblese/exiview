var accepts = [{mimeTypes:["image/jpeg"]}],
//                  extensions:['jpg', 'jpeg']}];
    opts = {type    : "openFile",
            accepts : accepts};

var app = angular.module('exiview', ['ngGrid']);

app.controller('testctrl', ['$scope', function($scope) {
  // Empty row gives a blank grid with correct columns
  $scope.tags = [{tag:'', val:''}];  
  $scope.gridOpts = {data : 'tags',
                     columnDefs : [{field:'tag', displayName:'Tag'},
                                   {field:'val', displayName:'Value'}]};

  // Process EXIF tags into a structure ngGrid can use  
  var consume = (function($scope) {
    // Is a closure actually needed?
    return function() {
      var tags = EXIF.getAllTags(this);
      $scope.tags = [];
      for (var tag in tags) {
        $scope.tags.push({tag : tag, val : tags[tag]});
      }
      
      // Filesystem APIs in Chrome are asynchronous, so need to update watchers
      $scope.$apply();
    };
  })($scope);

  // Should be called by the file open icon of the GUI
  $scope.openFile = function() {
    chrome.fileSystem.chooseEntry(opts, function(fileEntry) { 
      fileEntry.file(function(file) {
        // exif-js uses 'instanceof window.File' to determine type
        // This is a hack until exif-js fixes its type-checking
        window.File = file.constructor;
        EXIF.getData(file, consume); 
      });
    });
  };
}]);