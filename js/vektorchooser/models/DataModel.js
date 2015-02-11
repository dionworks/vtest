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
            //properties of additionalPackages like ViV, VSense etc.
            additionalProps : [
                'Mesajlaşma',
                'Navigasyon',
                'Görev Atama',
                'Isı',
                'Depo',
                'Menhol',
                'Vana/Sayaç',
                'Kapı',
                'Sürücü',
                'Carrier',
                'ThermoKing',
                'Uzaktan Veri İndirme',
                'Günlük Sürüş Saati Takibi',
                'Treyler ID'

            ]
        },


        initialize: function() {



        }






    });

}());