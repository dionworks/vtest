

    <script type="text/template" id="form-template">
        <div class="mecmua-widget-prices">
            <h1>FORM</h1>

            <div class="vc-vehicle-types" style="width:30%;display:block;float:left;">
                <h2>Araç Tipleri</h2>
                <% _.each( data.vehicleTypes,function(element, index, list){  %>
                <div>

                    <label>


                        <input type="radio" name="vehicleType"
                        <% if (_.indexOf(filter.vehicleTypes,element) >= 0) { %>
                        checked="checked"
                        <% } %>
                        data-filter="vehicleTypes" class="vc-filter-item vc-filter-item--vehicleType" value="<%=element%>"/>
                        <%=element%>
                    </label>
                </div>
                <% }); %>
            </div>
            <% if( filter.vehicleTypes.length ) { %>
            <div class="vc-prop-list" style="width:68%;display:block;float:left;">
                <h2>Özellikler</h2>
                <% _.each( data.props,function(element, index, list){  %>
                <div style="width:49%;display:block;float:left;">

                    <label>
                        <input type="checkbox" data-filter="props"
                        <% if (_.indexOf(filter.props,element) >= 0) { %>
                        checked="checked"
                        <% } %>

                        <% if (result.props.length && _.indexOf(result.props,element) == -1) { %>
                        disabled="disabled"
                        <% } %>
                               class="vc-filter-item vc-filter-item--props" value="<%=element%>"/>
                        <span
                        <% if (result.props.length && _.indexOf(result.props,element) == -1) { %>
                        style="text-decoration: line-through;"
                        <% } %>
                            ><%=element%></span>
                    </label>
                </div>
                <% }); %>

                <% _.each( data.additionalProps,function(element, index, list){  %>
                <div style="width:49%;display:block;float:left;">

                    <label>
                        <input type="checkbox" data-filter="props" data-additional="yes"
                        <% if (_.indexOf(filter.props,element) >= 0) { %>
                        checked="checked"
                        <% } %>

                        <% if (result.props.length && _.indexOf(result.props,element) == -1) { %>
                        disabled="disabled"
                        <% } %>
                        class="vc-filter-item vc-filter-item--props" value="<%=element%>"/>
                        <span
                        <% if (result.props.length && _.indexOf(result.props,element) == -1) { %>
                        style="text-decoration: line-through;"
                        <% } %>
                        ><%=element%></span>
                    </label>
                </div>
                <% }); %>
            </div>
            <% } %>
        </div>
    </script>
