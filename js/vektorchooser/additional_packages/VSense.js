var VektorChooser = VektorChooser || {};


(function() {
    'use strict';

    // BaseDevice Model, other device models will be extended from this
    // ----------


    VektorChooser.additionalPackageList.VSense = new VektorChooser.AdditionalPackageModel({

            //name of device
            name : 'VSense',
            //type of vehicles available
            devices : ['VFleet','VFleet CAN','VMax'],
            //default props are given
            props : ['Isı','Depo','Menhol','Vana/Sayaç','Kapı','Sürücü']



    });

}());