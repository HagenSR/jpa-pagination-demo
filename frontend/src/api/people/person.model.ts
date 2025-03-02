import { Id } from "../generic/id.model";

export interface Person extends Id {
    firstName: string;
    lastName: string;
    email: string;
    hireDate: Date;
};