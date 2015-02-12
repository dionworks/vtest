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
