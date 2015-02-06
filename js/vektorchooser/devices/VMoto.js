var VektorChooser = VektorChooser || {};


(function() {
    'use strict';

    // BaseDevice Model, other device models will be extended from this
    // ----------

    VektorChooser.deviceList.VMoto = new VektorChooser.DeviceModel({

            name : 'VMoto',
            //type of vehicles available
            vehicleTypes : ['Motorsiklet'],
            //default props are given
            props : [

            ],
            //name of additionalPackages like ViV, VSense etc.
            additionalProps : []

    });

}());