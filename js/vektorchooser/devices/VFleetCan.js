var VektorChooser = VektorChooser || {};


(function() {
    'use strict';

    // BaseDevice Model, other device models will be extended from this
    // ----------

    VektorChooser.deviceList.VFleetCan = new VektorChooser.DeviceModel({

        //name of device
        name : 'VFleet CAN',
        //type of vehicles available
        vehicleTypes : [
            'Ağır Vasıta'
        ],
        //default props are given
        props : [
            'Kablolu Montaj',
            'Yakıt Tüketim Raporu',
            'Sürüş Analizi',
            'Gerçek KM Tüketim'
        ],
        //name of additionalPackages like ViV, VSense etc.
        additionalPackages : [

        ]

    });

}());