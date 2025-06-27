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
  async deleteDataPayload(payload, url) {
    return this.request.delete(this.getServiceUrl(url), {
      data: payload,
    });
  }
  async uploadFile(payload, url) {
    const formData = new FormData();
    formData.append("file", payload.file);
    formData.append("fileName", payload.fileName);
    return this.request.post(this.getServiceUrl(url), formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  async uploadProfile(payload, url) {
    const formData = new FormData();
    formData.append("file", payload.file);
    return this.request.patch(this.getServiceUrl(url), formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
}

export default new HttpService();
