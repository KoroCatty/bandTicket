export type TicketType = {
  id: number;
  userId: number;
  name: string;
  description: string;
  location: {
    street: string;
    city: string;
    state: string;
    postcode: string;
  };
  price: number;
  images: string[];
  status: string;
  date: string;
  venue: string;
  isFeatured: boolean;
};
