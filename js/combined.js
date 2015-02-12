var VektorChooser = VektorChooser || {};

//define variables
var dataModel, filterModel, resultModel;


VektorChooser.deviceList = {};
VektorChooser.additionalPackageList = {};
VektorChooser.currentView = {};

VektorChooser.defaultProps = [
    'Konum Takibi',
    'Yolculuk Raporu',
    'Anlık Uyarılar',
    'Kural Tanımlama',
    'Geçmiş Konumlar',
    'Kendi Haritanı Yarat',
    'Mesai İçi ve Dışı Kullanım',
    'Rota Takibi',
    'Otomatik Raporlama'
];


jQuery(function ($) {

    //init. collections and add device and package models into them
    vektorInit();

    //init dataModel, filterModel, resultModel which will be used in view
    vektorModelsInit();

    VektorChooser.currentView.form = new VektorChooser.FormView(dataModel, filterModel, resultModel);

});




var VektorChooser = VektorChooser || {};


function vektorInit()
{
    //init collection
    VektorChooser.devices = new VektorChooser.DeviceCollection;
    VektorChooser.additionalPackages = new VektorChooser.AdditionalPackageCollection;

    //add devices to the collection
    _.each(VektorChooser.deviceList, function (obj, key, list) {

        VektorChooser.devices.add(obj);

    });

    //add additional packages to the collection
    _.each(VektorChooser.additionalPackageList, function (obj, key, list) {

        VektorChooser.additionalPackages.add(obj);

    });

}

function vektorModelsInit()
{
    dataModel = new VektorChooser.DataModel();
    filterModel = new VektorChooser.FilterModel();
    resultModel = new VektorChooser.ResultModel();
}


var VektorChooser = VektorChooser || {};


//gets filtered collection, and forms a new temporary collection
function vektorResultDevices(models){
    VektorChooser.resultDevices = new VektorChooser.DeviceCollection(models);
}


function vSearch(filterModel)
{

    jQuery('#result-area').html('<h1>Araçlar<h1>');

    VektorChooser.resultDevices = VektorChooser.devices;
    VektorChooser.resultAdditionalPackages = VektorChooser.additionalPackages;

    //all the filters from the view
    var filters = filterModel.get('filters');

    //console.log('FILTER MODEL:',filterModel);

    //run through filters for device list
    //this will only use vehicleType and props, not additionalProps
    _.each(filters,function(v,k){

        //check if its valid filter, vehicleType or props
        if(_.indexOf(VektorChooser.resultDevices.validFilters,v.key) == -1) {
            return;
        }

        VektorChooser.filteredDevices = VektorChooser.resultDevices.filterBy(v.key, v.value);

        vektorResultDevices(VektorChooser.filteredDevices);
    });


    //Trigger result model changes with device collection
    VektorChooser.events.trigger('result.update',VektorChooser.resultDevices);

    console.log('Packages in result model:',resultModel.get('packages'));


    VektorChooser.filteredForPackages = false;

    //run through filters for remaining packages list
    _.each(filters,function(v,k){

        //check if its valid filter
        if('additionalProps' != v.key ) {
            return;
        }

        var packs = resultModel.get('packages');

        VektorChooser.resultAdditionalPackages = VektorChooser.resultAdditionalPackages.filterBy('props', v.value);

        //console.log('Filtered PACKS:',VektorChooser.filteredPackages,VektorChooser.resultAdditionalPackages);

        VektorChooser.filteredForPackages = true;
        //new collection from the list
        VektorChooser.resultAdditionalPackages = new VektorChooser.AdditionalPackageCollection(VektorChooser.resultAdditionalPackages);
    });

    //then work with result devices again to determine final versiyon
    if( !VektorChooser.resultAdditionalPackages.isEmpty() && VektorChooser.filteredForPackages ) {

        VektorChooser.resultAdditionalPackages.forEach(function(pack,key){

            var packName = pack.get('name');

            VektorChooser.filteredDevices = VektorChooser.resultDevices.filterBy('additionalPackages', packName);

            vektorResultDevices(VektorChooser.filteredDevices);
        });

    }


    //Trigger result model changes with device collection
    VektorChooser.events.trigger('result.update',VektorChooser.resultDevices);

    //TODO: should be in a view
    //write results to page
    VektorChooser.resultDevices.forEach(function(v,k){
        //console.log(k, v.get('name'));
        jQuery('#result-area').append('<h2>'+v.get('name')+'<h2>');
        jQuery('#result-area').append('<h4>'+v.get('additionalPackages')+'<h4>');
    });
    //TODO: should be in a view
    //write results to page
    VektorChooser.resultAdditionalPackages.forEach(function(v,k){
        //console.log(k, v.get('name'));
        jQuery('#result-area').append('<h4>- '+v.get('name')+'<h4>');
    });



}

