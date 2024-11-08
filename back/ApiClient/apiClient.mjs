import 'dotenv/config';
import doFetch from './fetchHelper.mjs';
import { StudentResponse, SubjectResponse } from './ResponseModels.mjs';

/**
 * Provides methods to interact with the API for client-side operations.
 */
export class ApiClient {
    /**
     * Creates an instance of ApiClient.
     * @param {string} baseURL The base URL of the API.
     */
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    //region Subjects

    /**
     * Get subjects.
     * @param {Number} limit - Limit results.
     * @returns {Promise<Array<SubjectResponse>>}
     */
    async getAllSubjects(limit = undefined) {
        const url = `/subjects/all/` + (limit ? limit : ``);

        try {
            const response = await doFetch(this.baseURL, url);
            const data = await response.json();
            // error - no data
            if (!(data instanceof Array))
                return [];

            return data.map(c => new SubjectResponse(c));
        } catch (err) {
            console.error(err);
            return [];
        }
    }
}


// Initialize and export an instance of the ApiClient
const port = process.env.SERVER_PORT;
const apiClient = new ApiClient(`http://localhost:${port}`);
export default apiClient;
