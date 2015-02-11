var VektorChooser = VektorChooser || {};


(function() {
    'use strict';

    // BaseDevice Model, other device models will be extended from this
    // ----------


    VektorChooser.additionalPackageList.VTacho = new VektorChooser.AdditionalPackageModel.extend({

        defaults: {
            //name of device
            name : 'VTacho',
            //type of vehicles available
            vehicleTypes : ['VFleet CAN'],
            //default props are given
            props : ['Uzaktan Veri İndirme','Günlük Sürüş Saati Takibi']
        }








    });

}());