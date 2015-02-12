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

    console.log('FILTER MODEL:',filterModel);

    //run through filters for device list
    _.each(filters,function(v,k){

        //check if its valid filter
        if(_.indexOf(VektorChooser.resultDevices.validFilters,v.key) == -1) {
            console.log('This skipped',v.key,v.value);
            return;
        }

        VektorChooser.filteredDevices = VektorChooser.resultDevices.filterBy(v.key, v.value);

        vektorResultDevices(VektorChooser.filteredDevices);
    });

    console.log('Package filters:',filterModel.get('additionalProps'));


    //run through filters for remaining packages list
    _.each(filters,function(v,k){

        //check if its valid filter
        if('additionalProps' != v.key ) {
            console.log('This skipped pack filter',v.key,v.value);
            return;
        }

        VektorChooser.filteredDevices = VektorChooser.resultAdditionalPackages.filterBy('props', v.value);

        vektorResultDevices(VektorChooser.filteredDevices);
    });


    //TODO: should be in a view
    //write results to page
    VektorChooser.resultDevices.forEach(function(v,k){
        //console.log(k, v.get('name'));
        jQuery('#result-area').append('<h2>'+v.get('name')+'<h2>');
    });


    //Trigger result model changes with device collection
    VektorChooser.events.trigger('result.update',VektorChooser.resultDevices);
}
