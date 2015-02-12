var VektorChooser = VektorChooser || {};

(function () {
    'use strict';

    // Subject Collection: Collection of pages in a magazine
    // ---------------


    VektorChooser.DeviceCollection = Backbone.Collection.extend({

        // Reference to this collection's model.
        model: VektorChooser.DeviceModel,

        validFilters  : ['vehicleTypes','props','additionalPackages'],

        //if item is array, look through
        filterBy: function (filter, value) {



            return this.filter(function (page) {

                var prop = page.get(filter);


                if( _.isArray(prop) ) {
                    return (_.indexOf(prop, value) >= 0)? true : false;
                } else {

                    return page.get(filter) == value;
                }

            });
        }




    });



}());