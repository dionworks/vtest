var VektorChooser = VektorChooser || {};


(function() {
    'use strict';

    // Contains all the data to filter
    // ----------


    VektorChooser.ResultModel = Backbone.Model.extend({

        defaults: {
            //collection of devices in the results
            devices : false,

            changeTime : '',

            vehicleTypes : [],

            props : []
        },


        initialize: function() {

            this.on('change:devices', this.setResults);
        },

        resetModel : function(items){
            //this.set('results',false);
            this.set('vehicleTypes',[]);
            this.set('props',[]);
        },

        setResults : function(){

            var devices = this.get('devices');
            console.log(devices);
            if( !devices ) {
                return false;
            }


            this.resetModel();



            devices.forEach(function(device,index,list){

                var props = _.union(window.resultModel.get('props'),device.get('props'));

                window.resultModel.set('props',props);

            });


            this.updateChangeTime();

        },

        updateChangeTime : function()
        {
            var d = new Date();
            this.set('changeTime', d.getTime() );
        }







    });

}());