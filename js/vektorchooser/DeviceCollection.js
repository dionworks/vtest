var VektorChooser = VektorChooser || {};

(function () {
    'use strict';

    // Subject Collection: Collection of pages in a magazine
    // ---------------


    VektorChooser.DeviceCollection = Backbone.Collection.extend({

        // Reference to this collection's model.
        model: VektorChooser.DeviceModel,


        getPageByOrder: function (order) {
            return this.filter(function (page) {
                return page.get('globalOrder') == order;
            });
        },

        //if item is array, look through
        filterBy: function (filter, value) {
            return this.filter(function (page) {

                var prop = page.get(filter);

                //console.log('dev col',filter,page,prop,value);

                if( _.isArray(prop) ) {
                    return (_.indexOf(prop, value) >= 0)? true : false;
                } else {

                    return page.get(filter) == value;
                }

            });
        },

        /**
         * Gets the page where isCurrent true
         * @returns {Array|*}
         */
        getCurrentPage: function () {
            return this.filter(function (page) {
                return page.get('isCurrent') == true;
            });
        }
    });



}());