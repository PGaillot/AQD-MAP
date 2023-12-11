import config from '../config.js'

const API_KEY = config.API_KEY;
const API_URL = 'https://maps.googleapis.com/maps/api/geocode/json';

export default class GeocodingApi {
    /**
     * Indiquez les adresses au format utilisé par le service postal du pays concerné.
     * Les éléments d'adresse supplémentaires, tels que les noms d'entreprise et les numéros d'unité,
     * de résidence ou d'étage, doivent être évités.
     * Les éléments d'adresse postale doivent être séparés par des espaces.
     * 
     * @param {*} address 
     */
    getCoordinateFromAddress(address) {
        const queryParams = {
            address: address,
            key: API_KEY,
        };

        const url = `${API_URL}?${new URLSearchParams(queryParams)}`;
        return new Promise(async (resolve, reject) => {
            const response = await fetch(url)
            .then(reponse => reponse.json())
            .then(data => {
                const location = data.results[0].geometry.location;
                resolve(location);
            })
            .catch((error) => reject(error))
        })
    }
}

