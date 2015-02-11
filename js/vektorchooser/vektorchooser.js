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

