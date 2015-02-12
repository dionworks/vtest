var VektorChooser = VektorChooser || {};


(function() {
    'use strict';

    // BaseDevice Model, other device models will be extended from this
    // ----------


    VektorChooser.additionalPackageList.VTrailer = new VektorChooser.AdditionalPackageModel({

        //name of device
        name : 'VTrailer',
        //type of vehicles available
        devices : ['VFleet CAN'],
        //default props are given
        props : ['Treyler ID']










    });

}());