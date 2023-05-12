import CardComponent from "@/src/component/card";

/**
 * @param {Object} props
 * @param {Object} props.pagination
 * @param {Number} props.pagination.limit
 * @param {Number} props.pagination.skip
 * @param {Number} props.pagination.total
 * @param {Array} props.data
 * @returns {JSX.Element}
 * @constructor
 */
export default function PoductList({ data }) {
    // let {
    //     data,
    //     pagination
    // } = props
    return (
        <div>
            {/* <div className="grid place-content-center h-48">
                <h1 className={`font-sans text-4xl`}>Product List</h1>
            </div> */}
            <div className={'flex flex-wrap justify-center space-x-3 space-y-3 text-black'}>
                {console.log(data.products)}

                {
                    Array.isArray(data.products) &&
                        data?.products?.length > 0 ?
                        data?.products.map((item) => {
                            return (
                                <CardComponent data={item}></CardComponent>
                            )
                        })
                        : "is empty"
                }
            </div>
        </div>

    )
}
export async function getServerSideProps() {
    // Fetch data from external API
    const res = await fetch(`https://dummyjson.com/products`);
    const data = await res.json();

    // Pass data to the page via props
    return { props: { data } };
}
