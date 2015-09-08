(function (window, angular, jasmine) {


  window.doubles = window.doubles || {};

  window.doubles.service = createServiceDouble;

  function createServiceDouble(serviceName, methodNames) {
    angular
      .module('mocks__' + serviceName)
      .factory(serviceName, srv);

    function srv() {
      var double = jasmine.createSpyObj(serviceName, methodNames);

      return double;
    }
  }

})(window, angular, jasmine);