(function (window, angular, jasmine) {

  window.doubles = window.doubles || {};

  window.doubles.asyncService = createAsyncServiceDouble;

  function createAsyncServiceDouble(serviceName, methodNames) {
    angular
      .module('mocks__' + serviceName)
      .factory(serviceName, srv);

    srv.$inject = ['$q'];

    function srv($q) {

      var deferreds = {};

      var double = jasmine.createSpyObj(mockName, methodNames);

      double.setDeferred = setDeferred;
      double.getDeferred = getDeferred;

      methodNames.forEach(function (methodName) {
        setDeferred(methodName);
      });

      function setDeferred(methodName){
        deferreds[methodName] = $q.defer();
        double[methodName].andReturn(deferreds[methodName].promise);
      }

      function getDeferred(methodName){
        return double._deferreds[methodName];
      }

      return double;



    }
  }

})(window, angular, jasmine);