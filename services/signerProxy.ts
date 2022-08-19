import { apiProxy } from '../utils/apiProxy';
import { CreateSigner } from './api';

export async function createSigner(data: CreateSigner) {
  return apiProxy({
    method: 'POST',
    url: `/api/createSigner`,
    data
  });
}

export async function updateSigner(id: string, data: CreateSigner) {
  return apiProxy({
    method: 'PUT',
    url: `api/signer/${id}`,
    data
  });
}

export async function getSignerList() {
  return apiProxy({
    method: 'GET',
    url: `/api/getSigner`,
  });
}
