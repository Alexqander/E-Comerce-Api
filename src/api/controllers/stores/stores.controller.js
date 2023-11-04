import {
  findAllStoresPage,
  findStoreInfo
} from '../../services/stores.service.js';
import { getResponse200, getResponse500 } from '../../../helpers/Responses.js';

export const getStores = async (req, res) => {
  const { page, limit } = req.query;
  const {
    error: errorConsult,
    data: dataConsult,
    message: messageConsult
  } = await findAllStoresPage(page, limit);
  return errorConsult
    ? getResponse500(res, { messageConsult, dataConsult })
    : getResponse200(res, dataConsult);
};
export const getStoreInfo = async (req, res) => {
  const { id } = req.params;
  const {
    error: errorConsult,
    data: dataConsult,
    message: messageConsult
  } = await findStoreInfo(id);
  return errorConsult
    ? getResponse500(res, { messageConsult, dataConsult })
    : getResponse200(res, dataConsult);
};
