var VektorChooser = VektorChooser || {};


(function() {
    'use strict';

    // BaseDevice Model, other device models will be extended from this
    // ----------

    VektorChooser.deviceList.VDrive = new VektorChooser.DeviceModel({

            name : 'VDrive',
            //type of vehicles available
            vehicleTypes : ['Binek-Hafif Ticari','Ağır Vasıta'],
            //default props are given
            props : [
                'Tak-Çalıştır',
                'Yakıt Tüketim Raporu',
                'Sürüş Analizi',
                'Gerçek KM Tüketim'
            ],
            //name of additionalPackages like ViV, VSense etc.
            additionalProps : []

    });

}());