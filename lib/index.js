import axios from "axios";
import { sha256 } from "js-sha256";
class eSchool {
    username;
    password;
    token;
    constructor(username, password) {
        this.username = username;
        this.password = password;
        this.token = "";
    }
    /**
     * Get JSESSIONID. It is used to auth your requests
     * @returns {Promise<string>} JSESSIONID
     */
    async getSessionId() {
        const FormData = require("form-data");
        const form = new FormData();
        form.append("username", this.username);
        form.append("password", sha256(this.password));
        form.append("device", `{
                cliType: "web",
                cliVer: "should be =< 16",
                pushToken: "this message should be exactly 64 symbols so let it be 64 symbls",
                deviceName: "looks like it has no limit for сharacters ＜（＾－＾）＞",
                deviceModel: "it was number, but works with string as well =/, no limit too",
                cliOs: "iPhOnE 2077",
                cliOsVer: true
		    }`);
        return axios
            .post("https://app.eschool.center/ec-server/login", form)
            .then((res) => {
            if (res.headers["set-cookie"] != undefined) {
                return res.headers["set-cookie"][0].split(";")[0].split("JSESSIONID=")[1];
            }
            throw "Failed to parse token from cookies";
        })
            .catch((e) => {
            throw e;
        });
    }
}
export { eSchool };
export default eSchool;
