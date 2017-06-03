import axios, {AxiosResponse} from "axios";

class _DataNexusService {
    async getData(remoteUrl: string) : Promise<AxiosResponse> {
        return axios.get(remoteUrl)
    }
}

export const DataNexusService = new _DataNexusService();