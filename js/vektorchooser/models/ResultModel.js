var VektorChooser = VektorChooser || {};


(function() {
    'use strict';

    // Contains all the data to filter
    // ----------


    VektorChooser.ResultModel = Backbone.Model.extend({

        defaults: {
            //collection of devices in the results
            devices : false,

            packages : false,

            changeTime : '',

            vehicleTypes : [],

            props : [],

            additionalPackages : [],

            additionalProps : [],

            enabledPackages : [],

            filterModel: false
        },


        initialize: function() {

            //this.on('change:devices', this.setResults);
            //this.on('change:additionalPackages', this.updatePackageProps);
        },

        resetModel : function(items){
            this.set('vehicleTypes',[]);
            this.set('props',[]);
            this.set('additionalPackages',[]);
            this.set('additionalProps',[]);
            this.set('enabledPackages',[]);
        },

        setResults : function(){

            //final number of devices filtered
            var devices = this.get('devices');
            //console.log(devices);
            if( !devices ) {
                return false;
            }


            this.resetModel();


            //collect all available props and additional packages from devices
            devices.forEach(function(device,index,list){

                var props = _.union(window.resultModel.get('props'),device.get('props'));
                window.resultModel.set('props',props);

                var aPacks = _.union(window.resultModel.get('additionalPackages'),device.get('additionalPackages'));
                window.resultModel.set('additionalPackages',aPacks);

            });




            this.updatePackageProps();

            //find enabled additional packages
            this.findAdditionalPackages();

            this.updateChangeTime();

        },

        updateChangeTime : function()
        {
            var d = new Date();
            this.set('changeTime', d.getTime() );
        },

        findAdditionalPackages : function(){



            //selected on the form
            var selectedProps = window.filterModel.get('additionalProps');

            var packages = this.get('packages');

            if( packages.length ) {

                var enabledPackages = packages.filterHasProps(selectedProps);
                console.log('selected Props',selectedProps,packages);
                console.log('enabledPackages',enabledPackages);

                if( enabledPackages.length ) {
                    this.set('enabledPackages',enabledPackages);
                }
            }

        },


        updatePackageProps : function(){
            var packs = this.get('additionalPackages');
            console.log('Packs Updated',packs);
            if( packs.length == 0 ) {
                this.set('packages',false);
                return false;
            }

            //filter packages models from collection

            VektorChooser.resultAdditionalPackages = VektorChooser.additionalPackages.byNameList(packs);

            //new collection from the list
            VektorChooser.resultAdditionalPackages = new VektorChooser.AdditionalPackageCollection(VektorChooser.resultAdditionalPackages);


            this.set('packages',VektorChooser.resultAdditionalPackages);


            var packages = this.get('packages');

            //now update package property list
            packages.forEach(function(pack,index,list){

                var additionalProps = _.union(window.resultModel.get('additionalProps'),pack.get('props'));


                window.resultModel.set('additionalProps',additionalProps);

            });

        }







    });

}());