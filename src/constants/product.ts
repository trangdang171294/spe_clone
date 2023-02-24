export const sortBy = {
    createdAt: 'createdAt',
    view: 'view',
    sold: 'sold',
    price: 'price',
} as const; //ep type constance , readonly

export const order = {
    asc: 'asc',
    desc: 'desc',
} as const;
