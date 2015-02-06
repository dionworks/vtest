var VektorChooser = VektorChooser || {};


var dataModel,filterModel,resultModel;

//gets filtered collection, and forms a new temporary collection
function vektorResultDevices(models){
    VektorChooser.resultDevices = new VektorChooser.DeviceCollection(models);
}

function vSearch(filterModel)
{

    jQuery('#result-area').html('<h1>Araçlar<h1>');

    VektorChooser.resultDevices = VektorChooser.devices;

    var filters = filterModel.get('filters');

    _.each(filters,function(v,k){

        VektorChooser.filteredDevices = VektorChooser.resultDevices.filterBy(v.key, v.value);
        console.log(v,k);

        vektorResultDevices(VektorChooser.filteredDevices);
    });


    VektorChooser.resultDevices.forEach(function(v,k){
        console.log(k, v.get('name'));

        jQuery('#result-area').append('<h2>'+v.get('name')+'<h2>');
    });


    //Trigger result model changes with device collection
    VektorChooser.events.trigger('result.update',VektorChooser.resultDevices);
}

(function () {
    'use strict';

    var ourObject = {};



    VektorChooser.deviceList = {};

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

        //init collection
        VektorChooser.devices = new VektorChooser.DeviceCollection;

        //add devices to the collection
        _.each(VektorChooser.deviceList,function(obj,key,list) {

            VektorChooser.devices.add(obj);

        });


        dataModel = new VektorChooser.DataModel();
        filterModel = new VektorChooser.FilterModel();
        resultModel = new VektorChooser.ResultModel();


        VektorChooser.currentView.form = new VektorChooser.FormView(dataModel,filterModel,resultModel);


        //search test



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


        getPageByOrder: function (order) {
            return this.filter(function (page) {
                return page.get('globalOrder') == order;
            });
        },

        //if item is array, look through
        filterBy: function (filter, value) {
            return this.filter(function (page) {

                var prop = page.get(filter);

                //console.log('dev col',filter,page,prop,value);

                if( _.isArray(prop) ) {
                    return (_.indexOf(prop, value) >= 0)? true : false;
                } else {

                    return page.get(filter) == value;
                }

            });
        },

        /**
         * Gets the page where isCurrent true
         * @returns {Array|*}
         */
        getCurrentPage: function () {
            return this.filter(function (page) {
                return page.get('isCurrent') == true;
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
            //name of additionalPackages like ViV, VSense etc.
            additionalProps : []
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
            additionalProps : [],
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

            props : []
        },


        initialize: function() {

            this.updateChangeTime();

            this.on('change:filters', this.setFilters);
        },

        resetFiltersTypes : function(items){
            this.set('vehicleTypes',[]);
            this.set('props',[]);
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

            //console.log(this,M,filter.key,filter.value);

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

            changeTime : '',

            vehicleTypes : [],

            props : []
        },


        initialize: function() {

            this.on('change:devices', this.setResults);
        },

        resetModel : function(items){
            //this.set('results',false);
            this.set('vehicleTypes',[]);
            this.set('props',[]);
        },

        setResults : function(){

            var devices = this.get('devices');
            console.log(devices);
            if( !devices ) {
                return false;
            }


            this.resetModel();



            devices.forEach(function(device,index,list){

                var props = _.union(window.resultModel.get('props'),device.get('props'));

                window.resultModel.set('props',props);

            });


            this.updateChangeTime();

        },

        updateChangeTime : function()
        {
            var d = new Date();
            this.set('changeTime', d.getTime() );
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
            additionalProps : []

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
        ]

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
            additionalProps : ['Yakıt Tüketim Raporu', 'Sürüş Analizi', 'Gerçek KM Takibi']

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
            additionalProps : []

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
            additionalProps : []

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
                jQuery('.vc-filter-item--props').attr('checked',false);
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

