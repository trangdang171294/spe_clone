import { useQuery } from 'react-query';
import productApi from 'src/apis/product.api';
import useQueryParams from 'src/hooks/useQueryParams';
import Product from './Product/Product';
import SidebarFilter from './SidebarFilter';
import SortProductList from './SortProductList';

function ProductList() {
    const queryParams = useQueryParams();
    const data = useQuery({
        // can truyen param len query key de khi thay doi thi chay query lai , same with depedencies
        queryKey: ['products', queryParams],
        queryFn: () => {
            return productApi.getProducts(queryParams);
        },
    });
    return (
        <div className="bg-gray-200 py-6">
            <div className="container">
                <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-3">
                        <SidebarFilter />
                    </div>
                    <div className="col-span-9">
                        <SortProductList />
                        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                            {data &&
                                data.data?.data.data.products.map((product) => (
                                    <div className="col-span-1" key={product._id}>
                                        <Product productData={product} />
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductList;
