(function(angular) {

'use strict';

angular.module('mixpanelAngular', [])
  .directive('mpTrackOn', function(){
    var data = {};

    function isProperty(property){
      return ['mpEventToTrack', 'mpExtraParams'].indexOf(property) != -1;
    }

    function getTrackType(attrs) {
      var event = '';
      switch (attrs['mpTrackOn']) {
        case 'right-click':
          event = 'contextmenu';
          break;
        default:
          event = 'click';
          break;
      }
      return event;
    }

    function extractData(attrs, name) {
      if (attrs[name] == 'mpEventToTrack') {
        console.log('here');
        console.log(attrs[name]);
        data['event'] = attrs[name];
      } else if (attrs[name] == 'mpExtraParams') {
        data['params'] = attrs[name];
      }
    }

    var trackTypes = {
      'right-click': function(event, params, callback) {
        console.log(event);
        console.log(params);
        //window.mixpanel.track(params)
      }
    };

    return {
      restrict: 'A',
      scope: false,
      link: function($scope, $element, $attrs) {
        $element.bind(getTrackType($attrs), function() {
          angular.forEach($attrs.$attr, function(attr, name){
            if (isProperty(name)) {
              extractData($attrs, name);
            }
          });
          trackTypes[$attrs['mpTrackOn']](data['event'], data['params']);
        });
      }
    };
  });

})(angular);
