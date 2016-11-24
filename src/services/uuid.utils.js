class UuidUtils {

    extract(id) {
        return id.replace('http://api.ft.com/things/', '');
    }

}

export default new UuidUtils();