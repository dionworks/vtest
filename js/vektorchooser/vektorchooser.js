var VektorChooser = VektorChooser || {};

//define variables
var dataModel, filterModel, resultModel;


VektorChooser.deviceList = {};
VektorChooser.additionalPackageList = {};
VektorChooser.currentView = {};

VektorChooser.defaultProps = [
    'Konum Takibi',
    'Yolculuk Raporu',
    'Anlık Uyarılar',
    'Kural Tanımlama',
    'Geçmiş Konumlar',
    'Kendi Haritanı Yarat',
    'Mesai İçi ve Dışı Kullanım',
    'Rota Takibi',
    'Otomatik Raporlama'
];


jQuery(function ($) {

    //init. collections and add device and package models into them
    vektorInit();

    //init dataModel, filterModel, resultModel which will be used in view
    vektorModelsInit();

    VektorChooser.currentView.form = new VektorChooser.FormView(dataModel, filterModel, resultModel);

});



