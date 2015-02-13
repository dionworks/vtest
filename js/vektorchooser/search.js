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



        VektorChooser.filteredDevices = VektorChooser.resultDevices.filterBy(v.key, v.value);

        vektorResultDevices(VektorChooser.filteredDevices);
    });


    //Trigger result model changes with device collection
    VektorChooser.events.trigger('result.update',VektorChooser.resultDevices);


    //TODO: should be in a view
    //write results to page
    VektorChooser.resultDevices.forEach(function(v,k){
        //console.log(k, v.get('name'));
        jQuery('#result-area').append('<h2>'+v.get('name')+'<h2>');
        if( v.get('additionalPackages').length ) {
            jQuery('#result-area').append('<h4>Uyumlu paketler: '+v.get('additionalPackages')+'<h4>');
        }
    });

    jQuery('#result-area').append('<h2>Oluru olan paketler<h2>');

    //TODO: should be in a view
    //write results to page
    VektorChooser.resultAdditionalPackages.forEach(function(v,k){
        //console.log(k, v.get('name'));
        //jQuery('#result-area').append('<h4>- '+v.get('name')+'<h4>');
    });



}


function vektorSearch(filterModel)
{

    this.filters  = filterModel.get('filters');

    this.resultDevices = null;

    this.init = function(){
        //copy device list for result purposes
        VektorChooser.resultDevices = VektorChooser.devices;

        //add filters to the filtered model
        this.applyFilters();
        this.setResultView();
    }

    //add filters to the filtered model
    this.applyFilters = function() {
        _.each(this.filters,function(v,k){

            if(v.key == 'additionalProps') {
                return false;
            }

            //filter
            VektorChooser.resultDevices = VektorChooser.resultDevices.filterBy(v.key, v.value);

            //make a new collection
            VektorChooser.resultDevices = new VektorChooser.DeviceCollection(VektorChooser.resultDevices);

        });

        console.log('Device List',VektorChooser.resultDevices);

        //pass final device collection to update view
        VektorChooser.events.trigger('result.update',VektorChooser.resultDevices);

    }

    this.setResultView = function(){


        var $area = jQuery('#result-area');

        $area.html('<h1>Araçlar</h1>');



        //TODO: should be in a view
        //write results to page
        VektorChooser.resultDevices.forEach(function(v,k){
            //console.log(k, v.get('name'));
            $area.append('<h2>'+v.get('name')+'</h2>');
            if( v.get('additionalPackages').length ) {
                $area.append('<h4>Uyumlu paketler: '+v.get('additionalPackages')+'</h4>');
            }
            $area.append('<p>Özellikler: '+v.get('props')+'</p>');



        });

        var enabledPackages = resultModel.get('enabledPackages');


        if( enabledPackages.length ) {
            $area.append('<h1>Kullanılabilir paketler:</h1>');

            enabledPackages.forEach(function(v,k){

                $area.append('<h2>Kullanılabilir paketler: '+v.get('name')+'</h2>');
            });
        }
    }








}