var VektorChooser = VektorChooser || {};

(function () {
    'use strict';

    // Subject Collection: Collection of pages in a magazine
    // ---------------


    VektorChooser.AdditionalPackageCollection = Backbone.Collection.extend({

        // Reference to this collection's model.
        model: VektorChooser.AdditionalPackageModel,


        validFilters  : ['props','name'],



        //if item is array, look through
        filterBy: function (filter, value) {

            //check if its valid filter
            if(_.indexOf(this.validFilters,filter) == -1) {
                return false;
            }

            return this.filter(function (page) {


                var prop = page.get(filter);



                if( _.isArray(prop) ) {
                    return (_.indexOf(prop, value) >= 0)? true : false;
                } else {

                    if(_.isArray(value) ) {
                        return (_.indexOf(value,prop) >= 0)? true : false;
                    }

                    return page.get(filter) == value;
                }

            });
        },

        //if item is array, look through
        byNameList: function ( value) {

            return this.models.filter(function (page) {


                var prop = page.get('name');


                    if(_.isArray(value) ) {
                        return (_.indexOf(value, prop) >= 0);
                    }

                    return page.get(filter) == value;


            });
        }




    });



}());
var VektorChooser = VektorChooser || {};

(function () {
    'use strict';

    // Subject Collection: Collection of pages in a magazine
    // ---------------


    VektorChooser.DeviceCollection = Backbone.Collection.extend({

        // Reference to this collection's model.
        model: VektorChooser.DeviceModel,

        validFilters  : ['vehicleTypes','props','additionalPackages'],

        //if item is array, look through
        filterBy: function (filter, value) {



            return this.filter(function (page) {

                var prop = page.get(filter);


                if( _.isArray(prop) ) {
                    return (_.indexOf(prop, value) >= 0)? true : false;
                } else {

                    return page.get(filter) == value;
                }

            });
        }




    });



}());
var VektorChooser = VektorChooser || {};

(function () {
    'use strict';

    VektorChooser.events = {};
    // Mixin
    _.extend(VektorChooser.events , Backbone.Events);

    VektorChooser.events.on('device.search', function(filter){

        //to the search
        window.vSearch(filter);

    });

    VektorChooser.events.on('result.update', function(devices){

        //to the search
        resultModel.set('devices',devices);

        //console.log('In Event:',resultModel.get('additionalPackages'));

    });


}());
var VektorChooser = VektorChooser || {};


(function() {
    'use strict';

    // BaseDevice Model, other device models will be extended from this
    // ----------


    VektorChooser.AdditionalPackageModel = Backbone.Model.extend({

        defaults: {
            //name of device
            name : '',
            //type of vehicles available
            devices : [],
            //default props are given
            props : []
        },


        initialize: function() {

            //this.setProps();


        }








    });

}());
var VektorChooser = VektorChooser || {};


(function() {
    'use strict';

    // Contains all the data to filter
    // ----------


    VektorChooser.DataModel = Backbone.Model.extend({

        defaults: {

            //type of vehicles available
            vehicleTypes : [
                'Binek-Hafif Ticari',
                'Ağır Vasıta',
                'Frigo Treyler',
                'Portatif',
                'Motorsiklet'
            ],
            //default props are given
            props : [
                'Konum Takibi',
                'Yolculuk Raporu',
                'Anlık Uyarılar',
                'Kural Tanımlama',
                'Geçmiş Konumlar',
                'Kendi Haritanı Yarat',
                'Mesai İçi ve Dışı Kullanım',
                'Rota Takibi',
                'Otomatik Raporlama',
                'Yakıt Tüketim Raporu',
                'Sürüş Analizi',
                'Gerçek KM Tüketim',
                'Tak-Çalıştır',
                'Kablolu Montaj',
                'Taşınabilir'

            ],
            //properties of additionalPackages like ViV, VSense etc.
            additionalProps : [
                'Mesajlaşma',
                'Navigasyon',
                'Görev Atama',
                'Isı',
                'Depo',
                'Menhol',
                'Vana/Sayaç',
                'Kapı',
                'Sürücü',
                'Carrier',
                'ThermoKing',
                'Uzaktan Veri İndirme',
                'Günlük Sürüş Saati Takibi',
                'Treyler ID'

            ]
        },


        initialize: function() {



        }






    });

}());
var VektorChooser = VektorChooser || {};


