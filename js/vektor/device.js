function Device(){
    this.name = "Name of Device";

    //type of vehicles available
    this.vehicleTypes = ['Binek-Hafif Ticari','Ağır Vasıta'];


    //default props are given
    this.props = [
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

    //name of additionalPackages like ViV, VSense etc.
    this.additionalProps = [];
}