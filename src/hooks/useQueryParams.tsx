import { useSearchParams } from 'react-router-dom';

function useQueryParams() {
    const [searchParams] = useSearchParams();
    return Object.fromEntries([...searchParams]); // convert array to object
}

export default useQueryParams;
