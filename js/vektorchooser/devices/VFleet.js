var VektorChooser = VektorChooser || {};


(function() {
    'use strict';

    // BaseDevice Model, other device models will be extended from this
    // ----------

    VektorChooser.deviceList.VFleet = new VektorChooser.DeviceModel({

        //name of device
        name : 'VFleet',
        //type of vehicles available
        vehicleTypes : [
            'Binek-Hafif Ticari',
            'Ağır Vasıta'
        ],
        //default props are given
        props : [
            'Kablolu Montaj'
        ],
        //name of additionalPackages like ViV, VSense etc.
        additionalProps : [
            'Mesajlaşma',
            'Navigasyon',
            'Görev Atama',
            'Isı',
            'Depo',
            'Menhol',
            'Vana/Sayaç',
            'Kapı',
            'Sürücü'
        ]

    });

}());