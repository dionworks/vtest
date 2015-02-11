var VektorChooser = VektorChooser || {};


(function() {
    'use strict';

    // BaseDevice Model, other device models will be extended from this
    // ----------

    VektorChooser.deviceList.VMax = new VektorChooser.DeviceModel({

            name : 'VMax',
            //type of vehicles available
            vehicleTypes : ['Binek-Hafif Ticari','Frigo Treyler'],
            //default props are given
            props : [
                'Kablolu Montaj',
                'Yakıt Tüketim Raporu',
                'Sürüş Analizi',
                'Gerçek KM Tüketim'
            ],
            //name of additionalPackages like ViV, VSense etc.
            additionalPackages : []

    });

}());