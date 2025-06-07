import http from 'k6/http';
import { check } from 'k6';

export let options = {
  vus: 100,
  iterations: 1000
};

export default function () {
        const url = 'http://user-service.default.svc.cluster.local/private/by-ids';
        const payload = JSON.stringify(["94f8f498-3071-700b-036b-8b64fc52a716","a4e804c8-60a1-7021-21ee-393fdfbe2492"])
        
        let res = http.post(url, payload);

        // Check response status
        check(res, { 'status was 200': (r) => r.status === 200 });
}