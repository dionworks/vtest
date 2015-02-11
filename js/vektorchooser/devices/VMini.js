var VektorChooser = VektorChooser || {};


(function() {
    'use strict';

    // BaseDevice Model, other device models will be extended from this
    // ----------

    VektorChooser.deviceList.VMini = new VektorChooser.DeviceModel({

            name : 'VMini',
            //type of vehicles available
            vehicleTypes : ['Portatif'],
            //default props are given
            props : [
                'Taşınabilir'
            ],
            //name of additionalPackages like ViV, VSense etc.
            additionalPackages : []

    });

}());