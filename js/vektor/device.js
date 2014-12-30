function Device(){
    
    this.name = "";

    //type of vehicles available
    this.vehicleTypes = [];

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