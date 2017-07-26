class UuidUtils {

    extract(id) {
        if (id.indexOf('http') > -1) {
	        return id.replace('http://api.ft.com/things/', '');
        }
        return id;
    }

}

export default new UuidUtils();
