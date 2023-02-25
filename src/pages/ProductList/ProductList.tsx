import { useQuery } from 'react-query';
import { omitBy, isUndefined } from 'lodash';
import productApi from 'src/apis/product.api';
import Pagination from 'src/components/Pagination';
import useQueryParams from 'src/hooks/useQueryParams';
import { ProductListConfig } from 'src/types/product.type';
import Product from './Product/Product';
import SidebarFilter from './SidebarFilter';
import SortProductList from './SortProductList';
import categoryApi from 'src/apis/category.api';

export type QueryConfig = {
    [key in keyof ProductListConfig]: string;
};

function ProductList() {
    const queryParams: QueryConfig = useQueryParams();
    //omit by dung de loai bo nhung key co value la underfine
    const queryConfig: QueryConfig = omitBy(
        {
            page: queryParams.page || '1',
            limit: queryParams.limit || '20',
            sort_by: queryParams.sort_by,
            exclude: queryParams.exclude,
            name: queryParams.name,
            order: queryParams.order,
            price_max: queryParams.price_max,
            price_min: queryParams.price_min,
            rating_filter: queryParams.rating_filter,
            category: queryParams.category,
        },
        isUndefined,
    );
    const { data: productsData } = useQuery({
        // can truyen param len query key de khi thay doi thi chay query lai , same with depedencies
        queryKey: ['products', queryParams],
        queryFn: () => {
            return productApi.getProducts(queryConfig as ProductListConfig);
        },
        keepPreviousData: true,
    });

    const { data: categoriesData } = useQuery({
        queryKey: ['categories'],
        queryFn: () => {
            return categoryApi.getCategories();
        },
    });

    return (
        <div className="bg-gray-200 py-6">
            <div className="container">
                {productsData && (
                    <div className="grid grid-cols-12 gap-6">
                        <div className="col-span-3">
                            <SidebarFilter queryConfig={queryConfig} categories={categoriesData?.data.data || []} />
                        </div>
                        <div className="col-span-9">
                            <SortProductList
                                queryConfig={queryConfig}
                                pageSize={productsData.data.data.pagination.page_size}
                            />
                            <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                                {productsData.data.data.products.map((product) => (
                                    <div className="col-span-1" key={product._id}>
                                        <Product productData={product} />
                                    </div>
                                ))}
                            </div>
                            <Pagination
                                queryConfig={queryConfig}
                                pageSize={productsData.data.data.pagination.page_size}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProductList;
