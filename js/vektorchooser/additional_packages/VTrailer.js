var VektorChooser = VektorChooser || {};


(function() {
    'use strict';

    // BaseDevice Model, other device models will be extended from this
    // ----------


    VektorChooser.additionalPackageList.VTrailer = new VektorChooser.AdditionalPackageModel.extend({

        defaults: {
            //name of device
            name : 'VTrailer',
            //type of vehicles available
            vehicleTypes : ['VFleet CAN'],
            //default props are given
            props : ['Treyler ID']
        },


        initialize: function() {

            //this.setProps();


        },

        setProps : function(){
            var props = VektorChooser.defaultProps;
            this.set( 'props', props.concat(this.get('props')));
        }







    });

}());