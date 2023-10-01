import axios from "axios";
import { sha256 } from "js-sha256";

class eSchool {
	readonly username: string;
	readonly password: string;
	readonly token: string;

	constructor(username: string, password: string) {
		this.username = username;
		this.password = password;
		this.token = "";
	}

	/**
	 * Get JSESSIONID. It is used to auth your requests
	 * @returns {Promise<string>} JSESSIONID
	 */
	public async getSessionId(): Promise<string> {
		const FormData = require("form-data");

		const form = new FormData();
		form.append("username", this.username);
		form.append("password", sha256(this.password));
		form.append(
			"device",
			`{
                cliType: "web",
                cliVer: "0.0.0",
                pushToken: "@@@@@@@@@@@@@@@@@@@Lorem ipsum dolor sit amet@@@@@@@@@@@@@@@@@@@",
                deviceName: "a can of Pepsi",
                deviceModel: "no sugar",
                cliOs: "astra linux",
                cliOsVer: null
		    }`
		);

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
