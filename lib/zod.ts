import {object, string, coerce, array} from 'zod';

export const RoomSchema = object({

    name:string().min(1),
    description:string().min(50),
    capacity:coerce.number().gt(0),
    price:coerce.number().gt(0),
    amenities:array(string()).nonempty(),
});

export const ContactSchema = object({
    name: string().min(6, 'Name must be at least 6 characters long').nonempty('Name is required'),
    email: string().email('Invalid email address').nonempty('Email is required'),
    subject: string().min(5, 'Subject must be at least 5 characters long').nonempty('Subject is required'),
    message: string().min(10, 'Message must be at least 10 characters long').nonempty('Message is required'),
});