(function() {
    'use strict';

    // BaseDevice Model, other device models will be extended from this
    // ----------


    VektorChooser.DeviceModel = Backbone.Model.extend({

        defaults: {
            //name of device
            name : '',
            //type of vehicles available
            vehicleTypes : [],
            //default props are given
            props : [],
            //name of additionalPackages like ViV, VSense etc.
            additionalPackages : [],
            additionalProps : []
        },


        initialize: function() {

            this.setProps();


        },

        setProps : function(){
            var props = VektorChooser.defaultProps;
            this.set( 'props', props.concat(this.get('props')));
        }







    });

}());
var VektorChooser = VektorChooser || {};


(function() {
    'use strict';

    // Contains all the data to filter
    // ----------


    VektorChooser.FilterModel = Backbone.Model.extend({

        defaults: {
            filters : [],

            changeTime : '',

            vehicleTypes : [],

            props : [],

            additionalProps : []
        },


        initialize: function() {

            this.updateChangeTime();

            this.on('change:filters', this.setFilters);
        },

        resetFiltersTypes : function(items){
            this.set('vehicleTypes',[]);
            this.set('props',[]);
            this.set('additionalProps',[]);
        },

        setFilters : function(){
            var filters = this.get('filters');

            this.resetFiltersTypes();


            var current = this;

            _.each(filters,function(filter,index,list){

                if(filter.key == 'vehicleTypes') {

                    current.updateFilterItem(filter,true);
                } else {
                    current.updateFilterItem(filter,false);

                }

            });

            console.log('filters now:',this.get('additionalProps'));

            this.updateChangeTime();

            //Trigger the search event with this model
            VektorChooser.events.trigger('device.search',this);
        },

        updateChangeTime : function()
        {
            var d = new Date();
            this.set('changeTime', d.getTime() );
        },

        updateFilterItem : function(filter,singleItem)
        {
            var M = this.get(filter.key);


            if(_.isArray(M) && !singleItem) {
                M.push(filter.value);
            } else {
                M = [filter.value];
            }

            this.set(filter.key,M);
        },


        search : function(){
            window.vSearch(this);


        }






    });

}());
var VektorChooser = VektorChooser || {};


(function() {
    'use strict';

    // Contains all the data to filter
    // ----------


    VektorChooser.ResultModel = Backbone.Model.extend({

        defaults: {
            //collection of devices in the results
            devices : false,

            packages : false,

            changeTime : '',

            vehicleTypes : [],

            props : [],

            additionalPackages : [],

            additionalProps : []
        },


        initialize: function() {

            this.on('change:devices', this.setResults);
            //this.on('change:additionalPackages', this.updatePackageProps);
        },

        resetModel : function(items){
            this.set('vehicleTypes',[]);
            this.set('props',[]);
            this.set('additionalPackages',[]);
            this.set('additionalProps',[]);
        },

        setResults : function(){

            var devices = this.get('devices');
            console.log(devices);
            if( !devices ) {
                return false;
            }


            this.resetModel();


            //collect all available props and additional packages from devices
            devices.forEach(function(device,index,list){

                var props = _.union(window.resultModel.get('props'),device.get('props'));
                window.resultModel.set('props',props);

                var aPacks = _.union(window.resultModel.get('additionalPackages'),device.get('additionalPackages'));
                window.resultModel.set('additionalPackages',aPacks);

            });

            console.log('RESULT Add. PACKS',this.get('additionalPackages'));


            //fill additional props through additionalPackages
            //var apacks = this.get('additionalPackages');


            this.updatePackageProps();

            this.updateChangeTime();

        },

        updateChangeTime : function()
        {
            var d = new Date();
            this.set('changeTime', d.getTime() );
        },


        updatePackageProps : function(){
            var packs = this.get('additionalPackages');
            console.log('Packs Updated',packs);
            if( packs.length == 0 ) {
                this.set('packages',false);
                return false;
            }

            //filter packages models from collection

            VektorChooser.resultAdditionalPackages = VektorChooser.additionalPackages.byNameList(packs);

            //new collection from the list
            VektorChooser.resultAdditionalPackages = new VektorChooser.AdditionalPackageCollection(VektorChooser.resultAdditionalPackages);


            this.set('packages',VektorChooser.resultAdditionalPackages);

            console.log('RES PACKS in RES',VektorChooser.resultAdditionalPackages,VektorChooser.additionalPackages);

            var packages = this.get('packages');

            //now update package property list
            packages.forEach(function(pack,index,list){

                var additionalProps = _.union(window.resultModel.get('additionalProps'),pack.get('props'));


                window.resultModel.set('additionalProps',additionalProps);

            });

        }







    });

}());
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
            additionalPackages : []

    });

}());
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
        ],

        additionalPackages : []

    });

}());
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
        additionalPackages : [
            'ViV','VSense'
        ]

    });

}());
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
            'ViV','VSense','VTacho','VTrailer'
        ]

    });

}());
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
            additionalPackages : [
                'ViV','VSense','VFrigo'
            ]

    });

}());
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
            additionalPackages : []

    });

}());
var VektorChooser = VektorChooser || {};


