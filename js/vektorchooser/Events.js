var VektorChooser = VektorChooser || {};

(function () {
    'use strict';

    VektorChooser.events = {};
    // Mixin
    _.extend(VektorChooser.events , Backbone.Events);

    VektorChooser.events.on('device.search', function(filter){

        //to the search
        window.vSearch(filter);

    });

    VektorChooser.events.on('result.update', function(devices){

        //to the search
        resultModel.set('devices',devices);

        console.log('In Event:',resultModel.get('additionalPackages'));

    });


}());