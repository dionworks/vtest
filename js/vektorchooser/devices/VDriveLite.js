var VektorChooser = VektorChooser || {};


(function() {
    'use strict';

    // BaseDevice Model, other device models will be extended from this
    // ----------

    VektorChooser.deviceList.VDriveLite = new VektorChooser.DeviceModel({

        name : 'VDrive Lite',
        //type of vehicles available
        vehicleTypes : [
            'Binek-Hafif Ticari'
        ],
        //default props are given
        props : [
            'Tak-Çalıştır'
        ]

    });

}());