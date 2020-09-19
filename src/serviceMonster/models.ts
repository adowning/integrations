import { Document, Model, model, Schema } from 'mongoose';
import { field } from '../models/utils';

export interface IServiceMonsterCustomer {
  email: string;
  firstName: string;
  lastName: string;
  erxesApiId: string;
  integrationId: string;
  kind: string;
}

export interface IServiceMonsterCustomerDocument extends IServiceMonsterCustomer, Document {}
export interface IServiceMonsterCustomerModel extends Model<IServiceMonsterCustomerDocument> {}

// Customer =============
const customerCommonSchema = {
  _id: field({ pkey: true }),
  email: { type: String, unique: true },
  erxesApiId: String,
  firstName: String,
  lastName: String,
  integrationId: String,
  kind: String,
};

export const serviceMonsterCustomerSchema = new Schema(customerCommonSchema);

// tslint:disable-next-line
export const ServiceMonsterCustomers = model<IServiceMonsterCustomerDocument, IServiceMonsterCustomerModel>(
  'customers_servicemonster',
  serviceMonsterCustomerSchema,
);