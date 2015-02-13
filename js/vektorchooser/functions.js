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

    //add properties of devices to models props
    VektorChooser.devices.forEach(function(device){
        var packageList = device.get('additionalPackages');
        if( packageList.length == 0 ) { return device;}

        var packages = VektorChooser.additionalPackages.byNameList(packageList);

        packages.forEach(function(pack,index,list){

            device.setProps(pack.get('props'));

        });
        return device;
    });

}

function vektorModelsInit()
{
    dataModel = new VektorChooser.DataModel();
    filterModel = new VektorChooser.FilterModel();
    resultModel = new VektorChooser.ResultModel();
}

//is it a props or additionalProp or not at all
function vektorDetectPropertyType(item)
{
    if( _.indexOf(dataModel.get('props'),item) > -1 ) {
        return 'props';
    }
    if( _.indexOf(dataModel.get('additionalProps'),item) > -1 ) {
        return 'additionalProps';
    }
    return false;
}