import { IOrder, IOrderResponse, IProductList } from "../../types";
import { settings } from "../../utils/constants";
import { Api } from "../base/api";
import { IEvents } from "../base/events";

export class ApiModel {
  constructor(protected api: Api, protected events: IEvents){}

  getProductItems(): Promise<IProductList> {
    return this.api.get(settings.apiProducts)
    .then(data => data as IProductList)
  }
  
  postOrder(order: IOrder): Promise<IOrderResponse> {
    return this.api.post(settings.apiOrder, order)
    .then((data: IOrderResponse) => data);
  }
}