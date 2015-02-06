//example query function
function DeviceQuery()
{
    this.props = [];
    this.vehicleTypes = [];
    this.additionalProps = [];
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

    this.findVehicleTypes = function()
    {
        var current = this;
        //look for vehicle type
        _.each(this.devices,function(device, key, list){

            var intersect = _.intersection( device.vehicleTypes, current.vehicleTypes );

            console.log(key,intersect);

        });
    };

    this.results = null;

    this.findAdditionalProps = function()
    {
        var current = this;
        //look for vehicle type
        _.each(this.devices,function(device, key, list){

            var intersect = _.intersection( device.additionalProps, current.additionalProps );

            console.log(key,intersect);

        });
    };

    this.results = null;
}


var query = new DeviceQuery();

//assign devices object
query.devices = VektorDevices;

//add a property to query
//query.props.push('Tak-Çalıştır');

query.vehicleTypes.push('Binek-Hafif Ticari');

//query.find();
query.findVehicleTypes();
