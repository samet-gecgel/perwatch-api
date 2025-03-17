export const ERROR_MESSAGES = {
    VALIDATION: {
        // User validasyonları
        USER: {
            NAME: {
                REQUIRED: "İsim zorunludur",
                MIN: "İsim en az 3 karakter olmalıdır"
            },
            EMAIL: {
                REQUIRED: "Email zorunludur",
                INVALID: "Geçerli bir email adresi giriniz",
                EXISTS: "Bu email adresiyle daha önce kayıt olunmuştur"
            },
            PASSWORD: {
                REQUIRED: "Şifre zorunludur",
                MIN: "Şifre en az 6 karakter olmalıdır",
                SAME: "Eski şifre yeni şifre ile aynı olamaz"
            }
        },
        // Post validasyonları
        POST: {
            TITLE: {
                REQUIRED: "Başlık zorunludur",
                MIN: "Başlık en az 3 karakter olmalıdır",
                MAX: "Başlık en fazla 100 karakter olmalıdır"
            },
            CONTENT: {
                REQUIRED: "İçerik zorunludur",
                MIN: "İçerik en az 10 karakter olmalıdır"
            },
            TAGS: {
                REQUIRED: "Etiketler zorunludur",
                MIN: "En az bir etiket olmalıdır",
                INVALID: "Etiketler dizi olmalıdır"
            },
            AUTHOR: {
                REQUIRED: "Yazar zorunludur",
                INVALID_FORMAT: "Geçersiz yazar ID formatı",
                NOT_FOUND: "Belirtilen yazar bulunamadı",
            }
        },
        // Genel validasyon mesajları
        GENERAL: {
            REQUIRED: "Bu alan zorunludur",
            MIN_ONE_FIELD: "En az bir alan güncellenmelidir"
        }
    },

    // Veritabanı hataları
    DATABASE: {
        CONNECTION_SUCCESS: "Veritabanı bağlantı başarılı",
        CONNECTION_ERROR: "Veritabanı bağlantı hatası",
        DISCONNECTED: "Veritabanı bağlantısı koptu",
        RECONNECTED: "Veritabanı tekrar bağlandı",
        MONGO_URI_NOT_FOUND: "Mongo URI bulunamadı"
    },

    // User işlem hataları
    USER: {
        NOT_FOUND: "Kullanıcı bulunamadı",
        CREATE_ERROR: "Kullanıcı oluşturma hatası",
        UPDATE_ERROR: "Kullanıcı güncelleme hatası",
        DELETE_ERROR: "Kullanıcı silme hatası",
        GET_ERROR: "Kullanıcıları alma hatası",
        PASSWORD_COMPARE_ERROR: "Şifre karşılaştırma hatası"
    },

    // Post işlem hataları
    POST: {
        NOT_FOUND: "Gönderi bulunamadı",
        CREATE_ERROR: "Gönderi oluşturma hatası",
        UPDATE_ERROR: "Gönderi güncelleme hatası",
        DELETE_ERROR: "Gönderi silme hatası",
        GET_ERROR: "Gönderileri alma hatası",
        GET_BY_USER_ERROR: "Kullanıcıya ait gönderileri alma hatası",
        GET_BY_TAG_ERROR: "Etikete ait gönderileri alma hatası",
        NOT_FOUND_FOR_TAG: "Bu etikete ait gönderi bulunamadı"
    },

    // Genel sistem hataları
    SYSTEM: {
        SERVER_STARTED: "Sunucu başlatıldı",
        SERVER_ERROR: "Sunucu hatası",
        NOT_FOUND: "Sayfa bulunamadı",
        VALIDATION_ERROR: "Doğrulama hatası",
        UNHANDLED_ERROR: "Beklenmeyen bir hata oluştu"
    }
};

export const SUCCESS_MESSAGES = {
    // User başarı mesajları
    USER: {
        CREATED: "Kullanıcı başarıyla oluşturuldu",
        UPDATED: "Kullanıcı başarıyla güncellendi",
        DELETED: "Kullanıcı başarıyla silindi",
        LISTED: "Kullanıcılar başarıyla listelendi"
    },

    // Post başarı mesajları
    POST: {
        CREATED: "Gönderi başarıyla oluşturuldu",
        UPDATED: "Gönderi başarıyla güncellendi",
        DELETED: "Gönderi başarıyla silindi",
        LISTED: "Gönderiler başarıyla listelendi"
    },

    // Sistem başarı mesajları
    SYSTEM: {
        SERVER_STARTED: "Sunucu başlatıldı",
        DB_CONNECTED: "Veritabanı bağlantısı başarılı"
    }
};

export const LOG_MESSAGES = {
    // User log mesajları
    USER: {
        CREATE_ERROR: "Kullanıcı oluşturma hatası",
        UPDATE_ERROR: "Kullanıcı güncelleme hatası",
        DELETE_ERROR: "Kullanıcı silme hatası",
        GET_ERROR: "Kullanıcıları alma hatası",
        PASSWORD_ERROR: "Şifre karşılaştırma hatası"
    },

    // Post log mesajları
    POST: {
        CREATE_ERROR: "Post oluşturma hatası",
        UPDATE_ERROR: "Post güncelleme hatası",
        DELETE_ERROR: "Post silme hatası",
        GET_ERROR: "Postları alma hatası",
        GET_BY_USER_ERROR: "Kullanıcıya ait postları alma hatası",
        GET_BY_TAG_ERROR: "Etikete ait postları alma hatası"
    },

    // Sistem log mesajları
    SYSTEM: {
        SERVER_START: "Sunucu başlatıldı",
        SERVER_ERROR: "Sunucu başlatılırken hata oluştu",
        UNHANDLED_ERROR: "Yakalanmamış Hata"
    }
};