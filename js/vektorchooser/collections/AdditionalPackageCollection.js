var VektorChooser = VektorChooser || {};

(function () {
    'use strict';

    // Subject Collection: Collection of pages in a magazine
    // ---------------


    VektorChooser.AdditionalPackageCollection = Backbone.Collection.extend({

        // Reference to this collection's model.
        model: VektorChooser.AdditionalPackageModel,


        validFilters  : ['props','name'],



        //if item is array, look through
        filterBy: function (filter, value) {

            //check if its valid filter
            if(_.indexOf(this.validFilters,filter) == -1) {
                return false;
            }

            return this.filter(function (page) {


                var prop = page.get('name');



                if( _.isArray(prop) ) {
                    return (_.indexOf(prop, value) >= 0)? true : false;
                } else {

                    if(_.isArray(value) ) {
                        return (_.indexOf(value,prop) >= 0)? true : false;
                    }

                    return page.get(filter) == value;
                }

            });
        }




    });



}());