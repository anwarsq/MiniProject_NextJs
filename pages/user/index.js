import { useState, useEffect } from "react"
import axios from "axios"
// import * as bcrypt from 'bcrypt'

export default function UserCsr() {

    const [formdata, setFormdata] = useState({
        email: "",
        password: "",
        username: "",
        salt: "iknowwhatudidlastminute"
    });

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [params, setParams] = useState({ page: 1, limit: 10 });

    useEffect(() => {
        setLoading(true);
        setData([])
        axios.get(
            "http://localhost:3000/api/user",
            {
                params: {
                    ...params
                }
            }
        )
            .then((response) => {
                // console.log(response.data)
                setData([...response?.data?.data]);
                setLoading(false);
            })
            .catch((err) => {
                setData([]);
                setLoading(false);
            })
    }, []);

    function hapusDongUser(id) {
        console.log(id)
        var requestOptions = {
            method: 'DELETE',
            redirect: 'follow'
        };

        fetch("http://localhost:3000/api/user/" + id, requestOptions)
            .then(response => response.text())
            .then(result => {

                console.log(result)
                window.location.reload()
            })
            .catch(error => console.log('error', error));
    }

    function onChange(e) {
        e.preventDefault();
        console.log(e.target.name)
        // if (e.target.name == "password") {
        //     const saltOrRounds = 10;
        //     const password = e.target.value;
        //     const hash = await bcrypt.hash(password, saltOrRounds);
        // }
        setFormdata({
            ...formdata,
            [e.target.name]: e.target.value
        })
    }

    async function onSubmit(e) {
        console.log(e)
        e.preventDefault()
        // console.log(formdata.email)
        // console.log(formdata)
        let user = {
            user: formdata
        }
        console.log(user)
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify(user);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:3000/api/user", requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result)
                // window.location.reload()
            })
            .catch(error => console.log('error', error));

    }

    return (
        <main
            className={`flex min-h-screen flex-col items-center justify-between`}
        >
            <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <table className="min-w-full bg-teal-50 text-left text-sm font-light">
                                <thead className="border-b font-medium dark:border-neutral-500">
                                    <tr>
                                        <th scope="col" className="px-6 py-4">No</th>
                                        <th scope="col" className="px-6 py-4">Id</th>
                                        <th scope="col" className="px-6 py-4">Username</th>
                                        <th scope="col" className="px-6 py-4">Email</th>
                                        <th scope="col" className="px-6 py-4">Created</th>
                                        <th scope="col" className="px-6 py-4">Updated</th>
                                        <th scope="col" className="px-6 py-4">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        loading ? <tr className="border-b dark:border-neutral-500"><td>Loading...</td></tr> :
                                            data.map((item, index) => {
                                                console.log(item)
                                                return (
                                                    <tr className="border-b dark:border-neutral-500" key={item.id}>
                                                        <td className="whitespace-nowrap px-6 py-4 font-medium">{index + 1}</td>
                                                        <td className="whitespace-nowrap px-6 py-4">{item.id}</td>
                                                        <td className="whitespace-nowrap px-6 py-4">{item.username}</td>
                                                        <td className="whitespace-nowrap px-6 py-4">{item.email}</td>
                                                        <td className="whitespace-nowrap px-6 py-4">{item.createdAt.substr(0, 10)}</td>
                                                        <td className="whitespace-nowrap px-6 py-4">{item.updatedAt.substr(0, 10)}</td>
                                                        <td className="whitespace-nowrap px-6 py-4"><button onClick={() => hapusDongUser(item.id)} className="inline-block rounded bg-red-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">delete</button></td>
                                                    </tr>
                                                )
                                            })
                                    }
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
                <div>
                    <div
                        className="block max-w-sm rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                        <form onSubmit={onSubmit}>
                            <div>
                                <h3>Add New User</h3>
                            </div>
                            <div className="relative mb-12" data-te-input-wrapper-init>
                                <input
                                    type="text"
                                    className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                    id="username_input"
                                    placeholder="Enter username" onChange={onChange}
                                    name={'username'} />
                                <label
                                    htmlFor="username_input"
                                    className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                                >Username</label
                                >
                            </div>
                            <div className="relative mb-12" data-te-input-wrapper-init>
                                <input
                                    type="email"
                                    className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    placeholder="Enter email" onChange={onChange}
                                    name={'email'} />
                                <label
                                    htmlFor="exampleInputEmail1"
                                    className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                                >Email address</label
                                >
                            </div>

                            <div className="relative mb-6" data-te-input-wrapper-init>
                                <input
                                    type="password"
                                    className="peer block min-h-[auto] w-full rounded border-1 px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                    id="exampleInputPassword1"
                                    placeholder="Password" onChange={onChange}
                                    name={'password'} />
                                <label
                                    htmlFor="exampleInputPassword1"
                                    className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                                >Password</label
                                >
                            </div>


                            <button
                                type="submit"
                                className="inline-block rounded bg-black px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                data-te-ripple-init
                                data-te-ripple-color="light">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    )
}