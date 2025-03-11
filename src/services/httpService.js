import axios from "axios";
import { useRequest } from "@/hooks/use-request";

class HttpService {
  constructor() {
    this.request = useRequest();
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL;
  }

  getServiceUrl(url) {
    return `${this.baseUrl}${url}`;
  }

  async postData(payload, url) {
    return this.request.post(this.getServiceUrl(url), payload);
  }

  async postDataWithoutToken(payload, url) {
    return axios.post(this.getServiceUrl(url), payload);
  }

  async getData(url) {
    return this.request.get(this.getServiceUrl(url));
  }

  async getDataWithoutToken(url) {
    return axios.get(this.getServiceUrl(service, url));
  }

  async putData(payload, url) {
    return this.request.put(this.getServiceUrl(url), payload);
  }

  async putDataWithoutToken(payload, url) {
    return axios.put(this.getServiceUrl(url), payload);
  }

  async patchData(payload, url) {
    return this.request.patch(this.getServiceUrl(url), payload);
  }

  async patchDataWithoutToken(payload, url) {
    return axios.patch(this.getServiceUrl(url), payload);
  }

  async deleteData(url) {
    return this.request.delete(this.getServiceUrl(url));
  }
}

export default new HttpService();
