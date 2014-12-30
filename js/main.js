//device container
//and device added will be new Device objects
var VektorDevices = {
    VFleet: new Device(),
    VDriveLite: new Device(),
    VFleetCan: new Device(),
    VDrive: new Device(),
    VMax: new Device(),
    VMoto: new Device(),
    VMini: new Device()
};


console.log(VektorDevices.VFleetCan.props);


//example query function
function DeviceQuery()
{
    this.props = [];
    this.devices = false;

    this.find = function()
    {
        var current = this;
        //look for props
        _.each(this.devices,function(device, key, list){

            var intersect = _.intersection( device.props,current.props );

            console.log(key,intersect);

        });
    };

    this.results = null;
}


var query = new DeviceQuery();

//assign devices object
query.devices = VektorDevices;

//add a property to query
query.props.push('Tak-Çalıştır');

query.find();
