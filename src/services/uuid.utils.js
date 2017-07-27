class UuidUtils {

    extract(id = '') {
        if (id.length > 36) {
            return id.substring(id.lastIndexOf('/') + 1);
        }
        return id;
    }

}

export default new UuidUtils();
