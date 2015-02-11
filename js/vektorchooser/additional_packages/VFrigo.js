var VektorChooser = VektorChooser || {};


(function() {
    'use strict';

    // BaseDevice Model, other device models will be extended from this
    // ----------


    VektorChooser.additionalPackageList.VFrigo = new VektorChooser.AdditionalPackageModel.extend({

        defaults: {
            //name of device
            name : 'VFrigo',
            //type of vehicles available
            vehicleTypes : ['VMax'],
            //default props are given
            props : ['Carrier','ThermoKing']
        }








    });

}());