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