(function() {
    'use strict';

    // BaseDevice Model, other device models will be extended from this
    // ----------


    VektorChooser.additionalPackageList.VFrigo = new VektorChooser.AdditionalPackageModel({

            //name of device
            name : 'VFrigo',
            //type of vehicles available
            devices : ['VMax'],
            //default props are given
            props : ['Carrier','ThermoKing']








    });

}());
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
var VektorChooser = VektorChooser || {};


(function() {
    'use strict';

    // BaseDevice Model, other device models will be extended from this
    // ----------


    VektorChooser.additionalPackageList.VTacho = new VektorChooser.AdditionalPackageModel({

            //name of device
            name : 'VTacho',
            //type of vehicles available
            devices : ['VFleet CAN'],
            //default props are given
            props : ['Uzaktan Veri İndirme','Günlük Sürüş Saati Takibi']








    });

}());
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
var VektorChooser = VektorChooser || {};


(function() {
    'use strict';

    // BaseDevice Model, other device models will be extended from this
    // ----------


    VektorChooser.additionalPackageList.ViV = new VektorChooser.AdditionalPackageModel({

            //name of device
            name : 'ViV',
            //type of vehicles available
            devices : ['VFleet','VFleet CAN','VMax'],
            //default props are given
            props : ['Mesajlaşma','Navigasyon','Görev Atama']


    });

}());
var VektorChooser = VektorChooser || {};




    // Contains all the data to filter
    // ----------


    VektorChooser.FormView = Backbone.View.extend({

        tagName : 'div',

        // Cache the template function for a single item.
        template: '',


        events : {
            'change .vc-filter-item' : 'updateFilters'
        },




        initialize: function(dataModel,filterModel,resultModel) {
            _.bindAll(this, 'render');
            this.dataModel = dataModel;
            this.filterModel = filterModel;
            this.resultModel = resultModel;

            //this.listenTo(this.model, 'change:isCurrent',this.toggleCurrentItem);

            this.template = _.template( jQuery('#form-template').html() );

            this.render();

            this.dataModel.on('change', this.render);
            this.filterModel.on('change:changeTime', this.render);
            this.resultModel.on('change:changeTime', this.render);

        },

        render: function() {
            this.$el.html( this.template({
                data :this.dataModel.toJSON() ,
                filter : this.filterModel.toJSON(),
                result : this.resultModel.toJSON()
            }) );


            jQuery('#vc-form').append(this.$el);

            return this;
        },


        updateFilters : function(e){
            var $el = jQuery(e.currentTarget);
            //console.log($el.data('filter'));

            //if its a vehicle change, uncheck all of the props
            if( $el.data('filter') == 'vehicleTypes' ) {
                jQuery('.vc-filter-item--props,.vc-filter-item--package').attr('checked',false);
            }

            var filters = [];

            jQuery('.vc-filter-item:checked,.vc-filter-item:selected').each(function(){
                var $item = jQuery(this);

                var filterType = $item.data('filter');
                var filterValue = $item.val();

                var data = {
                    key: filterType,
                    value : filterValue
                };
                filters.push(data);
            });


            this.filterModel.set('filters',filters);
        }




    });

