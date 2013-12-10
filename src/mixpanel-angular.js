(function(angular) {

'use strict';

angular.module('mixpanelAngular', [])
  .directive('mpTrackOn', function(){
    var data = {};

    function isProperty(property){
      return ['mpEventToTrack', 'mpExtraParams', 'mpCallback'].indexOf(property) != -1;
    }

    function getTrackType(event) {
      if (event == 'right-click') {
        return 'contextmenu';
      } else {
        return 'click';
      }
    }

    function extractData(attrs, name, scope) {
      if (name == 'mpEventToTrack') {
        data['event'] = attrs[name];
      } else if (name == 'mpExtraParams') {
        data['params'] = scope.$eval(attrs[name]);
      } else if (name == 'mpCallback') {
        data['callback'] = scope.$eval(attrs[name]);
      }
    }

    return {
      restrict: 'A',
      scope: false,
      link: function($scope, $element, $attrs) {
        var eventArray = $scope.$eval($attrs['mpTrackOn']);
        for (var i in eventArray) {
          $element.bind(getTrackType(eventArray[i]), function() {
            angular.forEach($attrs.$attr, function(attr, name){
              if (isProperty(name)) {
                extractData($attrs, name, $scope);
              }
            });
            mixpanel.track(data['event'], data['params'], function() {
              if (data['callback']) data['callback']();
            });
          });
        }
      }
    };
  });
})(angular);
