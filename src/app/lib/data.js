export default async function data() {
  const res = await fetch('https://api.github.com/users/bilaldadi');
  const json = await res.json();


  return(
    <div className=" mt-10 p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
        <div className="flex-shrink-0">
          <img className=" rounded-full h-20 w-20" src={json.avatar_url} alt="avatar" />
        </div>
        <div>
          <div className="text-xl font-medium text-black">Name From Github: {json.name}</div>
          <p className="text-gray-500">Public Repos Count: {json.public_repos}</p>
          <p className="text-gray-500">Followers Count: {json.followers}</p>
        </div>
    </div>

  )
}







