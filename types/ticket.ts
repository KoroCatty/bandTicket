export type Ticket = {
  _id: string;
  userId: string;
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

export type TicketType = {
  totalTickets: number;
  tickets: Ticket[];
};
