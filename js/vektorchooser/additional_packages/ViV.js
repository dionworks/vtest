var VektorChooser = VektorChooser || {};


(function() {
    'use strict';

    // BaseDevice Model, other device models will be extended from this
    // ----------


    VektorChooser.additionalPackageList.ViV = new VektorChooser.AdditionalPackageModel.extend({

        defaults: {
            //name of device
            name : 'ViV',
            //type of vehicles available
            vehicleTypes : ['VFleet','VFleet CAN','VMax'],
            //default props are given
            props : ['Mesajlaşma','Navigasyon','Görev Atama']
        }


    });

}());