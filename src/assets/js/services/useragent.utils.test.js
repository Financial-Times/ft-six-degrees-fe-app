import UserAgentUtils from './useragent.utils';

describe('UserAgentUtils', () => {

    describe('isMobile', () => {

        it('correctly detects mobile devices by OS provided in user agent string', () => {
            const examplesOfMobileUserAgentStrings = [
                'Mozilla/5.0 (Linux; U; Android 4.0.3; ko-kr; LG-L160L Build/IML74K) AppleWebkit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30',
                'Mozilla/5.0 (BlackBerry; U; BlackBerry 9800; en-GB) AppleWebKit/534.1+ (KHTML, like Gecko) Version/6.0.0.337 Mobile Safari/534.1+',
                'Opera/9.80 (J2ME/MIDP; Opera Mini/9 (Compatible; MSIE:9.0; iPhone; BlackBerry9700; AppleWebKit/24.746; U; en) Presto/2.5.25 Version/10.54',
                'Mozilla/4.0 (compatible; Windows Mobile; WCE; Opera Mobi/WMD-50433; U; de) Presto/2.4.13 Version/10.00',
                'HTC_Touch_3G Mozilla/4.0 (compatible; MSIE 6.0; Windows CE; IEMobile 7.11)',
                'Mozilla/5.0 (iPad; CPU OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5355d Safari/8536.25',
                'iPhone', 'iPad', 'iPod'
            ];

            examplesOfMobileUserAgentStrings.map(uaString => {
                return expect(UserAgentUtils.isMobile(uaString)).toEqual(true);
            });

        });

        it('correctly detects non-mobile devices by OS provided in user agent string', () => {
            const examplesOfNonMobileUserAgentStrings = [
                'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36',
                'Mozilla/5.0 (Windows NT 6.2; Win64; x64; rv:27.0) Gecko/20121011 Firefox/27.0',
                'Mozilla/5.0 (compatible; MSIE 10.6; Windows NT 6.1; Trident/5.0; InfoPath.2; SLCC1; .NET CLR 3.0.4506.2152; .NET CLR 3.5.30729; .NET CLR 2.0.50727) 3gpp-gba UNTRUSTED/1.0',
                'Opera/9.80 (Windows NT 6.1; U; es-ES) Presto/2.9.181 Version/12.00',
                'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/537.13+ (KHTML, like Gecko) Version/5.1.7 Safari/534.57.2'
            ];

            examplesOfNonMobileUserAgentStrings.map(uaString => {
                return expect(UserAgentUtils.isMobile(uaString)).toEqual(false);
            });

        });

    });

    describe('browserDetails', () => {
        const osToCheck = {
            'Windows': [
                'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36',
                'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0; Touch)',
                'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)',
                'Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; rv:11.0) like Gecko',
                'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0; Xbox; Xbox One)'
            ],
            'MacOS': [
                'Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en) AppleWebKit/124 (KHTML, like Gecko) Safari/125',
                'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_3) AppleWebKit/534.53.11 (KHTML, like Gecko) Version/1.1.6 Browser/1.2',
                'Mozilla/5.0 (Macintosh; PPC Mac OS X 10_5_8) AppleWebKit/534.50.2 (KHTML, like Gecko) Version/5.0.3 Safari/533.19.4',
                'Mozilla/5.0 (Macintosh; U; PPC Mac OS X 10_4_11; en) AppleWebKit/533.19.4 (KHTML, like Gecko) Version/4.1.3 Safari/533.19.4'
            ],
            'Android': [
                'Mozilla/5.0 (Linux; Android 4.0.4; Galaxy Nexus Build/IMM76B) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.133 Mobile Safari/535.19'
            ]
        };

        it('correctly detects OS', () => {
            let os;

            function check(os) {
                os.map(uaString => {
                    return expect(UserAgentUtils.browserDetails(uaString).OS === os);
                });
            }

            for (os in osToCheck) {
                if (osToCheck.hasOwnProperty(os)) {
                    check(osToCheck[os]);
                }
            }
        });
    });

});