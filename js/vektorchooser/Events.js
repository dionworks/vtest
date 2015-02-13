var VektorChooser = VektorChooser || {};

(function () {
    'use strict';

    VektorChooser.events = {};
    // Mixin
    _.extend(VektorChooser.events , Backbone.Events);

    VektorChooser.events.on('device.search', function(filter){

        //to the search
        var search = new vektorSearch(filter);

        search.init();

    });

    VektorChooser.events.on('result.update', function(devices){

        //to the search
        resultModel.set('devices',devices);

        resultModel.setResults();

        console.log('In Event:');

    });


}());