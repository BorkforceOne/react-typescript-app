import axios, {AxiosResponse} from "axios";
import "./Something";

class _DataNexusService {
    constructor() {

    }

    async getData(remoteUrl: string) : Promise<AxiosResponse> {
        let result = await axios.get(remoteUrl);
        console.log(result);
        return result;
    }
}

export const DataNexusService = new _DataNexusService();