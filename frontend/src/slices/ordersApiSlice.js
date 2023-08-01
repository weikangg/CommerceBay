import { apiSlice } from "./apiSlice";
import { ORDERS_URL } from "../constants.js";


export const ordersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getOrders: builder.query({
            query: () => ORDERS_URL,
            providesTags: ["Order"],
        }),
        getOrderDetails: builder.query({
            query: (orderId) => `${ORDERS_URL}/${orderId}`,
            keepUnusedDataFor: 5,
        }),
        createOrder: builder.mutation({
            query: (order) => ({
                url: ORDERS_URL,
                method: "POST",
                body: {...order},
            }),
        }),
        updateOrder: builder.mutation({
            query: ({ id, ...patch }) => ({
                url: `${ORDERS_URL}/${id}`,
                method: "PATCH",
                body: patch,
            }),
            invalidatesTags: ["Order"],
        }),
        deleteOrder: builder.mutation({
            query: (id) => ({
                url: `${ORDERS_URL}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Order"],
        }),
    }),
});

export const {
    useGetOrdersQuery,
    useGetOrderDetailsQuery,
    useCreateOrderMutation,
    useUpdateOrderMutation,
    useDeleteOrderMutation,
} = ordersApiSlice;


