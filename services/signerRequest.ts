import { apiRequest } from '../utils/apiRequest';
import { CreateSigner } from './api';
import { ENDPOINT } from '../utils/conts';

export async function createSigner(data: CreateSigner) {
  return apiRequest({
    method: 'POST',
    url: `${ENDPOINT.SIGNER}`,
    data: {
      data
    }
  });
}

export async function updateSigner(id: string, data: CreateSigner) {
  return apiRequest({
    method: 'PUT',
    url: `${ENDPOINT.SIGNER}/${id}`,
    data: {
      data
    }
  });
}

export async function getSignerList() {
  return apiRequest({
    method: 'GET',
    url: `${ENDPOINT.SIGNER}`,
  });
}
