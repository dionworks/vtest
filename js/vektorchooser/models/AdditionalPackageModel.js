var VektorChooser = VektorChooser || {};


(function() {
    'use strict';

    // BaseDevice Model, other device models will be extended from this
    // ----------


    VektorChooser.AdditionalPackageModel = Backbone.Model.extend({

        defaults: {
            //name of device
            name : '',
            //type of vehicles available
            devices : [],
            //default props are given
            props : []
        },


        initialize: function() {

            //this.setProps();


        }








    });

}());