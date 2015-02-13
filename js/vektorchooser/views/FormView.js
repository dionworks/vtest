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
                jQuery('.vc-filter-item--props,.vc-filter-item--package').attr('checked',false);
            }

            var filters = [];

            jQuery('.vc-filter-item:checked,.vc-filter-item:selected').each(function(){
                var $item = jQuery(this);

                var filterType = $item.data('filter');
                var filterValue = $item.val();

                //hack for additional filters
                if( $item.data('additional') == 'yes' ) {
                    filters.push({key:'additionalProps',value:filterValue});
                }

                var data = {
                    key: filterType,
                    value : filterValue
                };

                filters.push(data);


            });


            this.filterModel.set('filters',filters);
        }




    });

