import axios from "axios";
import authHeader from "./authHeader";

const OFFICE_REST_API_URL = "http://localhost:8080/offices";

class OfficeService {
  getAllOffices() {
    return axios.get(OFFICE_REST_API_URL + "", { headers: authHeader() });
  }

  save(office) {
    return axios.post(OFFICE_REST_API_URL + "/add-office", office, {
      headers: authHeader(),
    });
  }

  getOfficeById(id) {
    return axios.get(OFFICE_REST_API_URL + "/" + id, { headers: authHeader() });
  }

  deleteOffice(id) {
    return axios.delete(OFFICE_REST_API_URL + "/" + id, {
      headers: authHeader(),
    });
  }

  update(id, office) {
    return axios.put(OFFICE_REST_API_URL + "/edit-office/" + id, office, {
      headers: authHeader(),
    });
  }
}

export default new OfficeService();