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