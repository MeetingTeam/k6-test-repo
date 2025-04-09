import http from 'k6/http';
import { check } from 'k6';

export let options = {
  vus: 1000,
  iterations: 1000
};

export default function () {
          const url = 'http://frontend-service/login';
        
          // Make the GET request
          let res = http.get(url);

          // Check response status
          check(res, { 'status was 200': (r) => r.status === 200 });
}