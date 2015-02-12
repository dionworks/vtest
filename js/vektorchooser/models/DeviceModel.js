var VektorChooser = VektorChooser || {};


(function() {
    'use strict';

    // BaseDevice Model, other device models will be extended from this
    // ----------


    VektorChooser.DeviceModel = Backbone.Model.extend({

        defaults: {
            //name of device
            name : '',
            //type of vehicles available
            vehicleTypes : [],
            //default props are given
            props : [],
            //name of additionalPackages like ViV, VSense etc.
            additionalPackages : [],
            additionalProps : []
        },


        initialize: function() {

            this.setProps();


        },

        setProps : function(){
            var props = VektorChooser.defaultProps;
            this.set( 'props', props.concat(this.get('props')));
        }







    });

}());