var VektorChooser = VektorChooser || {};


(function() {
    'use strict';

    // Contains all the data to filter
    // ----------


    VektorChooser.DataModel = Backbone.Model.extend({

        defaults: {

            //type of vehicles available
            vehicleTypes : [
                'Binek-Hafif Ticari',
                'Ağır Vasıta',
                'Frigo Treyler',
                'Portatif',
                'Motorsiklet'
            ],
            //default props are given
            props : [
                'Konum Takibi',
                'Yolculuk Raporu',
                'Anlık Uyarılar',
                'Kural Tanımlama',
                'Geçmiş Konumlar',
                'Kendi Haritanı Yarat',
                'Mesai İçi ve Dışı Kullanım',
                'Rota Takibi',
                'Otomatik Raporlama',
                'Yakıt Tüketim Raporu',
                'Sürüş Analizi',
                'Gerçek KM Tüketim',
                'Tak-Çalıştır',
                'Kablolu Montaj',
                'Taşınabilir'

            ],
            //name of additionalPackages like ViV, VSense etc.
            additionalProps : []
        },


        initialize: function() {



        }






    });

}());