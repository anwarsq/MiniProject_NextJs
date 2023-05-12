export default function NavbarComponent(){
    return(
        <div className="flex justify-center bg-orange-400 w-screen h-[50px]">
            <ul className={'flex space-x-3 align-text-bottom'}>
                <li><a href="/">Home</a></li>
                <li><a href="/product">Product</a></li>
                <li><a href="/user">User</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/auth/login">Login</a></li>
            </ul>
        </div>
    )
}